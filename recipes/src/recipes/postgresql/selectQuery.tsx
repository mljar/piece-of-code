import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { QueryIcon } from "../../icons/Query";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const DOCS_URL = "python-postgres-select";

export const SelectQuery: React.FC<IRecipeProps> = ({
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
  const [queryResults, setQueryResults] = useState("queryResults");

  let columnsArr = columns.split(",");

  for (let i = 0; i < columns.split(",").length; i++) {
    columnsArr[i] = "\"" + columnsArr[i] + "\""
  }

  let columnsWithQuotes = columnsArr.join()

  useEffect(() => {
    let src = `# if connection was used and closed it is reopen here\n`;
    src += `if ${conn}.closed:\n`;
    src += `    ${conn} = create_new_connection()\n\n`;

    src += `# run query\n`;
    src += `with ${conn}:\n`;
    src += `    with ${conn}.cursor() as cur:\n\n`;

    src += `        # query db\n`;
    src += `        try:\n`;
    // src += `            cur.execute("SELECT ${columns} FROM ${table}")\n`;
    src += `            cur.execute(\n`;
    src += `                sql.SQL("SELECT {columns} FROM {table}").format(\n`;
    if (columns === "*") {
      src += `                    columns=sql.SQL("*"),\n`;
    } else {
      src += `                    columns=sql.SQL(",").join(\n`;
      src += `                        [sql.Identifier(column) for column in [${columnsWithQuotes}]]\n`;
      src += `                    ),\n`;
    }
    src += `                    table=sql.Identifier("${table}"),\n`;
    src += `                )\n`;
    src += `            )\n`;

    src += `        # check for errors\n`;
    src += `        except psycopg.ProgrammingError as e:\n`;
    src += `            raise psycopg.ProgrammingError(f"""\n`;
    src += `Problem running query:\n`;
    src += `    {e}\n\n`;

    src += `Did you spell everything correctly?\n`;
    src += `You can use show tables and columns recipes.\n`;
    src += `            """)\n\n`;

    src += `        # save query results to a variable\n`;
    src += `        ${queryResults} = cur.fetchall()\n\n`;

    src += `        # print the results\n`;
    src += `        for row in ${queryResults}:\n`;
    src += `            print(f"{row}")`;

    setCode(src);
    setPackages(["import psycopg", "from psycopg import sql"]);
    if (setMetadata) {
      setMetadata({
        conn,
        columns,
        table,
        queryResults,
        variables: variables.filter((v) => v.varType === CONNECITON_PSYCOPG_TYPE),
        docsUrl: DOCS_URL,
      });
    }
  }, [conn, columns, table, queryResults]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["conn"] !== undefined) setConnection(metadata["conn"]);
      if (metadata["columns"] !== undefined) setColumns(metadata["columns"]);
      if (metadata["table"] !== undefined) setTable(metadata["table"]);
      if (metadata["queryResults"] !== undefined) setQueryResults(metadata["queryResults"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={QueryIcon}
        label={"Run sql select query"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose connection variable"}
          option={conn}
          options={connections.map((d) => [d, d])}
          setOption={setConnection}
        />
        <Variable
          label={"Variable to store query results"}
          name={queryResults}
          setName={setQueryResults}
        />
      </div>
      <Variable
        label={"Select table"}
        name={table}
        setName={setTable}
      />
      <Variable
        label={"Select columns"}
        name={columns}
        setName={setColumns}
        tooltip="comma separated list, no trailing comma"
      />
    </div>
  );
};

export const SelectQueryRecipe: IRecipe = {
  name: "Run select query",
  longName: "Python run select query in PostgreSQL",
  parentName: "Postgresql",
  // len: 150
  description: "Execute sql select query. Credentials are loaded from .env file. Choose table and column name. If there is no errors result is outputed to the screen.",
  shortDescription: "Execute sql select query. Credentials are loaded from .env file. Choose table and column name. If there is no errors result is outputed to the screen.",
  codeExplanation: `
1. Check if there is an open connection.
2. If not then open the connection.
3. Try to run select query.
4. Fetch results and show them to the user.
5. If error occurs raise exception.
`,
  ui: SelectQuery,
  Icon: QueryIcon,
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
export default SelectQueryRecipe;
