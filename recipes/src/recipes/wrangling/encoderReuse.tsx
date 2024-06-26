import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { AffiliateIcon } from "../../icons/Affiliate";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";
import { CategoryIcon } from "../../icons/Category";

const DOCS_URL = "sklearn-use-categoricals-encoder-on-new-data";

export const EncoderReuse: React.FC<IRecipeProps> = ({
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

  const encoders = variables
    .filter(
      (v) => v.varType === "OrdinalEncoder" || v.varType === "OneHotEncoder"
    )
    .map((v) => v.varName);

  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [allCols, setAllCols] = useState([] as string[]);
  const [encoder, setEncoder] = useState(encoders.length ? encoders[0] : "");

  useEffect(() => {
    let src = `# convert categorical columns\n`;
    src += `${df}[${encoder}.feature_names_in_] = ${encoder}.transform(${df}[${encoder}.feature_names_in_])\n`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        df,
        encoder,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, encoder]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["encoder"] !== undefined) setEncoder(metadata["encoder"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CategoryIcon}
        label={"Use encoder to convert categoricals"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {encoder === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no encoders (OrdinalEncoder) in your notebook. Please fit
          encoder by converting categoricals to integers.
        </p>
      )}
      {df !== "" && encoder !== "" && (
        <>
          <Select
            label={"Select encoder"}
            option={encoder}
            options={encoders.map((d) => [d, d])}
            setOption={setEncoder}
          />
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

export const EncoderReuseRecipe: IRecipe = {
  name: "Use encoder on new data",
  longName: "Use categoricals encoder on new data",
  parentName: "Data wrangling",
  description: `Use previously fitted categoricals encoder on new data. Please just select encoder and DataFrame to convert categoricals. The encoder has information about which columns where present during fit and will convert only fitted columns. In case of new values, unseen during fit, the handle method selected during encoder initialization will be applied. Good luck!`,
  shortDescription: `Use previously fitted categoricals encoder on new data`,
  codeExplanation: "",
  ui: EncoderReuse,
  Icon: CategoryIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["pandas", "categorical"],
  defaultVariables: [
    {
      varName: "my_encode",
      varType: "OrdinalEncoder",
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

export default EncoderReuseRecipe;
