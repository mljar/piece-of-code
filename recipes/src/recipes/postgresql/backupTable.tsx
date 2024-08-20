import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";
import { CopyIcon } from "../../icons/copy";

const DOCS_URL = "python-postgresql-table-copy";

export const BackupTable: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const connections = variables
        .filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE)
        .map((v) => v.varName);

    // if (variablesStatus === "loading") {
    //     return (
    //         <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
    //             <p className="text-base text-gray-800 dark:text-white">
    //                 Loading variables ...
    //             </p>
    //         </div>
    //     );
    // }

    if (variablesStatus === "loaded" && !connections.length) {
        return (
            <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
                <p className="text-base text-gray-800 dark:text-white">
                    There are no connection objects in your notebook. You can open a new connection to run the query.
                </p>
            </div>
        );
    }

    const [conn, setConnection] = useState(connections.length ? connections[0] : "");
    const [table, setTable] = useState("old_table");
    const [backup, setBackup] = useState("table_backup");

    useEffect(() => {
        let src = ""

        src += `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # backup table\n`;
        src += `        try:\n`;
        src += `            cur.execute("CREATE TABLE ${backup} AS TABLE ${table}")\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem creating table:\n`;
        src += `    {e}\n\n`;

        src += `Are you sure everything is splled correctly and names are unique?\n`;
        src += `            """)`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                backup,
                table,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, backup, table]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["backup"] !== undefined) setBackup(metadata["backup"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={CopyIcon}
                label={"Backup table"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Backup table name"}
                name={backup}
                setName={setBackup}
            />
            <Variable
                label={"Table to backup"}
                name={table}
                setName={setTable}
            />
        </div>
    );
};

export const BackupTableRecipe: IRecipe = {
    name: "Backup table",
    longName: "Python code to backup table in PostgreSQL",
    parentName: "Postgresql",
    // len: 195
    description: "Create new database table that is a copy of another table. Useful when you want to test some changes to data and you are not sure and want to have a backup. Credentials are loaded from .env file.",
    shortDescription: "Create new database table that is a copy of another table. Useful when you want to test some changes to data and you are not sure and want to have a backup. Credentials are loaded from .env file.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to copy and backup the table.
4. If error occurs raise exception.
`,
    ui: BackupTable,
    Icon: CopyIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["python", "postgresql", "sql", "psycopg", ".env"],
    defaultVariables: [
        {
            varName: "conn",
            varType: CONNECITON_PSYCOPG_TYPE,
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "",
            isMatrix: false,
            isWidget: false,
        }],
};
export default BackupTableRecipe;
