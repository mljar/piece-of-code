import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { LayoutColumnsIcon } from "../../icons/LayoutColumns";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgres-columns-show";

export const ShowAllColumns: React.FC<IRecipeProps> = ({
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
    const [advanced, setAdvanced] = useState(false);
    const [schema, setSchema] = useState("public");

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # query db\n`;
        src += `        try:\n`;
        src += `            cur.execute("""\n`;
        src += `                    SELECT attname AS col, atttypid::regtype AS datatype\n`;
        src += `                    FROM pg_attribute\n`;
        if (advanced) {
            src += `                    WHERE attrelid = '${schema}.${table}'::regclass \n`;
        } else {
            src += `                    WHERE attrelid = '${table}'::regclass \n`;
        }
        src += `                    AND attnum > 0\n`;
        src += `                    AND NOT attisdropped\n`;
        src += `                    ORDER BY attnum;\n`;
        src += `                """)\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem running query:\n`;
        src += `    {e}\n\n`;

        src += `Did you spell everything correctly?\n`;
        src += `You can use show tables and columns recipes.\n`;
        src += `            """)\n\n`;

        src += `        # print the results\n`;
        if (advanced) {
            src += `        print("Columns of ${schema}.${table}:")\n`;
        } else {
            src += `        print("Columns of ${table}:")\n`;
        }
        src += `        for column in cur.fetchall():\n`;
        src += `            print(f"{column}")`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                table,
                schema,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
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
                label={"Show all columns"}
                advanced={advanced}
                setAdvanced={setAdvanced}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Query table"}
                name={table}
                setName={setTable}
            />
            {advanced && (
                <Variable
                    label={"Choose schema"}
                    name={schema}
                    setName={setSchema}
                />
            )}
        </div>
    );
};

export const ShowAllColumnsRecipe: IRecipe = {
    name: "Show all columns",
    longName: "Python show all columns in PostgreSQL",
    parentName: "Postgresql",
    // len: 190
    description: "List all columns of chosen table. Use advanced options to choose table schema. To show columns from tables from other databases change your connection. Credentials are loaded from .env file.",
    shortDescription: "List all columns of chosen table. Use advanced options to choose table schema. To show columns from tables from other databases change your connection. Credentials are loaded from .env file.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to query the database.
4. Fetch results and show them to the user.
5. If error occurs raise exception.
`,
    ui: ShowAllColumns,
    Icon: LayoutColumnsIcon,
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
export default ShowAllColumnsRecipe;
