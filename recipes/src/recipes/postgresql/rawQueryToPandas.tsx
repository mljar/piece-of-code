import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { TextArea } from "../../components/TextArea";
import { Variable } from "../../components/Variable";
import { QueryIcon } from "../../icons/Query";

const DOCS_URL = "python-sql-query-postgresql-pandas";

export const RawQueryToPandas: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const connections = variables
        .filter((v) => v.varType === "connection")
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
    const [query, setQuery] = useState("select 1");
    const [columns, setColumns] = useState("col1, col2, col3");
    const [df, setDf] = useState("df");

    let colArr = columns.split(",")

    for (let i = 0; i < colArr.length; i++) {
        colArr[i] = `"${colArr[i].trim()}"`;
    }

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run the query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;
        src += `        # Run query \n`;
        src += `        cur.execute(\n`;
        src += `            sql.SQL("""\n`;
        src += `${query}\n`;
        src += `            """\n`;
        src += `            )\n`;
        src += `        )\n\n`;

        src += `        if str(cur.statusmessage).upper().startswith("SELECT"):\n`;
        src += `            # Fetch all the results\n`;
        src += `            results = cur.fetchall()\n\n`;

        src += `            # Create dataframe\n`;
        src += `            try:\n`;
        if (columns.length > 0) {
            src += `                ${df} = pd.DataFrame(data=results, columns=pd.Index([${colArr}]))\n`;
        } else {
            src += `                ${df} = pd.DataFrame(data=results)\n`;
        }
        src += `                print(f"{${df}.shape = }")\n`;
        src += `                print(${df}.head())\n`;
        src += `            except ValueError as e:\n`;
        src += `                print(f"Error creating DataFrame: {e}")\n`;
        src += `                print("The number of columns specified does not match the number of columns in the data.")`;


        setCode(src);
        setPackages(["import psycopg", "from psycopg import sql", "import pandas as pd"]);
        if (setMetadata) {
            setMetadata({
                conn,
                columns,
                df,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, query, columns, df]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["query"] !== undefined) setQuery(metadata["query"]);
            if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
            if (metadata["df"] !== undefined) setDf(metadata["df"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={QueryIcon}
                label={"Raw query to pandas"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable name"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <Variable
                label={"Name columns in dataframe"}
                name={columns}
                setName={setColumns}
                tooltip="You need to provide name for every column or ommit this field"
            />
            <Variable
                label={"Name the datafrarme"}
                name={df}
                setName={setDf}
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

export const RawQueryToPandasRecipe: IRecipe = {
    name: "Raw query to Pandas",
    longName: "PostgreSQL query to Pandas DataFrame",
    parentName: "Postgresql",
    // len: 199
    description: "Run a sql query usign previously configured Postgresql connection and crate pandas data frame. You can input any valid Postgresql sql query. Select query will display the result and crate data frame.",
    shortDescription: "Run a sql query usign previously configured Postgresql connection and crate pandas data frame. You can input any valid Postgresql sql query. Select query will display the result and crate data frame.",
    codeExplanation: ``,
    ui: RawQueryToPandas,
    Icon: QueryIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" },
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" }],
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
export default RawQueryToPandasRecipe;

