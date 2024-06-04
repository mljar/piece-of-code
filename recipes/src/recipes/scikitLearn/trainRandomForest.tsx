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

const DOCS_URL = "scikit-learn-random-forest";

export const TrainRandomForest: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("my_tree");

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
    src += `# display model card\n`;
    src += `${model}`

    setCode(src);
    if (setMetadata) {
      setMetadata({
        model,
        mlTask,
        criterion,
        minSamplesLeaf,
        minSamplesSplit,
        maxDepth,
        seed,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    model,
    mlTask,
    criterion,
    minSamplesLeaf,
    minSamplesSplit,
    maxDepth,
    isMaxDepth,
    seed,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["mlTask"]) setMlTask(metadata["mlTask"]);
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
        Icon={TreeIcon}
        label={"Decision Tree"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />

      <>
        <Variable
          label={"Assign Decision Tree to variable"}
          name={model}
          setName={setModel}
          tooltip="Decision Tree model can be later reused for computing predictions on new data."
        />
        <Select
          label={"Machine Learning task"}
          option={mlTask}
          options={mlTasks.map((d) => [d, d])}
          setOption={setMlTask}
        />

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
    </div>
  );
};

export const TrainDecisionTreeRecipe: IRecipe = {
  name: "Decision Tree",
  longName: "Decision Tree in Python",
  parentName: "Scikit-learn",
  description: `Train Decision Tree in Python. Algorithm can be used in classification and regression tasks. Please make sure that there are no missing values in the training data and all values are numeric.

  Please check **Advanced** options. There are several criterions available to measure split quality. What is more, you can control the tree structure by selecting minimum number of samples for internal node split and minimum samples in the leaf. The **max depth** parameter controls the depth of the tree, if it is not set then tree is trained till all leaves are pure or there are minimum samples in the internal node. 

  Decision Tree model can be persisted to hard disk in pickle format. 
    `,
  shortDescription:
    "Train Decision Tree in Python. Algorithm can be used in classification and regression tasks",
  codeExplanation: `
This code recipe initialize Decision Tree object. It is ready to fit or tunning.

Fitted object can be used to compute predictions. If you want to persist your Decision Tree, please save it to pickle file (**Save to pickle** recipe).
  `,
  ui: TrainRandomForest,
  Icon: TreeIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["random-forest", "classification", "regression"],
};

export default TrainDecisionTreeRecipe;
