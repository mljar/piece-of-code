import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { EditIcon } from "../../icons/Edit";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgresql-update-column";

export const UpdateQuery: React.FC<IRecipeProps> = ({
    setCode,
    setPackages,
    metadata,
    setMetadata,
    variablesStatus,
    variables,
}) => {
    const connections = variables
        .filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE)
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
    const [table, setTable] = useState("table");
    const [column, setColumn] = useState("column");
    const [value, setValue] = useState("column * 1.05");
    const [advanced, setAdvanced] = useState(false);

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed:\n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # update data\n`;
        src += `        try:\n`;
        src += `            cur.execute("""\n`;
        src += `                UPDATE ${table}\n`;
        src += `                SET ${column} = ${value}\n`;
        if (advanced) {
            src += `                RETURNING *\n`;
        }
        src += `            """)\n`;
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem running query:\n`;
        src += `    {e}\n\n`;

        src += `Are you sure every name is spelled correctly?\n`;
        src += `You can use show all tables or columns to check db contents.\n`;
        src += `            """)`;

        if (advanced) {
            src += `\n\n`;
            src += `        # print the results\n`;
            src += `        for result in cur.fetchall():\n`;
            src += `            print(f"{result}")`;
        }

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                column,
                table,
                value,
                advanced,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, column, table, value, advanced]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["column"] !== undefined) setColumn(metadata["column"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
            if (metadata["value"] !== undefined) setValue(metadata["value"]);
            if (metadata["advanced"] !== undefined) setAdvanced(metadata["advanced"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={EditIcon}
                label={"Update column"}
                docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
            />
            <Select
                label={"Choose connection variable"}
                option={conn}
                options={connections.map((d) => [d, d])}
                setOption={setConnection}
            />
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Update in table"}
                    name={table}
                    setName={setTable}
                />
                <Toggle
                    label="Show results"
                    value={advanced}
                    setValue={setAdvanced}
                />
            </div>
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                    label={"Update column"}
                    name={column}
                    setName={setColumn}
                    tooltip="Every row in column will be updated"
                />
                <Variable
                    label={"Update to"}
                    name={value}
                    setName={setValue}
                />
            </div>
        </div>
    );
};

export const UpdateQueryRecipe: IRecipe = {
    name: "Update column",
    longName: "Python update column in PostgreSQL",
    parentName: "Postgresql",
    // len: 207
    description: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
    shortDescription: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to update the column.
4. If selected show results.
5. If error occurs raise exception.
`,
    ui: UpdateQuery,
    Icon: EditIcon,
    requiredPackages: [{ importName: "psycopg", installationName: "psycopg", version: ">=3.2.1" }],
    docsUrl: DOCS_URL,
    tags: ["python", "postgresql", "sql", "psycopg", ".env"],
    defaultVariables: [
        {
            varName: "conn",
            varType: CONNECITON_PSYCOPG_TYPE,
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "",
            isMatrix: false,
            isWidget: false,
        }],
};
export default UpdateQueryRecipe;