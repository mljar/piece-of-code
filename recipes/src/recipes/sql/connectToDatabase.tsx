import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { QuestionMarkIcon } from "../../icons/QuestionMark";

const DOCS_URL = "python-sql-querry";

export const ConnectToDatabase: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
}) => {
    const [conn, setConnection] = useState("conn");

    useEffect(() => {
        let src = `load_dotenv()\n\n`;
        src += `# open new connection:\n`;
        src += `${conn} = psycopg2.connect(\n`;
        src += `	dbname = os.getenv("POSTGRES_DB_NAME"),\n`;
        src += `	user = os.getenv("POSTGRES_USERNAME"),\n`;
        src += `	password = os.getenv("POSTGRES_PASSWORD"),\n`;
        src += `	host = os.getenv("POSTGRES_HOST_ADDRESS"),\n`;
        src += `	port = os.getenv("POSTGRES_PORT"),\n`;
        src += `)\n`;

        setCode(src);
        setPackages(["import psycopg2, import os"]);
        if (setMetadata) {
            setMetadata({
                conn,
                docsUrl: DOCS_URL,
            });
        }
    }, [conn]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
        }
    }, [metadata]);


    return (
        <div>
            <Title
                Icon={QuestionMarkIcon}
                label={"Define new database connection"}
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

export const ConnectToDatabaseRecipe: IRecipe = {
    name: "Connect to database",
    longName: "Open new database connection",
    parentName: "Sql",
    description: "Open new database connection using simple Python code. Credentials are loaded from .enf file",
    shortDescription: "Open new database connection using simple Python code.",
    codeExplanation: ``,
    ui: ConnectToDatabase,
    Icon: QuestionMarkIcon,
    requiredPackages: [
        { importName: "psycopg2", installationName: "psycopg2", version: ">=2.9.9" },
    ],
    docsUrl: DOCS_URL,
};

export default ConnectToDatabaseRecipe;
