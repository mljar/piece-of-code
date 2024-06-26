import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { TableIcon } from "../../icons/Table";
import { Numeric } from "../../components/Numeric";

const DOCS_URL = "pandas-display-dataframe";

export const DfDisplay: React.FC<IRecipeProps> = ({
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
  const [nRows, setNRows] = useState(1);
  const displayOptions = [
    "Display first rows",
    "Display last rows",
    "Display rows from range",
  ];
  const [display, setDisplay] = useState(displayOptions[0]);
  const [rows, setRows] = useState(5);
  const [startRow, setStartRow] = useState(0);
  const [endRow, setEndRow] = useState(10);
 
  useEffect(() => {
    if (df === "") {
      setNRows(1);
    } else {
      try {
        const varShape = variables
          .filter((v) => v.varName === df)
          .map((v) => v.varShape)[0];
        setNRows(parseInt(varShape.split(" ")[0]));
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    let src = "";
    if (display === displayOptions[0]) {
      src += `# display head of datafame\n`;
      src += `${df}.head(n=${rows})\n`;
    } else if (display === displayOptions[1]) {
      src += `# display tail of datafame\n`;
      src += `${df}.tail(n=${rows})\n`;
    } else if (display === displayOptions[2]) {
      src += `# display datafame rows from range\n`;
      src += `${df}.iloc[${startRow}:${endRow}]\n`;
    }
    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMetadata) {
      setMetadata({
        df,
        display,
        rows,
        startRow,
        endRow,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, display, rows, startRow, endRow]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["display"] !== undefined) setDisplay(metadata["display"]);
      if (metadata["rows"] !== undefined) setRows(metadata["rows"]);
      if (metadata["startRow"] !== undefined) setStartRow(metadata["startRow"]);
      if (metadata["endRow"] !== undefined) setEndRow(metadata["endRow"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TableIcon}
        label={"Display DataFrame"}
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
            label={"DataFrame to display"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          <Select
            label={"Display option"}
            option={display}
            options={displayOptions.map((c) => [c, c])}
            setOption={setDisplay}
          />
          {display !== displayOptions[2] && (
            <Numeric
              label="Number of rows to display"
              name={rows}
              setName={setRows}
              minValue={1}
              maxValue={nRows}
            />
          )}
          {display === displayOptions[2] && (
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
              <Numeric
                label="Start row index"
                name={startRow}
                setName={setStartRow}
                minValue={0}
                maxValue={endRow - 1}
              />
              <Numeric
                label="End row index"
                name={endRow}
                setName={setEndRow}
                minValue={startRow + 1}
                maxValue={nRows}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const DfDisplayRecipe: IRecipe = {
  name: "Display DataFrame",
  longName: "Display Pandas DataFrame rows",
  parentName: "Data wrangling",
  description: `Display DataFrame rows. You can select to display:
  
- first rows from DataFrame (head),
- last rows from DataFrame (tail),
- rows from select range.`,
  shortDescription: "Display rows from Pandas DataFrame",
  codeExplanation: "",
  ui: DfDisplay,
  Icon: TableIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  tags: ["pandas", "head", "tail"],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "10 rows x 15 cols",
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
      varShape: "10 rows x 15 cols",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default DfDisplayRecipe;
