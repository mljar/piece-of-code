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
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const [advanced, setAdvanced] = useState(false);
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  const dataSeries = variables
    .filter((v) => v.varType === "Series")
    .map((v) => v.varName);

  const models = variables
    .filter((v) => {
      const algorithms = [
        "DecisionTreeClassifier",
        "DecisionTreeRegressor",
        "RandomForestClassifier, RandomForestRegressor",
      ];
      console.log(
        v.varType,
        v.varType in algorithms,
        algorithms.includes(v.varType)
      );
      return algorithms.includes(v.varType);
    })
    .map((v) => v.varName);
  console.log(models);
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [target, setTarget] = useState(dataSeries.length ? dataSeries[0] : "");

  const mlTasks = ["Classification", "Regression"];
  const [mlTask, setMlTask] = useState(mlTasks[0]);
  const classCriterions = ["gini", "entropy", "log_loss"];
  const regCriterions = [
    "squared_error",
    "friedman_mse",
    "absolute_error",
    "poisson",
  ];
  const [criterions, setCriterions] = useState(classCriterions);
  const [criterion, setCriterion] = useState(classCriterions[0]);
  const [seed, setSeed] = useState(42);
  const [minSamplesSplit, setMinSamplesSplit] = useState(2);
  const [minSamplesLeaf, setMinSamplesLeaf] = useState(1);
  const [isMaxDepth, setIsMaxDepth] = useState(false);
  const [maxDepth, setMaxDepth] = useState(3);

  useEffect(() => {
    if (mlTask === mlTasks[0]) {
      setCriterions(classCriterions);
      setCriterion(classCriterions[0]);
    } else {
      setCriterions(regCriterions);
      setCriterion(regCriterions[0]);
    }
  }, [mlTask]);

  useEffect(() => {
    let src = `# initialize Decision Tree\n`;
    if (mlTask === mlTasks[0]) {
      src += `${model} = DecisionTreeClassifier(`;
      setPackages(["from sklearn.tree import DecisionTreeClassifier"]);
    } else {
      src += `${model} = DecisionTreeRegressor(`;
      setPackages(["from sklearn.tree import DecisionTreeRegressor"]);
    }
    src += `criterion="${criterion}"`;
    if (isMaxDepth) {
      src += `, max_depth=${maxDepth}`;
    }
    if (minSamplesLeaf !== 1) {
      src += `, min_samples_leaf=${minSamplesLeaf}`;
    }
    if (minSamplesSplit !== 2) {
      src += `, min_samples_split=${minSamplesSplit}`;
    }
    src += `, random_state=${seed})\n`;
    src += `# fit algorithm\n`;
    src += `${model}.fit(${df}, ${target})`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        model,
        mlTask,
        df,
        target,
        criterion,
        minSamplesLeaf,
        minSamplesSplit,
        maxDepth,
        seed,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    model,
    mlTask,
    df,
    target,
    criterion,
    minSamplesLeaf,
    minSamplesSplit,
    maxDepth,
    seed,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["mlTask"]) setMlTask(metadata["mlTask"]);
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["target"]) setTarget(metadata["target"]);
      if (metadata["criterion"]) setCriterion(metadata["criterion"]);
      if (metadata["minSamplesLeaf"])
        setMinSamplesLeaf(metadata["minSamplesLeaf"]);
      if (metadata["minSamplesSplit"])
        setMinSamplesSplit(metadata["minSamplesSplit"]);
      if (metadata["maxDepth"]) setMaxDepth(metadata["maxDepth"]);
      if (metadata["seed"]) setSeed(metadata["seed"]);
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
          There are no model objects available, please construct the model. For example, create Decision Tree model.
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
              options={dataFrames.map((d) => [d, d])}
              setOption={setDf}
            />
            <Select
              label={"Select y (target)"}
              option={target}
              options={dataSeries.map((c) => [c, c])}
              setOption={setTarget}
            />
          </div>

          {advanced && (
            <>
            
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Select
                  label={"Criterion"}
                  option={criterion}
                  options={criterions.map((c) => [c, c])}
                  setOption={setCriterion}
                  tooltip="Function to measure the quality of split."
                />

                <Numeric
                  label={"Random state seed"}
                  name={seed}
                  setName={setSeed}
                  tooltip="Controls the randomness of the algorithm."
                />

                <Numeric
                  label={"Do not split nodes smaller than"}
                  tooltip={
                    "Minimum number of samples required to split an internal node"
                  }
                  name={minSamplesSplit}
                  setName={setMinSamplesSplit}
                />

                <Numeric
                  label={"Minimum number of samples in leaf node"}
                  tooltip={
                    "The minimum number of samples required to be at a leaf node."
                  }
                  name={minSamplesLeaf}
                  setName={setMinSamplesLeaf}
                />

                <Toggle
                  label={"Set max depth of tree"}
                  value={isMaxDepth}
                  setValue={setIsMaxDepth}
                  tooltip="If not selected then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples"
                />
                {isMaxDepth && (
                  <Numeric
                    label={"Maximum depth of tree"}
                    name={maxDepth}
                    setName={setMaxDepth}
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const TrainModelRecipe: IRecipe = {
  name: "Train Model",
  longName: "Train Decision Tree in Python",
  parentName: "Scikit-learn",
  description: `Train Decision Tree in Python. Algorithm can be used in classification and regression tasks. Please make sure that there are no missing values in the training data and all values are numeric.

  Please check **Advanced** options. There are several criterions available to measure split quality. What is more, you can control the tree structure by selecting minimum number of samples for internal node split and minimum samples in the leaf. The **max depth** parameter controls the depth of the tree, if it is not set then tree is trained till all leaves are pure or there are minimum samples in the internal node. 

  Decision Tree model can be persisted to hard disk in pickle format. 
    `,
  shortDescription:
    "Train Decision Tree in Python. Algorithm can be used in classification and regression tasks",
  codeExplanation: `
1. Initialize Decision Tree object. 
2. Fit model on provided data.    

Fitted object can be used to compute predictions. If you want to persist your Decision Tree, please save it to pickle file (**Save to pickle** recipe).
  `,
  ui: TrainModel,
  Icon: AcademicIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["decision-tree", "classification", "regression"],
  defaultVariables: [
    {
      varName: "my_tre",
      varType: "DecisionTreeClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
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
