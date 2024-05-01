import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { QuestionMarkIcon } from "../../icons/QuestionMark";
import { InfoSquareIcon } from "../../icons/InfoSquare";

export const DfInfo: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
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

  useEffect(() => {
    let src = `# display datafame information\n`;
    src += `${df}.info()\n`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [df]);

  return (
    <div>
      <Title Icon={InfoSquareIcon} label={"DataFrame information"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Select DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
        </>
      )}
    </div>
  );
};

export const DfInfoRecipe: IRecipe = {
  name: "DataFrame info",
  longName: "Pandas DataFrame information",
  parentName: "Data wrangling",
  description: `Display information about DataFrame columns, non-null counts, data types and memory usage.`,
  shortDescription:
    "Check information about DataFrame columns, non-nulls, types and memory usage",
  codeExplanation: "",
  ui: DfInfo,
  Icon: InfoSquareIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  tags: ["pandas", "info"],
  docsUrl: "pandas-dataframe-info",
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

export default DfInfoRecipe;
