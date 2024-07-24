import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { TableAddIcon } from "../../icons/TableAdd";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-create-table-postgresql";

export const CreateTable: React.FC<IRecipeProps> = ({
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
    const [columns, setColumns] = useState("column");
    const [dataTypes, setDataTypes] = useState("data_type");
    const [table, setTable] = useState("table");

    let columnsArr = columns.split(",")
    let dataTypesArr = dataTypes.split(",")

    let queryDataTypes = ""
    let queryColumns = ""

    for (let i = 0; i <= columnsArr.length - 1; i++) {
        if (i === columnsArr.length - 1) {
            queryDataTypes += "\t\t\t\t\t\t" + "{}" + " " + dataTypesArr[i]
            queryColumns += "\t\t\t\t\t" + 'sql.Identifier("' + columnsArr[i] + '")'
            break
        }
        queryDataTypes += "\t\t\t\t\t\t" + "{}" + " " + dataTypesArr[i] + ",\n"
        queryColumns += "\t\t\t\t\t" + 'sql.Identifier("' + columnsArr[i] + '"),\n'
    }

    useEffect(() => {
        let src = ""

        if (columnsArr.length === dataTypesArr.length) {
            src += `# if connection was used and closed it is reopen here\n`;
            src += `if ${conn}.closed:\n`;
            src += `    ${conn} = create_new_connection()\n\n`;

            src += `# run query\n`;
            src += `with ${conn}:\n`;
            src += `    with ${conn}.cursor() as cur:\n\n`;

            src += `        # create table\n`;
            src += `        try:\n`;
            src += `            cur.execute(\n`;
            src += `                sql.SQL("""\n`;
            src += `                    CREATE TABLE ${table} (\n`;
            src += `${queryDataTypes}\n`;
            src += `                );"""\n`;
            src += `                ).format(\n`;
            src += `${queryColumns}\n`;
            src += `                )\n`;
            src += `            )\n`;
            src += `        # check for errors\n`;
            src += `        except psycopg.ProgrammingError as e:\n`;
            src += `            raise psycopg.ProgrammingError(f"""\n`;
            src += `Problem creating table:\n`;
            src += `    {e}\n\n`;

            src += `Are you sure table and columns names are all unique?\n`;
            src += `Is every data type a valid psotgreSQL data type?\n`;
            src += `            """)`;
        } else {
            src += "number of column names needs to be euqal to number of data types"
        }

        setCode(src);
        setPackages(["import psycopg", "from psycopg import sql"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                dataTypes,
                table,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
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
            <Select
                label={"Choose connection variable"}
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
                label={"Set columns names"}
                name={columns}
                setName={setColumns}
                tooltip="comma separated list, no whitespace, no trailing comma, number of columns need to be equal number of data types"
            />
            <Variable
                label={"Set data types"}
                name={dataTypes}
                setName={setDataTypes}
                tooltip="comma separated list, no whitespace, no trailing comma, number of columns need to be equal number of data types"
            />
        </div>
    );
};

export const CreateTableRecipe: IRecipe = {
    name: "Create table",
    longName: "Python code to create table in PostgreSQL",
    parentName: "Postgresql",
    // len: 181
    description: "Create new database table ,credentials are loaded from .env file. Change table name, column identifiers, and data types. Number of columns needs to be equalt to number of data types",
    shortDescription: "Create new database table ,credentials are loaded from .env file. Change table name, column identifiers, and data types. Number of columns needs to be equalt to number of data types",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Check if number of column is equal to data types.
4. Try to create the table.
5. If error occurs raise exception.
`,
    ui: CreateTable,
    Icon: TableAddIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["python", "postgresql", "sql", "psycopg", ".env", "python-dotenv"],
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
export default CreateTableRecipe;
