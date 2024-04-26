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
import { ChartScatterIcon } from "../../icons/ChartScatter";

export const ScatterPlot: React.FC<IRecipeProps> = ({
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
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("my_tree");
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  const dataSeries = variables
    .filter((v) => v.varType === "Series")
    .map((v) => v.varName);

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

  return (
    <div>
      <Title
        Icon={TreeIcon}
        label={"Train Decision Tree"}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
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
            a
            </>
          )}
        </>
      )}
    </div>
  );
};

export const ScatterPlotRecipe: IRecipe = {
  name: "Scatter plot",
  longName: "Scatter plot in matplotlib",
  parentName: "matplotlib",
  description: `Scatter plot`,
  shortDescription:
    "Scatter plot",
  codeExplanation: ``,
  ui: ScatterPlot,
  Icon: ChartScatterIcon,
  requiredPackages: [
    { importName: "matplotlib", installationName: "matplotlib", version: ">=3.8.4" },
  ],
  docsUrl: "matplotlib-scatter",
  tags: ["matplotlib", "scatter"],
  defaultVariables: [
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

export default ScatterPlotRecipe;
