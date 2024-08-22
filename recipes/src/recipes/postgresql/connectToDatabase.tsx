import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { ConnectIcon } from "../../icons/Connect";
import { Toggle } from "../../components/Toggle";

const DOCS_URL = "python-postgresql-connect-to-database";

export const ConnectToDatabase: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [conn, setConnection] = useState("conn");
  const [displayConnStatus, setDisplayConnStatus] = useState(false);

  useEffect(() => {
    let src = `# load credentials from .env file:\n`;
    src += `load_dotenv(override=True)\n\n`;

    src += `# get the credentials\n`;
    src += `def create_new_connection():\n`;
    src += `    try:\n`;
    src += `        conn = psycopg.connect(\n`;
    src += `            dbname=os.getenv("POSTGRES_DB_NAME"),\n`;
    src += `            user=os.getenv("POSTGRES_USERNAME"),\n`;
    src += `            password=os.getenv("POSTGRES_PASSWORD"),\n`;
    src += `            host=os.getenv("POSTGRES_HOST"),\n`;
    src += `            port=os.getenv("POSTGRES_PORT"),\n`;
    src += `        )\n`;
    if (displayConnStatus) {
      src += `        # display connection status\n`;
      src += `        print("Connection status: " + conn.info.status.name)\n`;
    }
    src += `        return conn\n`;
    src += `    # check for errors\n`;
    src += `    except psycopg.Error as e:\n`;
    src += `        raise psycopg.Error(f"""\n`;
    src += `Error occurred while establishing connection: \n`;
    src += `    {e}\n\n`;

    src += `Maybe you provided wrong credentials, use define new connection recipe to edit them.\n`;
    src += `Other option is that database server is down or you dont have the right acces to this database.\n`;
    src += `            """)\n\n`;

    src += `# open new connection:\n`;
    src += `${conn} = create_new_connection()`;

    setCode(src);
    setPackages(["import psycopg", "import os", "from dotenv import load_dotenv"]);
    if (setMetadata) {
      setMetadata({
        conn,
        displayConnStatus,
        docsUrl: DOCS_URL,
      });
    }
  }, [conn, displayConnStatus]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
      if (metadata["displayConnStatus"] !== undefined) setDisplayConnStatus(metadata["displayConnStatus"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ConnectIcon}
        label={"Connect to Postgresql database"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Variable
          label={"Choose connection variable name"}
          name={conn}
          setName={setConnection}
        />
        <Toggle
          label={"Display connection status"}
          value={displayConnStatus}
          setValue={setDisplayConnStatus}
        />
      </div>
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
3. If checked, display the connection.
`,
  ui: ConnectToDatabase,
  Icon: ConnectIcon,
  requiredPackages: [
    { importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" },
    { importName: "dotenv", installationName: "python-dotenv", version: ">=1.0.1" },
  ],
  tags: ["python", "postgresql", "sql", "psycopg", ".env", "python-dotenv"],
  docsUrl: DOCS_URL,
};

export default ConnectToDatabaseRecipe;
