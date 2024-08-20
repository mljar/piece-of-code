import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { TextArea } from "../../components/TextArea";
import { EditCircleIcon } from "../../icons/EditCircle";

import { CONNECITON_PSYCOPG_TYPE } from "./utils";

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

  const [table, setTable] = useState("table_name");
  const [column, setColumn] = useState("column");

  const [id, setId] = useState("1, 2, 3");
  const [value, setValue] = useState("val1,val2,val3");
  const [idList, setIdList] = useState(listNames.length ? listNames[0] : "");
  const [valueList, setValueList] = useState(listNames.length ? listNames[0] : "");

  const [showResults, setShowResults] = useState(false);
  const [updateFromList, setUpdateFromList] = useState(false);

  let data = "";
  let lengthsEqual = true;

  if (!updateFromList) {
    let valueArr = value.split(",");

    if (id.split(",").length === 1) {
      let j: number = +id;

      for (let i = 0; i < valueArr.length; i++) {
        let unknownJ: unknown = j;
        if (i === valueArr.length - 1) {
          data = data.concat("{\"id\": ", unknownJ as string, ", \"value\": \"", valueArr[i], "\"}");
          break;
        }
        data = data.concat("{\"id\": ", unknownJ as string, ", \"value\": \"", valueArr[i], "\"}, ");
        j++;
      }
    } else {
      let idArr = id.split(",");

      if (idArr.length === valueArr.length) {
        lengthsEqual = true;

        for (let i = 0; i < valueArr.length; i++) {
          if (i === valueArr.length - 1) {
            data = data.concat("{\"id\": ", idArr[i], ", \"value\": \"", valueArr[i], "\"}");
            break;
          }
          data = data.concat("{\"id\": ", idArr[i], ", \"value\": \"", valueArr[i], "\"}, ");
        }
      } else {
        lengthsEqual = false;
      }
    }
  }

  useEffect(() => {
    let src = ""

    if (((lengthsEqual) || id.split(",").length === 1) || updateFromList) {
      src = `# if connection was used and closed it is reopen here\n`;
      src += `if ${conn}.closed: \n`;
      src += `    ${conn} = create_new_connection()\n\n`;

      src += `# run query\n`;
      src += `with ${conn}:\n`;
      src += `    with ${conn}.cursor() as cur:\n\n`;

      src += `        # update data\n`;
      src += `        try: \n`;
      if (updateFromList) {
        if (showResults) {
          src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s RETURNING *"\n`;
          src += `            cur.executemany(query, params_seq=[{"id": ${idList}[i], "value": ${valueList}[i]} for i in range(len(${idList}))], returning=True)\n`;
        } else {
          src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s"\n`;
          src += `            cur.executemany(query, params_seq=[{"id": ${idList}[i], "value": ${valueList}[i]} for i in range(len(${idList}))])\n`;
        }
      } else {
        if (showResults) {
          src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s RETURNING *"\n`;
          src += `            cur.executemany(query, params_seq=[${data}], returning=True)\n`;
        } else {
          src += `            query = "UPDATE ${table} SET ${column} = %(value)s WHERE id = %(id)s"\n`;
          src += `            cur.executemany(query, params_seq=[${data}])\n`;
        }
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
        src += `        while True:\n`;
        src += `            for row in cur.fetchall():\n`;
        src += `                print(row)\n`;
        src += `            if not cur.nextset():\n`;
        src += `                break`;
      }
    } else {
      src += "number of ids needs to be euqal to number of values"
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
  }, [conn, column, table, value, showResults, id, valueList, idList, updateFromList]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
      if (metadata["column"] !== undefined) setColumn(metadata["column"]);
      if (metadata["table"] !== undefined) setTable(metadata["table"]);
      if (metadata["id"] !== undefined) setId(metadata["id"]);
      if (metadata["value"] !== undefined) setValue(metadata["value"]);
      if (metadata["idList"] !== undefined) setIdList(metadata["idList"]);
      if (metadata["valueList"] !== undefined) setValueList(metadata["valueList"]);
      if (metadata["showResults"] !== undefined) setShowResults(metadata["showResults"]);
      if (metadata["updateFromList"] !== undefined) setUpdateFromList(metadata["updateFromList"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={EditCircleIcon}
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
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Toggle
            label="Update from list"
            value={updateFromList}
            setValue={setUpdateFromList}
          />
          <Toggle
            label="Show results"
            value={showResults}
            setValue={setShowResults}
          />
        </div>
      </div>
      <Variable
        label={"Update column"}
        name={column}
        setName={setColumn}
      />
      {!updateFromList && (
        <Variable
          label="Update on ID"
          name={id}
          setName={setId}
          tooltip={`comma separated list of ids of rows to be updated,
if given one number, it will update consequent ids untill every value will be used`}
        />
      )}
      {updateFromList && (
        <Select
          label="Update on ID list"
          option={idList}
          options={listNames.map((n) => [n, n])}
          setOption={setIdList}
        />
      )}
      {!updateFromList && (
        <TextArea
          label={"Update to"}
          text={value}
          setText={setValue}
          tooltip="comma separated list of values to be inserted into selected column"
        />
      )}
      {updateFromList && (
        <Select
          label={"Update to value list"}
          option={valueList}
          options={listNames.map((n) => [n, n])}
          setOption={setValueList}
        />
      )}
    </div>
  );
};

export const UpdateSelectedRecipe: IRecipe = {
  name: "Update selected",
  longName: "Python update selected columns in PostgreSQL",
  parentName: "Postgresql",
  // len: 202
  description: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
  shortDescription: "Update entire columns in database usign UPDATE PosgreSQL keyword. To gain finer control and update only selected rows use our raw query recipe and craft your own query! Credentials are loaded from .env file.",
  codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. If update from list selected, pull data from given lists.
4. Try to update the selection.
5. If selected show results.
6. If error occurs raise exception.
`,
  ui: UpdateSelected,
  Icon: EditCircleIcon,
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
    },
    {
      varName: "values",
      varType: "list",
      varColumns: [""],
      varColumnTypes: [""],
      varSize: "",
      varShape: "",
      varContent: "[val1, val2, val3, val4, val5]",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "ids",
      varType: "list",
      varColumns: [""],
      varColumnTypes: [""],
      varSize: "",
      varShape: "",
      varContent: "[1, 2, 3, 4, 5]",
      isMatrix: false,
      isWidget: false,
    },
  ],
};
export default UpdateSelectedRecipe;

