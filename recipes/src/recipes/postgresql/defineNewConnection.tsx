import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { DatabaseIcon } from "../../icons/Database";

const DOCS_URL = "python-postgresql-define-connection";

export const DefineNewConnection: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    setEnv,
}) => {
    const [dbname, setDBName] = useState("database");
    const [username, setUsername] = useState("postgres");
    const [password, setPassword] = useState("password");
    const [host_address, setHostAddress] = useState("host_address");
    const [port, setPort] = useState("5432");

    useEffect(() => {
        let src = `print("Database connection credentials stored in .env file successfully.")`;
        setCode(src);

        if (setEnv) {
            setEnv([
                ["POSTGRES_DB_NAME", dbname],
                ["POSTGRES_USERNAME", username],
                ["POSTGRES_PASSWORD", password],
                ["POSTGRES_HOST", host_address],
                ["POSTGRES_PORT", port]
            ]);
        }

        setPackages([""]);

        if (setMetadata) {
            setMetadata({
                docsUrl: DOCS_URL,
            });
        }
    }, [dbname, username, password, host_address, port]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={DatabaseIcon}
                label={"Define new database connection"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Database name"}
                    name={dbname}
                    setName={setDBName}
                />
                <Variable
                    label={"Username"}
                    name={username}
                    setName={setUsername}
                />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Host address"}
                    name={host_address}
                    setName={setHostAddress}
                />
                <Variable
                    label={"Password"}
                    name={password}
                    setName={setPassword}
                    isPassword={true}
                />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Choose database port"}
                    name={port}
                    setName={setPort}
                />
            </div>
        </div>
    );
};

export const DefineNewConnectionRecipe: IRecipe = {
    name: "Define a new connection",
    longName: "Python define a new PostgreSQL connection",
    parentName: "Postgresql",
    // len: 159
    description: "Define new PostgreSQL database connection and store credentials in .env file. Provide in this recipe: database name, username, password, host address and port.",
    shortDescription: "Define new PostgreSQL database connection and store credentials in .env file. Provide in this recipe: database name, username, password, host address and port.",
    codeExplanation: `
1. Save provided values in .env file as POSTGRESQL credentails.
2. Notify the user when operation gets completed.
`,
    ui: DefineNewConnection,
    Icon: DatabaseIcon,
    requiredPackages: [],
    tags: ["python", "postgresql", "sql", "psycopg", ".env"],
    docsUrl: DOCS_URL,
};

export default DefineNewConnectionRecipe;
