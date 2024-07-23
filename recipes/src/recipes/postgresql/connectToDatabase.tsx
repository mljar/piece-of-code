import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { ConnectIcon } from "../../icons/Connect";

const DOCS_URL = "python-postgresql-connect-to-database";

export const ConnectToDatabase: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
}) => {
    const [conn, setConnection] = useState("conn");

    useEffect(() => {
        let src = `# load credentials from .env file:\n`;
        src += `load_dotenv(override=True)\n\n`;

        src += `# get the credentials\n`;
        src += `def create_new_connection():\n`;
        src += `    conn = psycopg.connect(\n`;
        src += `    dbname=os.getenv("POSTGRES_DB_NAME"),\n`;
        src += `    user=os.getenv("POSTGRES_USERNAME"),\n`;
        src += `    password=os.getenv("POSTGRES_PASSWORD"),\n`;
        src += `    host=os.getenv("POSTGRES_HOST"),\n`;
        src += `    port=os.getenv("POSTGRES_PORT"),\n`;
        src += `    )\n`;
        src += `    return conn\n\n`;

        src += `# open new connection:\n`;
        src += `${conn} = create_new_connection()`;
        // src += `print(f"Success")`;

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
    name: "Connect to database",
    longName: "Python connect to PostgreSQL database",
    parentName: "Postgresql",
    // len: 200
    description: "Open new Postgresql database connection, credentials are loaded from .env file. Incorrect credentials will raise an appropriate error. To edit the credentials add them in define new connection recipe.",
    shortDescription: "Open new Postgresql database connection, credentials are loaded from .env file. Incorrect credentials will raise an appropriate error. To edit the credentials add them in define new connection recipe.",
    codeExplanation: `
1. Load credentials from .env file.
2. Try to establish connection with database.
`,
    ui: ConnectToDatabase,
    Icon: ConnectIcon,
    requiredPackages: [
        { importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" },
        // TODO
        // commented out due to a bug (#51), if fixed then should be uncommented
        // { importName: "dotenv", installationName: "python-dotenv", version: ">=1.0.1" },
    ],
    tags: ["python", "postgresql", "sql", "psycopg", ".env", "python-dotenv"],
    docsUrl: DOCS_URL,
};

export default ConnectToDatabaseRecipe;
