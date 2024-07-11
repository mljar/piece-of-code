import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { QuestionMarkIcon } from "../../icons/QuestionMark";
import { Select } from "../../components/Select";

const DOCS_URL = "python-sql-querry";

export const InsertQuerry: React.FC<IRecipeProps> = ({
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
                    There are no connection objects in your notebook. You can open a new connection to run the querry.
                </p>
            </div>
        );
    }
    const [conn, setConnection] = useState(connections.length ? connections[0] : "");
    const [collumns, setcollumns] = useState("please select querry collumns");
    const [table, setTable] = useState("please select querry table");
    const [values, setValues] = useState("please select querry values");

    let percentS = "%s"

    for (let i = 1; i < values.split(",").length; i++) {
        percentS += ", %s";
    }

    useEffect(() => {
        let src = `connection_name = ${conn}\n\n`;
        src += `with connection_name:\n`;
        src += `    with connection_name.cursor() as cursor:\n\n`;
        src += `    # Insert into db\n`;
        // here i am not shure if ${values} is gonna work or if it needs to be "${values}"
        src += `    cur.execute("INSERT INTO ${table} (${collumns}) valuesS (${percentS})", (${values})\n\n`;

        setCode(src);
        setPackages(["import os, import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                collumns,
                table,
                values,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, collumns, table, values]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["collumns"] !== undefined) setcollumns(metadata["collumns"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
            if (metadata["values"] !== undefined) setValues(metadata["values"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={QuestionMarkIcon}
                label={"Run sql insert querry"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            {conn === "" && (
                <p className="text-base text-gray-800 dark:text-white">
                    There are no connection objects in your notebook. You can open a new connection to run the querry.
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
                        label={"Choose querry collumns"}
                        name={collumns}
                        setName={setcollumns}
                    />
                    <Variable
                        label={"Choose querry table"}
                        name={table}
                        setName={setTable}
                    />
                    <Variable
                        label={"Choose querry values"}
                        name={values}
                        setName={setValues}
                    />
                </>
            )}
        </div>
    );
};

export const InsertQuerryRecipe: IRecipe = {
    name: "Run insert querry",
    longName: "Execute sql insert querry",
    parentName: "Sql",
    description: "Execute sql insert querry on previously configured connection. Credentails are stored in .env file.",
    shortDescription: "Execute sql insert querry on previously configured connection.",
    codeExplanation: ``,
    ui: InsertQuerry,
    Icon: QuestionMarkIcon,
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
export default InsertQuerryRecipe;
