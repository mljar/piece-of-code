import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { CrystalBallIcon } from "../../icons/CrystalBall";

const DOCS_URL = "scikit-learn-predict";

export const Predict: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => { 
  if (
    variables === undefined ||
    (variablesStatus === "loaded" && !variables.length)
  ) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create data object
          by reading data from file, url or database.
        </p>
      </div>
    );
  }

  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);

  const models = variables
    .filter(
      (v) => v.varType.includes("Classifier") || v.varType.includes("Regressor")
    )
    .map((v) => v.varName);

  const [name, setName] = useState("predicted");
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataObjects.length ? dataObjects[0] : "");

  useEffect(() => {
    if (model === "" || df === "") {
      return;
    }
    let src = `# compute prediction\n`;
    src += `${name} = ${model}.predict(${df})\n`;
    src += `print("Predictions")\n`;
    src += `print(${name})\n`;

    const isClassifier =
      variables
        .filter((v) => v.varName === model)
        .filter((v) => v.varType.includes("Classifier")).length > 0;
    if (isClassifier) {
      src += `\n# predict class probabilities\n`;
      src += `${name}_proba = ${model}.predict_proba(${df})\n`;
      src += `print("Predicted class probabilities")\n`;
      src += `print(${name}_proba)\n`;
    }

    setCode(src);

    if (setMetadata) {
      setMetadata({
        name,
        model,
        df,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, model, df]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"]) setName(metadata["name"]);
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["df"]) setDf(metadata["df"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CrystalBallIcon}
        label={"Compute predictions"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook.
        </p>
      )}
      {models.length === 0 && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no model objects available, please construct and fit a
          model.
        </p>
      )}
      {df !== "" && (
        <>
          <Variable
            label={"Allocate predictions to variable"}
            name={name}
            setName={setName}
          />

          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Select model object for training"}
              option={model}
              options={models.map((d) => [d, d])}
              setOption={setModel}
            />

            <Select
              label={"Select X (input data)"}
              option={df}
              options={dataObjects.map((d) => [d, d])}
              setOption={setDf}
            />
          </div>
        </>
      )}
    </div>
  );
};

export const PredictRecipe: IRecipe = {
  name: "Compute Predictions",
  longName: "Compute Predictions",
  parentName: "Scikit-learn",
  description: `Compute output values on provided data with Machine Learning model. Predictions are allocated to variable, so they can be later used to compute performance metrics. Additionally, class probabilities are computed for classifiers.`,
  shortDescription: `Compute prediction on provided data with Machine Learning model. `,
  codeExplanation: `
1. Compute predictions on provided data.
2. Compute class probabilities on provided data only for classifier model.  

Predictions are allocated to variables, so can be later used to compute performance metrics.
  `,
  ui: Predict,
  Icon: CrystalBallIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["classification", "regression", "fit"],
  defaultVariables: [
    {
      varName: "my_classifier",
      varType: "DecisionTreeClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "my_regressor",
      varType: "DecisionTreeRegressor",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "test_data",
      varType: "DataFrame",
      varColumns: ["col1", "col2-object", "col3-object", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default PredictRecipe;
