import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { AffiliateIcon } from "../../icons/Affiliate";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";

export const FillMissingReuse: React.FC<IRecipeProps> = ({
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

  const imputers = variables
    .filter((v) => v.varType === "KNNImputer" || v.varType === "SimpleImputer")
    .map((v) => v.varName);

  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [allCols, setAllCols] = useState([] as string[]);
  const [col, setCol] = useState("");
  const [imputer, setImputer] = useState(imputers.length ? imputers[0] : "");

  useEffect(() => {
    if (df === "") {
      setCol("");
    } else {
      try {
        const variable = variables.filter((v) => v.varName === df)[0];
        setAllCols(variable.varColumns);
        setCol(variable.varColumns[0]);
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    let src = `# fill missing data using imputer\n`;
    src += `${df}["${col}"] = ${imputer}.transform(${df}["${col}"])\n`;
    setCode(src);
  }, [df, col, imputer]);

  return (
    <div>
      <Title Icon={AffiliateIcon} label={"Use imputer to fill missing values"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {imputer === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no imputers (SimpleImpute or KNNImpute) in your notebook.
          Please fit imputer by filling missing values in DataFrame.
        </p>
      )}
      {df !== "" && imputer !== "" && (
        <>
          <Select
            label={"Select imputer"}
            option={imputer}
            options={imputers.map((d) => [d, d])}
            setOption={setImputer}
          />
          <Select
            label={"DataFrame to fill missing values"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          <Select
            label={"Column"}
            option={col}
            setOption={setCol}
            options={allCols.map((a) => [a, a])}
          />
        </>
      )}
    </div>
  );
};

export const FillMissingReuseRecipe: IRecipe = {
  name: "Use imputer on new data",
  longName: "Use missing values imputer on new data",
  parentName: "Data wrangling",
  description: `Use previously fitted imputer on new data.`,
  shortDescription: `Use previously fitted imputer on new data.`,
  codeExplanation: "",
  ui: FillMissingReuse,
  Icon: AffiliateIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
    },
  ],
  docsUrl: "sklearn-use-imputer-on-new-data",
  tags: ["pandas", "missing-values"],
  defaultVariables: [
    {
      varName: "simple_imputer",
      varType: "SimpleImputer",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "knn_imputer",
      varType: "KNNImputer",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
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

export default FillMissingReuseRecipe;