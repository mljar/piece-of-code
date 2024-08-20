import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { InsertIcon } from "../../icons/Insert";
import { Toggle } from "../../components/Toggle";

import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgresql-insert";

export const InsertQuery: React.FC<IRecipeProps> = ({
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
  const [columns, setColumns] = useState("col1,col2,col3");
  const [table, setTable] = useState("table_name");
  const [values, setValues] = useState("val1,val2,val3");
  const [insertFromList, setInsertFromList] = useState(false);
  const [valuesFromList, setValuesFromList] = useState(listNames.length ? listNames[0] : "");
  const [showResults, setShowResults] = useState(false);

  let percentS = "%s"
  let valuesArr = values.split(",")
  let valuesArr2 = valuesFromList.split(",")

  if (!insertFromList) {
    for (let i = 0; i < columns.split(",").length; i++) {
      if (i !== 0) {
        percentS += ", %s";
      }
      valuesArr[i] = '"' + valuesArr[i] + '"'
    }
  } else {
    for (let i = 0; i < columns.split(",").length; i++) {
      if (i !== 0) {
        percentS += ", %s";
      }
      valuesArr2[i] = '"' + valuesArr2[i] + '"'
    }
  }

  let valuesWithQuetes = valuesArr.join()

  useEffect(() => {
    let src = ""

    // it is a poor solution to use insert from list but what else you gonna do? come up with smt better? pfff...
    if (valuesArr.length === columns.split(",").length || insertFromList) {
      src += `# if connection was used and closed it is reopen here\n`;
      src += `if ${conn}.closed:\n`;
      src += `    ${conn} = create_new_connection()\n\n`;

      src += `# run query\n`;
      src += `with ${conn}:\n`;
      src += `    with ${conn}.cursor() as cur:\n\n`;

      src += `        # insert into db\n`;
      src += `        try:\n`;
      if (!insertFromList) {
        if (showResults) {
          src += `            cur.execute("INSERT INTO ${table} (${columns}) values (${percentS}) RETURNING *", (${valuesWithQuetes},))\n`;
        } else {
          src += `            cur.execute("INSERT INTO ${table} (${columns}) values (${percentS})", (${valuesWithQuetes},))\n`;
        }
      } else {
        if (showResults) {
          src += `            query = "INSERT INTO ${table} (${columns}) VALUES (${percentS}) RETURNING *"\n`;
          // src += `            data = ${valuesFromList}\n`;
          src += `            cur.executemany(query, params_seq=${valuesFromList}, returning=True)\n`;
        } else {
          src += `            query = "INSERT INTO ${table} (${columns}) VALUES (${percentS})"\n`;
          // src += `            data = ${valuesFromList}\n`;
          src += `            cur.executemany(query, params_seq=${valuesFromList})\n`;
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
      src += "number of column names needs to be euqal to number of values"
    }

    setCode(src);
    setPackages(["import psycopg"]);
    if (setMetadata) {
      setMetadata({
        conn,
        columns,
        table,
        values,
        showResults,
        variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
        docsUrl: DOCS_URL,
      });
    }
  }, [conn, columns, table, values, insertFromList, valuesFromList, showResults]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
      if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
      if (metadata["table"] !== undefined) setTable(metadata["table"]);
      if (metadata["values"] !== undefined) setValues(metadata["values"]);
      if (metadata["valuesFromList"] !== undefined) setValuesFromList(metadata["valuesFromList"]);
      if (metadata["insertFromList"] !== undefined) setInsertFromList(metadata["insertFromList"]);
      if (metadata["showResults"] !== undefined) setShowResults(metadata["showResults"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={InsertIcon}
        label={"Run sql insert query"}
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
          label={"Table to insert into"}
          name={table}
          setName={setTable}
        />
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Toggle
            label={"Insert form list"}
            value={insertFromList}
            setValue={setInsertFromList}
          />
          <Toggle
            label={"Show results"}
            value={showResults}
            setValue={setShowResults}
          />
        </div>
      </div>
      <Variable
        label={"Columns to insert into"}
        name={columns}
        setName={setColumns}
        tooltip="comma separated list, no trailing comma, count needs to be equal to number of values"
      />
      {!insertFromList && (
        <Variable
          label={"Values to insert"}
          name={values}
          setName={setValues}
          tooltip="comma separated list, no trailing comma, count needs to be equal to number of columns"
        />
      )}
      {insertFromList && (
        <Select
          label={"Insert from this list"}
          option={valuesFromList} options={listNames.map((n) => [n, n])}
          setOption={setValuesFromList}
        />
      )}
    </div>
  );
};

export const InsertQueryRecipe: IRecipe = {
  name: "Run insert query",
  longName: "Python insert query in PostgreSQL",
  parentName: "Postgresql",
  // len: 256
  description: "Execute sql insert query. Credentials are loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values. Number of columns needs to be equal to number of values. You can ommit columns, if so None will be inserted.",
  // len: 156
  shortDescription: "Execute sql insert query. Credentials are loaded from .env file. Choose table name, then list out columns you wish to fill and then their respectful values.",
  codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Check if number of column is equal to values.
4. Try to insert into table.
4. If checked show the results.
5. If error occurs raise exception.
`,
  ui: InsertQuery,
  Icon: InsertIcon,
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
export default InsertQueryRecipe;
