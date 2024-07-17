import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { QueryIcon } from "../../icons/Query";

const DOCS_URL = "postgresql-select";

export const SelectQuery: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const connections = variables
        .filter((v) => v.varType === "Connection")
        // .filter((v) => v.varType === "connection")
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
    const [tables, setTables] = useState("please select query tables");

    useEffect(() => {
        let src = `connection_name = ${conn}\n\n`;
        src += `with connection_name:\n`;
        src += `    with connection_name.cursor() as cur:\n`;
        src += `        # Query db\n`;
        src += `        cur.execute("SELECT ${columns} FROM ${tables}")\n\n`;
        src += `        # Fetch all the rows\n`;
        src += `        rows = cur.fetchall()\n\n`;
        src += `        # Print the results\n`;
        src += `        for row in rows:\n`;
        src += `            print(f"{row}")`;

        setCode(src);
        setPackages(["import os", "import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                tables,
                variables: variables.filter((v) => v.varType === "connection"),
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
            {conn === "" && (
                <p className="text-base text-gray-800 dark:text-white">
                    There are no connection objects in your notebook. You can open a new connection to run the query.
                </p>
            )}
            {conn !== "" && (
                <>
                    <Select
                        label={"Choose connection variable name"}
                        option={conn}
                        options={connections.map((d) => [d, d])}
                        setOption={setConnection}
                    />
                    <Variable
                        label={"Choose query tables"}
                        name={tables}
                        setName={setTables}
                    />
                    <Variable
                        label={"Choose query columns"}
                        name={columns}
                        setName={setColumns}
                    />
                </>
            )}
        </div>
    );
};

export const SelectQueryRecipe: IRecipe = {
    name: "Run select query",
    longName: "Run select query",
    parentName: "Postgresql",
    // len: 152
    description: "Execute sql select query on previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose table and column name.",
    shortDescription: "Execute sql select query on previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose table and column name.",
    codeExplanation: ``,
    ui: SelectQuery,
    Icon: QueryIcon,
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
export default SelectQueryRecipe;
