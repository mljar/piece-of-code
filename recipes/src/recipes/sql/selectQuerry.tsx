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

    useEffect(() => {
        let src = `connection_name = "${conn}"\n`;
        src += `try:\n`;
        src += `    with connection_name:\n`;
        src += `        with connection_name.cursor() as cursor\n\n`;
        src += `            # Querry db\n`;
        src += `            cur.execute("SELECT * FROM users")\n\n`;
        src += `            # Fetch all the rows\n`;
        src += `            rows = cur.fetchall()\n\n`;
        src += `            # Print the results\n`;
        src += `            for row in rows:\n`;
        src += `                print(f"ID: {row[0]}, Name: {row[1]}, Email: {row[2]}")\n`;
        src += `    except Exception as e:\n`;
        src += `        raise e\n`;
        src += `    finally:\n`;
        src += `        connection_name.close()\n`;

        setCode(src);
        setPackages(["import os"]);
        if (setMetadata) {
            setMetadata({
                conn,
                docsUrl: DOCS_URL,
            });
        }
    }, [conn]);

    return (
        <div>
            <Title
                Icon={QuestionMarkIcon}
                label={"Run sql select querry"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Variable
                label={"Choose connection variable name"}
                name={conn}
                setName={setConnection}
            />
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
    requiredPackages: [],
    docsUrl: DOCS_URL,
};

export default SelectQuerryRecipe;
