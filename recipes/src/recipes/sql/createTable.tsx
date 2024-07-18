import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { TableAddIcon } from "../../icons/TableAdd";

const DOCS_URL = "create-table-postgresql";

export const CreateTable: React.FC<IRecipeProps> = ({
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
    const [columns, setColumns] = useState("column");
    const [dataTypes, setDataTypes] = useState("data_type");
    const [table, setTable] = useState("table");

    let columnsArr = columns.split(",")
    let dataTypesArr = dataTypes.split(",")

    let queryPart1 = ""
    let queryPart2 = ""

    // could probably just smush it into one loop
    for (let i = 0; i <= columnsArr.length - 1; i++) {
        if (i === columnsArr.length - 1) {
            queryPart1 += "\t\t\t\t\t" + "{}" + " " + dataTypesArr[i]
            queryPart2 += "\t\t\t\t" + 'sql.Identifier("' + columnsArr[i] + '")'
            break
        }
        queryPart1 += "\t\t\t\t\t" + "{}" + " " + dataTypesArr[i] + ",\n"
        queryPart2 += "\t\t\t\t" + 'sql.Identifier("' + columnsArr[i] + '"),\n'
    }

    useEffect(() => {
        let src = ""

        if (columnsArr.length === dataTypesArr.length) {
            src += `# if connection was used and closed it is reopen here\n`;
            src += `if ${conn}.closed:\n`;
            src += `    ${conn} = create_new_connection()\n\n`;

            src += `# run the query`;
            src += `with ${conn}:\n`;
            src += `    with ${conn}.cursor() as cur:\n\n`;
            src += `        # Create table\n`;
            src += `        cur.execute(\n`;
            src += `            sql.SQL("""\n`;
            src += `                CREATE TABLE IF NOT EXISTS ${table} (\n`;
            src += `${queryPart1}\n`;
            src += `            );"""\n`;
            src += `            ).format(\n`;
            src += `${queryPart2}\n`;
            src += `            )\n`;
            src += `        )`;
        } else {
            src += "number of column names needs to be euqal to number of data types"
        }

        setCode(src);
        setPackages(["import os", "import psycopg", "from psycopg import sql"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                dataTypes,
                table,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, columns, dataTypes, table]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
            if (metadata["dataTypes"] !== undefined) setDataTypes(metadata["dataTypes"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={TableAddIcon}
                label={"Create table"}
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
                        label={"Set new table name"}
                        name={table}
                        setName={setTable}
                    />
                    <Variable
                        label={"Input columns names"}
                        name={columns}
                        setName={setColumns}
                        tooltip="comma separated list, no whitespace, no trailing comma, number of columns need to be equal number of data types"
                    />
                    <Variable
                        label={"Input data types of columns"}
                        name={dataTypes}
                        setName={setDataTypes}
                        tooltip="comma separated list, no whitespace, no trailing comma, number of columns need to be equal number of data types"
                    />
                </>
            )}
        </div>
    );
};

export const CreateTableRecipe: IRecipe = {
    name: "Create table",
    longName: "Create table",
    parentName: "Postgresql",
    // len: 187
    description: "Create new database table usign previously configured Postgresql connection. Credentials are stored and loaded from .env file. Number of columns needs to be equalt to number of data types",
    shortDescription: "Create new database table usign previously configured Postgresql connection. Credentials are stored and loaded from .env file. Number of columns needs to be equalt to number of data types",
    codeExplanation: ``,
    ui: CreateTable,
    Icon: TableAddIcon,
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
export default CreateTableRecipe;
