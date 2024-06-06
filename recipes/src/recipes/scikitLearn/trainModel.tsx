import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";
import { CategoryIcon } from "../../icons/Category";
import { TreeIcon } from "../../icons/Tree";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { AcademicIcon } from "../../icons/Academic";

const DOCS_URL = "scikit-learn-train-model";

export const TrainModel: React.FC<IRecipeProps> = ({
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
          There are no data objects in your notebook. Please create data object
          by reading data from file, url or database.
        </p>
      </div>
    );
  }
  const [advanced, setAdvanced] = useState(false);

  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const models = variables
    .filter(
      (v) => v.varType.includes("Classifier") || v.varType.includes("Regressor")
    )
    .map((v) => v.varName); 
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataObjects.length ? dataObjects[0] : "");
  const [target, setTarget] = useState(
    dataObjects.length? dataObjects[dataObjects.length - 1] : ""
  );
  const [sampleWeight, setSampleWeight] = useState("None");

  useEffect(() => {
    if(model === "" || df === "") {
      return;
    }
    let src = `# fit model\n`;

    src += `${model}.fit(${df}, ${target}`;

    if (sampleWeight !== "None") {
      src += `, sample_weight=${sampleWeight}`;
    }
    src += ")\n";
    setCode(src);
    if (setMetadata) {
      setMetadata({
        model,
        df,
        target,
        sampleWeight,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, df, target, sampleWeight]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["target"]) setTarget(metadata["target"]);
      if (metadata["sampleWeight"]) setSampleWeight(metadata["sampleWeight"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={AcademicIcon}
        label={"Train Model"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {models.length === 0 && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no model objects available, please construct the model. For
          example, create Decision Tree model.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Select model object for training"}
            option={model}
            options={models.map((d) => [d, d])}
            setOption={setModel}
          />

          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Select X (input data)"}
              option={df}
              options={dataObjects.map((d) => [d, d])}
              setOption={setDf}
            />
            <Select
              label={"Select y (target)"}
              option={target}
              options={dataObjects.map((c) => [c, c])}
              setOption={setTarget}
            />
          </div>

          {advanced && (
            <>
              <Select
                label={"Sample weight"}
                option={sampleWeight}
                options={
                  (dataObjects.push("None"), dataObjects.map((c) => [c, c]))
                }
                setOption={setSampleWeight}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export const TrainModelRecipe: IRecipe = {
  name: "Train Model",
  longName: "Train Scikit-Learn model",
  parentName: "Scikit-learn",
  description: `Train Scikit-Learn model on provided data (X, y). The **X** should be DataFrame or NumPy array with input data matrix. The **y** is a target attribute, with values that will be learn by model. User can specify sample weight, which describes how important is each sample, in the advanced options. This method can train any model that implements Scikit-Learn API.`,
  shortDescription:
    "Train Scikit-Learn model on provided data (X, y). It can be used with any model that implements Scikit-Learn APi.",
  codeExplanation: `
  This code fits model on training data (X, y). The training time depends on data size (number or rows and columns) and algorithm complexity.
  `,
  ui: TrainModel,
  Icon: AcademicIcon,
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
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2-object", "col3-object", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: ["target"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default TrainModelRecipe;
