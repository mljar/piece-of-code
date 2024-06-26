import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { TableColumnIcon } from "../../icons/TableColumn";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { MultiSelect } from "../../components/MultiSelect";
import { TableRowIcon } from "../../icons/TableRow";
import { FilterIcon } from "../../icons/Filter";
import { FilterSelect } from "../../components/FilterSelect";

const DOCS_URL = "pandas-filter-rows";

export const FilterRows: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  if (variablesStatus === "loaded" && !variables.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [newDf, setNewDf] = useState("df_filtered");
  const [allCols, setAllCols] = useState([] as string[]);
  const [col, setCol] = useState("");
  const [condition, setCondition] = useState("==");
  const [varType, setVarType] = useState("numeric");
  const [val, setVal] = useState("0");
  const [varDict, setVarDict] = useState({} as Record<string, string>);

  useEffect(() => {
    if (df === "") {
      setCol("");
    } else {
      try {
        const variable = variables.filter((v) => v.varName === df)[0];
        setAllCols(variable.varColumns);
        setCol(variable.varColumns[0]);
        setVarDict(
          Object.fromEntries(
            variable.varColumns.map((k, i) => [k, variable.varColumnTypes[i]])
          )
        );
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    if (col !== "") {
      setVarType(varDict[col] === "object" ? "object" : "numeric");
    }
  }, [col, varDict]);

  useEffect(() => {
    if (df === "" || col === "") {
      return;
    }
    let src = `# filter rows\n`;
    if (varType === "numeric") {
      src += `${newDf} = ${df}[${df}["${col}"] ${condition} ${val}]\n`;
    } else if (varType === "object") {
      if (condition === "contains") {
        src += `${newDf} = ${df}[${df}["${col}"].str.contains("${val}")]\n`;
      } else {
        src += `${newDf} = ${df}[${df}["${col}"] ${condition} "${val}"]\n`;
      }
    }
    src += `# display filtered data shape\n`;
    src += `print(f"${newDf} shape is {${newDf}.shape}")`;

    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMetadata) {
      setMetadata({
        df,
        col,
        newDf,
        condition,
        val,
        varType,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, col, newDf, condition, val, varType]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["col"] !== undefined) setCol(metadata["col"]);
      if (metadata["newDf"] !== undefined) setNewDf(metadata["newDf"]);
      if (metadata["condition"] !== undefined) setCondition(metadata["condition"]);
      if (metadata["val"] !== undefined) setVal(metadata["val"]);
      if (metadata["varType"] !== undefined) setCol(metadata["varType"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FilterIcon}
        label={"Filter rows in DataFrame"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Select input DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
            tooltip="DataFrame from which we will filter rows."
          />
          <Variable
            label={"New DataFrame"}
            name={newDf}
            setName={setNewDf}
            tooltip="You can use the same name as for input DataFrame but its value will be overwritten."
          />
          <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-2">
            <Select
              label={"Column"}
              option={col}
              setOption={setCol}
              options={allCols.map((a) => [a, a])}
            />
            <FilterSelect
              label={"Condition"}
              option={condition}
              setOption={setCondition}
              varType={varType}
            />
            <Variable label={"Value"} name={val} setName={setVal} />
          </div>
        </>
      )}
    </div>
  );
};

export const FilterRowsRecipe: IRecipe = {
  name: "Filter rows",
  longName: "Filter rows in Pandas DataFrame",
  parentName: "Data wrangling",
  description: `Filter rows in Pandas DataFrame based on condition. You can select a column and apply condition on it. Please be aware that there are different conditions for numeric and categorical columns.`,
  shortDescription: "Filter rows in Pandas DataFrame based on condition",
  ui: FilterRows,
  codeExplanation: `
1. Select a column and apply a filtering condition to its values. Only rows that fulfill the condition will be present in the DataFrame.
2. Display new DataFrame shape.

If you would like to filter based on more columns, please just apply **Filter rows** in the next cell on the next column.
`,
  Icon: FilterIcon,
  docsUrl: "pandas-filter-rows",
  tags: ["rows", "pandas", "filter"],
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "df_2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2", "feature3", "feature4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default FilterRowsRecipe;
