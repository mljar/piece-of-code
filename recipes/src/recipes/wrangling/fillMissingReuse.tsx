import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { AffiliateIcon } from "../../icons/Affiliate";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";

const DOCS_URL = "sklearn-use-imputer-on-new-data";

export const FillMissingReuse: React.FC<IRecipeProps> = ({
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

  const imputers = variables
    .filter((v) => v.varType === "KNNImputer" || v.varType === "SimpleImputer")
    .map((v) => v.varName);

  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [allCols, setAllCols] = useState([] as string[]);
  const [imputer, setImputer] = useState(imputers.length ? imputers[0] : "");

  useEffect(() => {
    let src = `# fill missing data using imputer\n`;
    src += `${df}[${imputer}.feature_names_in_] = ${imputer}.transform(${df}[${imputer}.feature_names_in_])\n`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        df,
        imputer,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, imputer]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["imputer"]) setImputer(metadata["imputer"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={AffiliateIcon}
        label={"Use imputer to fill missing values"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
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
  shortDescription: `Use previously fitted imputer on new data`,
  codeExplanation: "",
  ui: FillMissingReuse,
  Icon: AffiliateIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
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
