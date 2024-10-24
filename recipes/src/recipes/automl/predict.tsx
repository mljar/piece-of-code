import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { TargetArrowIcon } from "../../icons/TargetArrow";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
// import { IconCrystalBall } from "@tabler/icons-react";

const DOCS_URL = "python-predict-with-automl";

export const Predict: React.FC<IRecipeProps> = ({
  setCode,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const automls = variables
    .filter((v) => v.varType === "AutoML")
    .map((v) => v.varName);

  if (variablesStatus === "loading") {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          Loading variables ...
        </p>
      </div>
    );
  }
  if (variablesStatus === "loaded" && !automls.length) {
    return (
      <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-4 poc-rounded-md poc-text-xl">
        <p className="poc-text-base poc-text-gray-800 dark:poc-text-white">
          There are no AutoML objects in your notebook. Please train AutoML or
          load AutoML from folder.
        </p>
      </div>
    );
  }
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  if (variablesStatus === "loaded" && !dataFrames.length) {
    return (
      <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-4 poc-rounded-md">
        <p className="poc-text-base poc-text-gray-800 dark:poc-text-white">
          There are no DataFrames in your notebook. Please load example dataset
          or read data from file.
        </p>
      </div>
    );
  }
  const [name, setName] = useState("predictions");
  const [automl, setAutoml] = useState(automls[0]);
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");

  useEffect(() => {
    let src = `# predict with AutoML\n`;
    src += `${name} = ${automl}.predict(${df})\n`;
    src += `# predicted values\n`;
    src += `print(${name})`;
    setCode(src);

    if (setMetadata) {
      setMetadata({
        name,
        automl,
        df,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, automl, df]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"] !== undefined) setName(metadata["name"]);
      if (metadata["automl"] !== undefined) setAutoml(metadata["automl"]);
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TargetArrowIcon}
        label="Predict with AutoML"
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <Variable
        label={"Store predictions in variable name"}
        name={name}
        setName={setName}
      />
      <Select
        label={"Use AutoML object to predict"}
        option={automl}
        options={automls.map((a) => [a, a])}
        setOption={setAutoml}
      />
      <Select
        label={"Compute predictions for input data"}
        option={df}
        options={dataFrames.map((d) => [d, d])}
        setOption={setDf}
      />
    </div>
  );
};

export const PredictRecipe: IRecipe = {
  name: "Predict with AutoML",
  longName: "Compute predictions with AutoML",
  parentName: "MLJAR AutoML",
  description: "Compute predictions on new data with model trained with MLJAR AutoML.",
  shortDescription: "Compute predictions on new data with AutoML",
  codeExplanation: "",
  ui: Predict,
  Icon: TargetArrowIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.7",
    },
  ],
  defaultVariables: [
    {
      varName: "X",
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
      varName: "automl",
      varType: "AutoML",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};
