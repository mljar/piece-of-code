import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { TableColumnIcon } from "../../icons/TableColumn";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { MultiSelect } from "../../components/MultiSelect";

const DOCS_URL = "pandas-select-columns";

export const SelectCols: React.FC<IRecipeProps> = ({
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
  const [newDf, setNewDf] = useState("df2");
  const [allCols, setAllCols] = useState([] as string[]);
  const [xCols, setXCols] = useState([] as string[]);

  useEffect(() => {
    if (df === "") {
      setXCols([]);
    } else {
      const colList = variables
        .filter((v) => v.varName === df)
        .map((v) => v.varColumns);
      if (colList.length) {
        const cols = colList[0];
        setAllCols(cols);
        setXCols(cols.slice(0, cols.length - 1));
      }
    }
  }, [df]);

  useEffect(() => {
    if(df === "") return;
    if (!xCols) {
      return;
    }
    const xColsStr = '"' + xCols.join('", "') + '"';
    let src = `# select columns\n`;
    src += `${newDf} = ${df}[[${xColsStr}]]\n`;
    src += `# display new data shape\n`;
    src += `print(f"${newDf} shape is {${newDf}.shape}")`;
    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMetadata) {
      setMetadata({
        df,
        xCols,
        newDf,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, xCols, newDf]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["xCols"] !== undefined) setXCols(metadata["xCols"]);
      if (metadata["newDf"] !== undefined) setNewDf(metadata["newDf"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TableColumnIcon}
        label={"Select columns in DataFrame"}
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
            tooltip="DataFrame from which we will select columns."
          />
          <Variable
            label={"New DataFrame"}
            name={newDf}
            setName={setNewDf}
            tooltip="You can use the same name as for input DataFrame but its value will be overwritten."
          />
          <MultiSelect
            label={"Select columns"}
            selection={xCols}
            allOptions={allCols}
            setSelection={setXCols}
          />
        </>
      )}
    </div>
  );
};

export const SelectColsRecipe: IRecipe = {
  name: "Select Columns",
  longName: "Select columns from Pandas DataFrame",
  parentName: "Data wrangling",
  description: "Select columns from dataframe.",
  shortDescription: "Select columns from dataframe",
  ui: SelectCols,
  codeExplanation: "",
  Icon: TableColumnIcon,
  docsUrl: DOCS_URL,
  tags: ["column", "pandas", "filter"],
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

export default SelectColsRecipe;
