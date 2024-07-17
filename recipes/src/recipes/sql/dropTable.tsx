import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { TableRemoveIcon } from "../../icons/TableRemove";

const DOCS_URL = "postgresql-drop-table";

export const DropTable: React.FC<IRecipeProps> = ({
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
    const [table, setTable] = useState("table");
    const dropOptions: [string, string][] = [["", ""], ["RESTRICT", " RESTRICT"], ["CASCADE", " CASCADE"]];
    const [dropOption, setDropOption] = useState(dropOptions[0][0]);

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if conn.closed:\n`;
        src += `    conn = create_new_connection()\n`;
        src += `# run query\n`;
        src += `with conn:\n`;
        src += `    with conn.cursor() as cur:\n\n`;
        src += `        # drop table\n`;
        src += `        cur.execute(\n`;
        src += `            "DROP TABLE IF EXISTS ${table}${dropOption};"\n`;
        src += `    )`;

        setCode(src);
        setPackages(["import os", "import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                table,
                variables: variables.filter((v) => v.varType === "connection"),
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
                        label={"Input table name to drop"}
                        name={table}
                        setName={setTable}
                        tooltip="to drop multiple table input a comma separated list"
                    />
                    <Select
                        label={"Select drop opiton"}
                        option={dropOption}
                        options={dropOptions}
                        setOption={setDropOption}
                    />
                </>
            )}
        </div>
    );
};

export const DropTableRecipe: IRecipe = {
    name: "drop table",
    longName: "drop table",
    parentName: "Postgresql",
    // len: 169
    description: "Drop table from database usign previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose between CASCADE and RESTRICT options",
    shortDescription: "Drop table from database usign previously configured Postgresql connection. Credentials are stored and loaded from .env file. Choose between CASCADE and RESTRICT options",
    codeExplanation: ``,
    ui: DropTable,
    Icon: TableRemoveIcon,
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
export default DropTableRecipe;
