// !! WARN !!
// This works but with a but where when you press the code field the form resets,
// for some reason
// (#60)
// !! WARN !!

import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { EditIcon } from "../../icons/Edit";

import { CONNECITON_PSYCOPG_TYPE } from "./utils";
import { TextArea } from "../../components/TextArea";

const DOCS_URL = "python-postgresql-update-selected";

export const UpdateSelected: React.FC<IRecipeProps> = ({
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

    const listNames = variables
        .filter((v) => v.varType === "list")
        .map((v) => v.varName);


    // if (variablesStatus === "loading") {
    //     return (
    //         <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
    //             <p className="text-base text-gray-800 dark:text-white">
    //                 Loading variables ...
    //             </p>
    //         </div>
    //     );
    // }

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
    const [dataList, setDataList] = useState(listNames.length ? listNames[0] : "");
    const [idList, setIdList] = useState(listNames.length ? listNames[0] : "");
    const [table, setTable] = useState("table");
    const [column, setColumn] = useState("column");
    const [value, setValue] = useState("val1,val2,val3");
    const [showResults, setShowResults] = useState(false);
    const [id, setId] = useState("1");
    const [chooseVar, setChooseVar] = useState(false);

    // const listContents = variables
    //     .filter((v) => v.varType === "list" && v.varName === dataList)
    //     .map((v) => v.varContent);

    let data = ""

    if (!chooseVar) {
        let valueArr = value.split(",")
        let j: number = +id

        for (let i = 0; i < valueArr.length; i++) {
            let unknownJ: unknown = j
            if (i === valueArr.length - 1) {
                data = data.concat("[\"id\": ", unknownJ as string, ", \"value\": \"", valueArr[i], "\"]")
                break
            }
            data = data.concat("[\"id\": ", unknownJ as string, ", \"value\": \"", valueArr[i], "\"], ")
            j++
        }
    }

    useEffect(() => {
        let src = `# if connection was used and closed it is reopen here\n`;
        src += `if ${conn}.closed: \n`;
        src += `    ${conn} = create_new_connection()\n\n`;

        src += `# run query\n`;
        src += `with ${conn}:\n`;
        src += `    with ${conn}.cursor() as cur:\n\n`;

        src += `        # update data\n`;
        src += `        try: \n`;
        if (!chooseVar) {
            src += `            data = ${data}\n`;
            if (showResults) {
                src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s RETURNING *"\n`;
                src += `            cur.executemany(query, data, returning = True)\n`;
            } else {
                src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s"\n`;
                src += `            cur.executemany(query, data)\n`;
            }
        } else {
            src += `            data = []\n`;
            src += `            for i in range(len(${idList})):\n`;
            src += `                data.append((${dataList}[i],${idList}[i]))\n`;
            src += `            data = [(${dataList}[i],${idList}[i]) for i in range(len(${idList}))]\n`;
            src += `            query = "UPDATE ${table} SET ${column} = %s WHERE id = %s"\n`;

            // src += `            data = [{"id": ${idList}[i], "value": ${dataList}[i]} for i in range(len(${idList}))]\n`;
            // src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s"\n`;
            src += `            cur.executemany(query, data)\n`;
        }
        src += `        # check for errors\n`;
        src += `        except psycopg.ProgrammingError as e:\n`;
        src += `            raise psycopg.ProgrammingError(f"""\n`;
        src += `Problem running query:\n`;
        src += `    {e}\n\n`;

        src += `Are you sure every name is spelled correctly?\n`;
        src += `You can use show all tables or columns to check db contents.\n`;
        src += `            """)`;

        if (showResults) {
            src += `\n\n`;
            src += `        # print the results\n`;
            // src += `        for result in cur.fetchall():\n`;
            // src += `            print(f"{result}")`;

            src += `        while True:\n`;
            src += `            for row in cur.fetchall():\n`;
            src += `                print(row)\n`;
            src += `            if not cur.nextset():\n`;
            src += `                break`;
        }

        setCode(src);
        setPackages(["import psycopg"]);
        if (setMetadata) {
            setMetadata({
                conn,
                column,
                table,
                value,
                showResults,
                variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
                docsUrl: DOCS_URL,
            });
        }
    }, [conn, column, table, value, showResults, id, dataList, idList, chooseVar]);

    useEffect(() => {
        if (metadata) {
            if ("mljar" in metadata) metadata = metadata.mljar;
            if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
            if (metadata["column"] !== undefined) setColumn(metadata["column"]);
            if (metadata["table"] !== undefined) setTable(metadata["table"]);
            if (metadata["value"] !== undefined) setValue(metadata["value"]);
        }
    }, [metadata]);

    return (
        <div>
            <Title
                Icon={EditIcon}
                label={"Update selected columns"}
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
                    value={showResults}
                    setValue={setShowResults}
                />
            </div>
            <Variable
                label={"Update column"}
                name={column}
                setName={setColumn}
            />
            {!chooseVar && (
                <Variable
                    label="Update on ID"
                    name={id}
                    setName={setId}
                />
            )}
            {chooseVar && (
                <Select
                    label="Update on ID"
                    option={idList}
                    options={listNames.map((n) => [n, n])}
                    setOption={setIdList}
                />
            )}
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                {!chooseVar && (
                    <TextArea
                        label={"Update to"}
                        text={value}
                        setText={setValue}
                    />
                )}
                {chooseVar && (
                    <Select
                        label={"Update to"}
                        option={dataList}
                        options={listNames.map((n) => [n, n])}
                        setOption={setDataList}
                    />
                )}
                <Toggle
                    label="Update from list"
                    value={chooseVar}
                    setValue={setChooseVar}
                />
            </div>
        </div>
    );
};

export const UpdateSelectedRecipe: IRecipe = {
    name: "Update selected",
    longName: "Python update selected columns in PostgreSQL",
    parentName: "Postgresql",
    // len: 207
    // description: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
    // shortDescription: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    //TODO
    description: "",
    shortDescription: "",
    codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to update the column.
4. If selected show results.
5. If error occurs raise exception.
`,
    ui: UpdateSelected,
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
export default UpdateSelectedRecipe;

