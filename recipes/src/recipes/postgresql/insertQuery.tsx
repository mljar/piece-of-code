import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { InsertIcon } from "../../icons/Insert";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgresql-insert";

export const InsertQuery: React.FC<IRecipeProps> = ({
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

    // if (variablesStatus === "loading") {
    //     return (
    //         <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
    //             <p className="text-base text-gray-800 dark:text-white">
    //                 Loading variables ...
    //             </p>
    //         </div>
    //     );
    // }

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
    const [columns, setColumns] = useState("col1,col2,col3");
    const [table, setTable] = useState("table");
    const [values, setValues] = useState("val1,val2,val3");

    let percentS = "%s"
    let valuesArr = values.split(",")

    for (let i = 0; i < values.split(",").length; i++) {
        if (i !== 0) {
            percentS += ", %s";
        }
        valuesArr[i] = '"' + valuesArr[i] + '"'
    }

    let valuesWithQuetes = valuesArr.join()

    useEffect(() => {
        let src = ""

        if (valuesArr.length === columns.split(",").length) {
            src += `# if connection was used and closed it is reopen here\n`;
            src += `if ${conn}.closed:\n`;
            src += `    ${conn} = create_new_connection()\n\n`;

            src += `# run query\n`;
            src += `with ${conn}:\n`;
            src += `    with ${conn}.cursor() as cur:\n\n`;

            src += `        # insert into db\n`;
            src += `        try:\n`;
            src += `            cur.execute("INSERT INTO ${table} (${columns}) values (${percentS})", (${valuesWithQuetes},))\n`;
            src += `        # check for errors\n`;
            src += `        except psycopg.ProgrammingError as e:\n`;
            src += `            raise psycopg.ProgrammingError(f"""\n`;
            src += `Problem running query:\n`;
            src += `    {e}\n\n`;

            src += `Are you sure every name is spelled correctly?\n`;
            src += `You can use show all tables or columns to check db contents.\n`;
            src += `            """)`;
        } else {
            src += "number of column names needs to be euqal to number of values"
        }

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
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Table to insert into"}
                name={table}
                setName={setTable}
            />
            <Variable
                label={"Columns to insert into"}
                name={columns}
                setName={setColumns}
                tooltip="comma separated list, no trailing comma, count needs to be equal to number of values"
            />
            <Variable
                label={"Values to insert"}
                name={values}
                setName={setValues}
                tooltip="comma separated list, no trailing comma, count needs to be equal to number of columns"
            />
        </div>
    );
};

export const InsertQueryRecipe: IRecipe = {
    name: "Run insert query",
    longName: "Python insert query in PostgreSQL",
    parentName: "Postgresql",
    // len: 256
    description: "Execute sql insert query. Credentials are loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values. Number of columns needs to be equal to number of values. You can ommit columns, if so None will be inserted.",
    // len: 156
    shortDescription: "Execute sql insert query. Credentials are loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Check if number of column is equal to values.
4. Try to insert into table.
5. If error occurs raise exception.
`,
    ui: InsertQuery,
    Icon: InsertIcon,
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
export default InsertQueryRecipe;
