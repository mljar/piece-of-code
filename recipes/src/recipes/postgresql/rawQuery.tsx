import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { SqlIcon } from "../../icons/Sql";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-sql-query-postgresql";

export const RawQuery: React.FC<IRecipeProps> = ({
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
    const [query, setQuery] = useState("SELECT 1");

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        try:\n`;
        src += `            cur.execute("""\n`;
        src += `${query}\n`;
        src += `            """)\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem running query:\n`;
        src += `    {e}\n`;
        src += `            """)\n\n`;

        src += `        # check if query was a select query\n`;
        src += `        if (str(cur.statusmessage).upper().startswith("SELECT")):\n\n`;

        src += `            # print the results\n`;
        src += `            for result in cur.fetchall():\n`;
        src += `                print(f"{result}")`;

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, query]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["query"] !== undefined) setQuery(metadata["query"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={SqlIcon}
                label={"Raw query"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <TextArea
                label={"Raw sql query"}
                text={query}
                setText={setQuery}
                rows={3}
                wrap="hard"
            />
        </div>
    );
};
export const RawQueryRecipe: IRecipe = {
    name: "Raw query",
    longName: "Python send raw query to PostgreSQL",
    parentName: "Postgresql",
    // len: 191
    description: "Simply run a sql query. You can input any valid Postgresql sql query. Select query will display the result. Credentials are loaded from .env file. Any errors in query will raise an exception.",
    shortDescription: "Simply run a sql query. You can input any valid Postgresql sql query. Select query will display the result. Credentials are loaded from .env file. Any errors in query will raise an exception.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to run query.
4. If error occurs raise exception.
5. If run a select query, fetch and show the result.
`,
    ui: RawQuery,
    Icon: SqlIcon,
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
export default RawQueryRecipe;
