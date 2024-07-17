import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { InsertIcon } from "../../icons/Insert";

const DOCS_URL = "postgresql-insert";

export const InsertQuery: React.FC<IRecipeProps> = ({
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
    const [columns, setColumns] = useState("please select query columns");
    const [table, setTable] = useState("please select query table");
    const [values, setValues] = useState("please select query values");

    let percentS = "%s"

    for (let i = 1; i < values.split(",").length; i++) {
        percentS += ", %s";
    }

    let valuesArr = values.split(",")
    for (let i = 0; i < values.split(",").length; i++) {
        valuesArr[i] = '"' + valuesArr[i] + '"'
    }
    let valuesWithQuetes = valuesArr.join()

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if conn.closed:\n`;
        src += `    conn = create_new_connection()\n`;
        src += `# run the query`;
        src += `with conn:\n`;
        src += `    with conn.cursor() as cur:\n\n`;
        src += `        # Insert into db\n`;
        // fails when given one value and one column and in the table there are two columns
        src += `        cur.execute("INSERT INTO ${table} (${columns}) values (${percentS})", (${valuesWithQuetes}))`;

        setCode(src);
        setPackages(["import os", "import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                table,
                values,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, columns, table, values]);

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
                Icon={InsertIcon}
                label={"Run sql insert query"}
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
                        label={"Choose query table"}
                        name={table}
                        setName={setTable}
                    />
                    <Variable
                        label={"Choose query columns"}
                        name={columns}
                        setName={setColumns}
                    />
                    <Variable
                        label={"Choose query values"}
                        name={values}
                        setName={setValues}
                    />
                </>
            )}
        </div>
    );
};

export const InsertQueryRecipe: IRecipe = {
    name: "Run insert query",
    longName: "Run insert query",
    parentName: "Postgresql",
    // len: 214
    description: "Execute sql insert query on previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values.",
    shortDescription: "Execute sql insert query on previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values.",
    codeExplanation: ``,
    ui: InsertQuery,
    Icon: InsertIcon,
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
export default InsertQueryRecipe;
