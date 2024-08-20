import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { QueryIcon } from "../../icons/Query";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgres-select";

export const SelectQuery: React.FC<IRecipeProps> = ({
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
    const [columns, setColumns] = useState("col1,col2,col3");
    const [tables, setTables] = useState("table_name");

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # query db\n`;
        src += `        try:\n`;
        src += `            cur.execute("SELECT ${columns} FROM ${tables}")\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem running query:\n`;
        src += `    {e}\n\n`;

        src += `Did you spell everything correctly?\n`;
        src += `You can use show tables and columns recipes.\n`;
        src += `            """)\n\n`;

        src += `        # print the results\n`;
        src += `        for row in cur.fetchall():\n`;
        src += `            print(f"{row}")`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                tables,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, columns, tables]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
            if (metadata["tables"] !== undefined) setTables(metadata["tables"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={QueryIcon}
                label={"Run sql select query"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Select tables"}
                name={tables}
                setName={setTables}
                tooltip="comma separated list, no trailing comma"
            />
            <Variable
                label={"Select columns"}
                name={columns}
                setName={setColumns}
                tooltip="comma separated list, no trailing comma"
            />
        </div>
    );
};

export const SelectQueryRecipe: IRecipe = {
    name: "Run select query",
    longName: "Python run select query in PostgreSQL",
    parentName: "Postgresql",
    // len: 150
    description: "Execute sql select query. Credentials are loaded from .env file. Choose table and column name. If there is no errors result is outputed to the screen.",
    shortDescription: "Execute sql select query. Credentials are loaded from .env file. Choose table and column name. If there is no errors result is outputed to the screen.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to run select query.
4. Fetch results and show them to the user.
5. If error occurs raise exception.
`,
    ui: SelectQuery,
    Icon: QueryIcon,
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
export default SelectQueryRecipe;
