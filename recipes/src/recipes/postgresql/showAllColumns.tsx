import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { LayoutColumnsIcon } from "../../icons/LayoutColumns";

const DOCS_URL = "postgresql-columns-show";

export const ShowAllColumns: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const connections = variables
        .filter((v) => v.varType === "Connection")
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
    const [table, setTable] = useState("please select query table");
    const [advanced, setAdvanced] = useState(false);
    const [schema, setSchema] = useState("please select database schema");

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
        src += `                SELECT attname AS col, atttypid::regtype AS datatype\n`;
        src += `                FROM   pg_attribute\n`;
        if (advanced) {
            src += `                WHERE  attrelid = '${schema}.${table}'::regclass \n`;
        } else {
            src += `                WHERE  attrelid = '${table}'::regclass \n`;
        }
        src += `                AND    attnum > 0\n`;
        src += `                AND    NOT attisdropped\n`;
        src += `                ORDER  BY attnum;\n`;
        src += `            """\n`;
        src += `        )\n\n`;

        src += `        # Fetch all the columns\n`;
        src += `        columns = cur.fetchall()\n\n`;

        src += `        # Print the results\n`;
        src += `        for column in columns:\n`;
        src += `            print(f"{column}")`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                table,
                schema,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, table, advanced, schema]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
            if (metadata["schema"] !== undefined) setSchema(metadata["schema"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={LayoutColumnsIcon}
                label={"Run sql insert query"}
                advanced={advanced}
                setAdvanced={setAdvanced}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable name"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Choose table"}
                name={table}
                setName={setTable}
            />
            {advanced && (
                <Variable
                    label="Choose schema"
                    name={schema}
                    setName={setSchema}
                />
            )}
        </div>
    );
};

export const ShowAllColumnsRecipe: IRecipe = {
    name: "Show all columns",
    longName: "Show all columns",
    parentName: "Postgresql",
    // len: 209
    description: "List all columns of previously configured Postgresql database connection. Provide table name to list columns from. Use advanced options to choose table schema. Credentials are stored and loaded from .env file.",
    shortDescription: "List all columns of previously configured Postgresql database connection. Provide table name to list columns from. Use advanced options to choose table schema. Credentials are stored and loaded from .env file.",
    codeExplanation: ``,
    ui: ShowAllColumns,
    Icon: LayoutColumnsIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["ml", "machine-learning", "sql", "postgres", "psycopg"],
    defaultVariables: [
        {
            varName: "conn",
            varType: "connection",
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "",
            isMatrix: false,
            isWidget: false,
        }],
};
export default ShowAllColumnsRecipe;
