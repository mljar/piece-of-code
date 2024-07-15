import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { GlobeIcon } from "../../icons/Globe";

const DOCS_URL = "postgresql-define-connection";

export const DefineNewConnection: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    setEnv,
}) => {
    const [conn, setConnection] = useState("conn");
    const [dbname, setDBName] = useState("postgresql");
    const [username, setUsername] = useState("username");
    const [password, setPassword] = useState("password");
    const [host_address, setHostAddress] = useState("host_address");
    const [port, setPort] = useState("54321");

    useEffect(() => {
        // let src = `connection_name = "${conn}"\n`;
        // src += `database_name = "${dbname}"\n`;
        // src += `username = "${username}"\n`;
        // src += `password = "${password}"\n`;
        // src += `host_address = "${host_address}"\n`;
        // src += `port = "${port}"\n\n`;
        // src += `mode = "a" if os.path.exists(".env") else "w"\n`;
        // src += `# open file and write variable\n`;
        // src += `with open(".env", mode) as fout:\n`;
        // src += `    fout.write("POSTGRES_CONNECTION_NAME=connection_name")\n`;
        // src += `	fout.write("POSTGRES_DB_NAME=database_name"\n`;
        // src += `	fout.write("POSTGRES_USERNAME=username")\n`;
        // src += `	fout.write("POSTGRES_PASSWORD=password")\n`;
        // src += `	fout.write("POSTGRES_HOST_ADDRESS=host_address")\n`;
        // src += `	fout.write("POSTGRES_PORT=port")\n`;
        // src += `print("Secret saved in .env file")\n`;
        // src += `print("Please remove this code cell and save notebook, be safe!")`;

        let src = `print("Variable added successfully. Please check .env file")`;
        setCode(src);
        if (setEnv) {
            setEnv([["POSTGRES_CONNECTION_NAME", conn]]);
            setEnv([["POSTGRES_DB_NAME", dbname]]);
            setEnv([["POSTGRES_USERNAME", username]]);
            setEnv([["POSTGRES_PASSWORD", password]]);
            setEnv([["POSTGRES_HOST", host_address]]);
            setEnv([["POSTGRES_PORT", port]]);
        }
        setPackages(["import os"]);
        if (setMetadata) {
            setMetadata({
                // conn,
                // dbname,
                // username,
                // password,
                // host_address,
                // port,
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, dbname, username, password, host_address, port]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            // if (metadata["dbname"] !== undefined) setDBName(metadata["dbname"]);
            // if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            // if (metadata["username"] !== undefined) setUsername(metadata["username"]);
            // if (metadata["password"] !== undefined) setPassword(metadata["password"]);
            // if (metadata["host_address"] !== undefined) setHostAddress(metadata["host_address"]);
            // if (metadata["port"] !== undefined) setPort(metadata["port"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={GlobeIcon}
                label={"Define new database connection"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Choose connection variable name"}
                    name={conn}
                    setName={setConnection}
                />
                <Variable
                    label={"Choose database user name"}
                    name={username}
                    setName={setUsername}
                />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Set your database name"}
                    name={dbname}
                    setName={setDBName}
                />
                <Variable
                    label={"Put in database user password"}
                    name={password}
                    setName={setPassword}
                    isPassword={true}
                />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Set database host address"}
                    name={host_address}
                    setName={setHostAddress}
                />
            </div>
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Choose database port"}
                    name={port}
                    setName={setPort}
                />
            </div>
            {/*
            <div
                className="poc-mt-2 poc-p-4 poc-mb-4 poc-text-base poc-text-red-800 poc-rounded-lg poc-bg-red-50 dark:poc-bg-gray-800 dark:poc-text-red-400"
                role="alert"
            >
                <span className="poc-font-semibold poc-text-xl">
                    Please remove this code cell after execution!
                </span>
                <br />
                This cell runs code that saves variables in the <b>.env</b> file in your
                current directory. It is used to keep secrets. Secrets can't be stored
                in the code for security reasons. If the cell is executed successfully,
                please check that you have a <b>.env</b> file, and you can safely remove
                this cell and save the notebook.
            </div>
            */}
        </div>
    );
};

export const DefineNewConnectionRecipe: IRecipe = {
    name: "Define new Postgresql database connection",
    longName: "Define new Postgresql database connection",
    parentName: "Postgresql",
    // len: 196
    description: "Define new database connection using simple Python code. Provide database credentails to create new connection. Crededentaials are stored in .env file. Don't forger to close it after done using it",
    shortDescription: "Define new database connection using simple Python code. Provide database credentails to create new connection. Crededentaials are stored in .env file. Don't forger to close it after done using it",
    codeExplanation: ``,
    ui: DefineNewConnection,
    Icon: GlobeIcon,
    requiredPackages: [],
    tags: ["ml", "machine-learning", "sql", "postgres", "psycopg"],
    docsUrl: DOCS_URL,
};

export default DefineNewConnectionRecipe;
