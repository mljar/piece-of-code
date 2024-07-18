import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { ConnectIcon } from "../../icons/Connect";

const DOCS_URL = "postgresql-connect-to-database";

export const ConnectToDatabase: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
}) => {
    const [conn, setConnection] = useState("conn");

    useEffect(() => {
        let src = `# load credentials from .env file:\n`;
        src += `load_dotenv()\n\n`;

        src += `def create_new_connection():\n`;
        src += `    return psycopg.connect(\n`;
        src += `        dbname=os.getenv("POSTGRES_DB_NAME"),\n`;
        src += `        user=os.getenv("POSTGRES_USERNAME"),\n`;
        src += `        password=os.getenv("POSTGRES_PASSWORD"),\n`;
        src += `        host=os.getenv("POSTGRES_HOST"),\n`;
        src += `        port=os.getenv("POSTGRES_PORT"),\n`;
        src += `    )\n\n`;

        src += `# open new connection:\n`;
        src += `${conn} = create_new_connection()`;


        setCode(src);
        setPackages(["import psycopg", "import os", "from dotenv import load_dotenv"]);
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
                Icon={ConnectIcon}
                label={"Connect to Postgresql database"}
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
    name: "Connect to Postgresql database",
    longName: "Connect to Postgresql database",
    parentName: "Postgresql",
    // len: 147
    description: "Open new Postgresql database connection using simple Python code. Credentials are defined in a define new connection recipe and loaded from .enf file",
    shortDescription: "Open new Postgresql database connection using simple Python code. Credentials are defined in a define new connection recipe and loaded from .enf file",
    codeExplanation: ``,
    ui: ConnectToDatabase,
    Icon: ConnectIcon,
    requiredPackages: [
        { importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" },
        // TODO
        // commented out due to a bug (#51), if fixed then should be uncommented
        // { importName: "dotenv", installationName: "python-dotenv", version: ">=1.0.1" },
    ],
    tags: ["ml", "machine-learning", "sql", "postgres", "psycopg"],
    docsUrl: DOCS_URL,
};

export default ConnectToDatabaseRecipe;
