import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { TableRemoveIcon } from "../../icons/TableRemove";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgresql-drop-table";

export const DropTable: React.FC<IRecipeProps> = ({
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

    if (variablesStatus === "loading") {
        return (
            <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
                <p className="text-base text-gray-800 dark:text-white">
                    Loading variables ...
                </p>
            </div>
        );
    }
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
    const [table, setTable] = useState("table");
    const dropOptions: [string, string][] = [["", ""], ["RESTRICT", " RESTRICT"], ["CASCADE", " CASCADE"]];
    const [dropOption, setDropOption] = useState(dropOptions[0][0]);

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # drop table\n`;
        src += `        try:\n`;
        src += `            cur.execute(\n`;
        src += `                "DROP TABLE ${table}${dropOption};"\n`;
        src += `            )\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem dropping table:\n`;
        src += `    {e}\n\n`;

        src += `Are you sure this table exists?\n`;
        src += `Mayby some other tables reference this table? Choose CASCADE option then.\n`;
        src += `            """)`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                table,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, table, dropOption]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={TableRemoveIcon}
                label={"drop table"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Table to drop"}
                    name={table}
                    setName={setTable}
                    tooltip="to drop multiple table input a comma separated list"
                />
                <Select
                    label={"Drop opiton"}
                    option={dropOption}
                    options={dropOptions}
                    setOption={setDropOption}
                />
            </div>
        </div>
    );
};

export const DropTableRecipe: IRecipe = {
    name: "Drop table",
    longName: "Python code to drop table in PostgreSQL",
    parentName: "Postgresql",
    // len: 176
    description: "Drop table from PostgreSQL database usign previously configured connection object. Choose between RESTRICT (default) and CASCADE options. Credentials are loaded from .env file.",
    shortDescription: "Drop table from PostgreSQL database usign previously configured connection object. Choose between RESTRICT (default) and CASCADE options. Credentials are loaded from .env file.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to drop the table.
4. If error occurs raise exception.
`,
    ui: DropTable,
    Icon: TableRemoveIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["python", "postgresql", "sql", "psycopg"],
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
export default DropTableRecipe;
