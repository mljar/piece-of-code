import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { TableIcon } from "../../icons/Table";
import { Toggle } from "../../components/Toggle";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgres-list-tables";

export const ShowAllTables: React.FC<IRecipeProps> = ({
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
    const [columns, setColumns] = useState("please select query columns");
    const [table, setTable] = useState("please select query table");
    const [values, setValues] = useState("please select query values");
    const [schema, setSchema] = useState(false);

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run the query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;
        src += `        # Query the db\n`;
        src += `        cur.execute(\n`;
        src += `            """\n`;
        if (schema) {
            src += `                SELECT table_schema || '.' || table_name\n`;
        } else {
            src += `                SELECT table_name\n`;
        }
        src += `                FROM information_schema.tables\n`;
        src += `                WHERE table_type = 'BASE TABLE'\n`;
        src += `                AND table_schema NOT IN ('pg_catalog', 'information_schema');\n`;
        src += `            """\n`;
        src += `        )\n\n`;

        src += `        # Fetch all the tables\n`;
        src += `        tables = cur.fetchall()\n\n`;

        src += `        # Print the results\n`;
        src += `        for table in tables:\n`;
        src += `            print(f"{table}")`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                table,
                values,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, columns, table, values, schema]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
            if (metadata["values"] !== undefined) setValues(metadata["values"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={TableIcon}
                label={"Run sql insert query"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Select
                    label={"Choose connection variable name"}
                    option={conn}
                    options={connections.map((d) => [d, d])}
                    setOption={setConnection}
                />
                <Toggle
                    label="Show table schema"
                    value={schema}
                    setValue={setSchema}
                />
            </div>
        </div>
    );
};

export const ShowAllTablesRecipe: IRecipe = {
    name: "Show all tables",
    longName: "Python show all tables from PostgreSQL",
    parentName: "Postgresql",
    // len: 171
    description: "List all tables of previously configured Postgresql database connection. Choose if you want to displaty table schema too. Credentials are stored and loaded from .env file.",
    shortDescription: "List all tables of previously configured Postgresql database connection. Choose if you want to displaty table schema too. Credentials are stored and loaded from .env file.",
    codeExplanation: ``,
    ui: ShowAllTables,
    Icon: TableIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["ml", "machine-learning", "sql", "postgres", "psycopg"],
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
export default ShowAllTablesRecipe;
