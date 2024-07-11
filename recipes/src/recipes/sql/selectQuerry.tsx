import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { QuestionMarkIcon } from "../../icons/QuestionMark";

const DOCS_URL = "python-sql-querry";

export const SelectQuerry: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const my_connestions = variables
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
    if (variablesStatus === "loaded" && !my_connestions.length) {
        return (
            <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
                <p className="text-base text-gray-800 dark:text-white">
                    There are no connection objects in your notebook. You can open a new connection to run the querry.
                </p>
            </div>
        );
    }

    const [conn, setConnection] = useState(my_connestions[0]);
    const [collumns, setCollumns] = useState("please select querry collumns");
    const [tables, setTables] = useState("please select querry tables");

    useEffect(() => {
        let src = `connection_name = ${conn}\n\n`;
        src += `with connection_name:\n`;
        src += `    with connection_name.cursor() as cursor:\n\n`;
        src += `    # Querry db\n`;
        src += `    cur.execute("SELECT ${collumns} FROM ${tables}")\n\n`;
        src += `    # Fetch all the rows\n`;
        src += `    rows = cur.fetchall()\n\n`;
        src += `    # Print the results\n`;
        src += `    for row in rows:\n`;
        src += `        print(f"row")\n\n`;

        setCode(src);
        setPackages(["import os, import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                collumns,
                tables,
                variables: variables.filter((v) => v.varType === "connection"),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, collumns, tables]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["collumns"] !== undefined) setCollumns(metadata["collumns"]);
            if (metadata["tables"] !== undefined) setTables(metadata["tables"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={QuestionMarkIcon}
                label={"Run sql select querry"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            {conn === "" && (
                <p className="text-base text-gray-800 dark:text-white">
                    There are no connection objects in your notebook. You can open a new connection to run the querry.
                </p>
            )}
            {conn !== "" && (
                <>
                    <Variable
                        label={"Set connection variable name"}
                        name={conn}
                        setName={setConnection}
                    />
                    <Variable
                        label={"Choose querry collumns"}
                        name={collumns}
                        setName={setCollumns}
                    />
                    <Variable
                        label={"Choose querry tables"}
                        name={tables}
                        setName={setTables}
                    />
                </>
            )}
        </div>
    );
};

export const SelectQuerryRecipe: IRecipe = {
    name: "Run select querry",
    longName: "Execute sql select querry",
    parentName: "Sql",
    description: "Execute sql select querry on previously configured connection. Credentails are stored in .env file.",
    shortDescription: "Execute sql select querry on previously configured connection.",
    codeExplanation: ``,
    ui: SelectQuerry,
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
export default SelectQuerryRecipe;
