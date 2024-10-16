import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";

import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { TreesIcon } from "../../icons/Trees";

const DOCS_URL = "scikit-learn-random-forest";

export const TrainRandomForest: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("forest");
  const CLASSIFICATION = "Classification";
  const REGRESSION = "Regression";
  const mlTasks = [CLASSIFICATION, REGRESSION];
  const [mlTask, setMlTask] = useState(mlTasks[0]);
  const [trees, setTrees] = useState(100);

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
  const [maxFeaturesString, setMaxFeaturesString] = useState("sqrt");
  const [maxFeaturesNumber, setMaxFeaturesNumber] = useState(0.5);
  const [nJobs, setNJobs] = useState(-1);

  useEffect(() => {
    if (mlTask === CLASSIFICATION) {
      setCriterions(classCriterions);
      setCriterion(classCriterions[0]);
    } else {
      setCriterions(regCriterions);
      setCriterion(regCriterions[0]);
    }
  }, [mlTask]);

  useEffect(() => {
    let src = `# initialize Random Forest\n`;
    if (mlTask === mlTasks[0]) {
      src += `${model} = RandomForestClassifier(`;
      setPackages(["from sklearn.ensemble import RandomForestClassifier"]);
    } else {
      src += `${model} = RandomForestRegressor(`;
      setPackages(["from sklearn.ensemble import RandomForestRegressor"]);
    }
    src += `n_estimators=${trees}`;

    src += `, criterion="${criterion}"`;
    if (maxFeaturesString !== "sqrt") {
      if (maxFeaturesString !== "float") {
        if (maxFeaturesString === "None") {
          src += `, max_features=None`;
        } else {
          src += `, max_features="${maxFeaturesString}"`;
        }
      } else {
        src += `, max_features=${maxFeaturesNumber}`;
      }
    }
    if (isMaxDepth) {
      src += `, max_depth=${maxDepth}`;
    }
    if (minSamplesLeaf !== 1) {
      src += `, min_samples_leaf=${minSamplesLeaf}`;
    }
    if (minSamplesSplit !== 2) {
      src += `, min_samples_split=${minSamplesSplit}`;
    }
    src += `, random_state=${seed}`;
    src += `, n_jobs=${nJobs}`;

    src += `)\n`;
    src += `# display model card\n`;
    src += `${model}`;

    setCode(src);
    if (setMetadata) {
      setMetadata({
        model,
        mlTask,
        trees,
        criterion,
        minSamplesLeaf,
        minSamplesSplit,
        maxFeaturesString,
        maxFeaturesNumber,
        isMaxDepth,
        maxDepth,
        seed,
        nJobs,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    model,
    mlTask,
    criterion,
    trees,
    minSamplesLeaf,
    minSamplesSplit,
    maxFeaturesString,
    maxFeaturesNumber,
    maxDepth,
    isMaxDepth,
    seed,
    nJobs,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["mlTask"] !== undefined) setMlTask(metadata["mlTask"]);
      if (metadata["criterion"] !== undefined) setCriterion(metadata["criterion"]);
      if (metadata["minSamplesLeaf"] !== undefined)
        setMinSamplesLeaf(metadata["minSamplesLeaf"]);
      if (metadata["minSamplesSplit"] !== undefined)
        setMinSamplesSplit(metadata["minSamplesSplit"]);

      if (metadata["maxFeaturesString"] !== undefined)
        setMaxFeaturesString(metadata["maxFeaturesString"]);
      if (metadata["maxFeaturesNumber"] !== undefined)
        setMaxFeaturesNumber(metadata["maxFeaturesNumber"]);
      if (metadata["isMaxDepth"] !== undefined) setIsMaxDepth(metadata["isMaxDepth"]);
      if (metadata["maxDepth"] !== undefined) setMaxDepth(metadata["maxDepth"]);
      if (metadata["seed"] !== undefined) setSeed(metadata["seed"]);
      if (metadata["nJobs"] !== undefined) setNJobs(metadata["nJobs"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TreesIcon}
        label={"Random Forest"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />

      <>
        <Variable
          label={"Assign Random Forest model to variable"}
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
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Numeric
            label={"Number of trees"}
            name={trees}
            setName={setTrees}
            minValue={1}
          />
          <Numeric
            label={"Number of CPUs to use"}
            name={nJobs}
            setName={setNJobs}
            minValue={-1}
            tooltip="To use all CPUs for training please set -1"
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
                minValue={0}
              />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
              <Numeric
                label={"Do not split nodes smaller than"}
                tooltip={
                  "Minimum number of samples required to split an internal node"
                }
                name={minSamplesSplit}
                setName={setMinSamplesSplit}
                minValue={2}
              />

              <Numeric
                label={"Minimum number of samples in leaf node"}
                tooltip={
                  "The minimum number of samples required to be at a leaf node."
                }
                name={minSamplesLeaf}
                setName={setMinSamplesLeaf}
                minValue={1}
              />
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
              <Select
                label="Max features"
                option={maxFeaturesString}
                setOption={setMaxFeaturesString}
                options={["sqrt", "log2", "None", "float"].map((o) => [o, o])}
                tooltip="The number of features to consider when looking for the best split"
              />
              {maxFeaturesString === "float" && (
                <Numeric
                  label={"Max features"}
                  name={maxFeaturesNumber}
                  setName={setMaxFeaturesNumber}
                  minValue={0}
                  step={0.01}
                  tooltip="Ratio of all features to use for training, 1.0 means all features"
                />
              )}
            </div>

            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
              <Toggle
                label={"Set max depth of tree in forest"}
                value={isMaxDepth}
                setValue={setIsMaxDepth}
                tooltip="If not selected then nodes are expanded until all leaves are pure or until all leaves contain less than min_samples_split samples"
              />
              {isMaxDepth && (
                <Numeric
                  label={"Maximum depth of tree in forest"}
                  name={maxDepth}
                  setName={setMaxDepth}
                  minValue={1}
                />
              )}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export const TrainRandomForestRecipe: IRecipe = {
  name: "Random Forest",
  longName: "Scikit-learn Random Forest ",
  parentName: "Scikit-learn",
  description: `Create Random Forest model for classification or regression task. Please check **Advanced** options to set hyper parameters values. After model creation model should be fitted on data.`,
  shortDescription: `Create Random Forest model for classification or regression task. In Advanced options are available hyper parameters values to set.`,
  codeExplanation: `
Create model for Random Forest algorithm with selected hyper parameters. 

Please be aware that training time greatly depends on number of trees in the model and data size.`,
  ui: TrainRandomForest,
  Icon: TreesIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["random-forest", "classification", "regression"],
};

export default TrainRandomForestRecipe;
