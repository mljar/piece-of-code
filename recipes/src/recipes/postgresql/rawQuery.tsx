import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { TableAddIcon } from "../../icons/TableAdd";
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
    const [query, setQuery] = useState("Write your query");

    useEffect(() => {
        let src = ""

        src += `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run the query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;
        src += `        # Create table\n`;
        src += `        cur.execute(\n`;
        src += `            sql.SQL("""\n`;
        src += `${query}\n`;
        src += `            """\n`;
        src += `            )\n`;
        src += `        )\n\n`;

        src += `if (str(cur.statusmessage).startswith("SELECT")):\n`;
        src += `        # Fetch all the results\n`;
        src += `        results = cur.fetchall()\n\n`;

        src += `        # Print the results\n`;
        src += `        for result in results:\n`;
        src += `            print(f"result")`;

        setCode(src);
        setPackages(["import psycopg", "from psycopg import sql"]);
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
                label={"Create table"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable name"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <TextArea
                label={"Write sql query"}
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
    // len: 207
    description: "Simply run a sql query usign previously configured Postgresql connection. You can input any valid Postgresql sql query. Select query will display the result. Credentials are stored and loaded from .env file.",
    shortDescription: "Simply run a sql query usign previously configured Postgresql connection. You can input any valid Postgresql sql query. Select query will display the result. Credentials are stored and loaded from .env file.",
    codeExplanation: ``,
    ui: RawQuery,
    Icon: SqlIcon,
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
export default RawQueryRecipe;
