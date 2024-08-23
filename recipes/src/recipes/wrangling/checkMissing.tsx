import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { QuestionMarkIcon } from "../../icons/QuestionMark";

const DOCS_URL = "pandas-check-missing-values";

export const CheckMissing: React.FC<IRecipeProps> = ({
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

  useEffect(() => {
    if(df === "") return;
    let src = `# are there any missing values\n`;
    src += `any_missing = ${df}.isnull().values.any()\n`;
    src += `print("There are missing values" if any_missing else "There are no missing values")\n`;
    src += `# count total number of missing values\n`;
    src += `total_missing = ${df}.isnull().sum().sum()\n`;
    src += `print(f"Total count of missing values: {total_missing}")\n`;
    src += `# missing values for each column\n`;
    src += `${df}.isnull().sum()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMetadata) {
      setMetadata({
        df,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={QuestionMarkIcon}
        label={"Check and count missing values"}
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
            label={"DataFrame to check missing values"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
        </>
      )}
    </div>
  );
};

export const CheckMissingRecipe: IRecipe = {
  name: "Check missing values",
  longName: "Check missing values in Pandas DataFrame",
  parentName: "Data wrangling",
  description: `
Check missing values in Pandas DataFrame. This Python recipe do several things:

- check if there are **any missing values** in DataFrame,
- count **total number of missing values** in DataFrame,
- check **missing values by each column** in DataFrame.`,
  shortDescription: "Check and count missing values in Pandas DataFrame",
  codeExplanation: "",
  ui: CheckMissing,
  Icon: QuestionMarkIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["pandas", "missing-values"],
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

export default CheckMissingRecipe;
