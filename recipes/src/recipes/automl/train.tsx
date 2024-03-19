import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { EngineIcon } from "../../icons/Engine";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { SelectPath } from "../../components/SelectPath";

export const Train: React.FC<IRecipeProps> = ({
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

  const [name, setName] = useState("automl");
  const [resultsPath, setResultsPath] = useState("auto");
  let matrices = [] as string[];
  let vectors = [] as string[];

  if (variables) {
    matrices = variables
      .filter((e) => e.varType === "DataFrame")
      .map((e) => e.varName);
    vectors = variables
      .filter((e) => e.varType === "Series")
      .map((e) => e.varName);
  }
  const [X, setX] = useState(matrices.length ? matrices[0] : "");
  const [y, setY] = useState(vectors.length ? vectors[0] : "");
  const modeOptions = [
    ["Explain - initial data exploration", "Explain"],
    ["Performance - production ready ML", "Performance"],
    ["Compete - highly tuned ML", "Compete"],
  ] as [string, string][];
  const [mode, setMode] = useState("Explain");
  const [trainingTime, setTrainingTime] = useState(300);

  useEffect(() => {
    setPackages(["from supervised import AutoML"]);

    if (X === "" || y === "") {
      return;
    }
    let src = `# create automl object\n`;
    src += `${name} = AutoML(`;
    src += `total_time_limit=${trainingTime}`;
    src += `, mode="${mode}"`;
    if (resultsPath !== "auto") {
      src += `, results_path="${resultsPath}"`;
    }
    src += `)\n`;
    src += `# train automl\n`;
    src += `${name}.fit(${X}, ${y})`;

    setCode(src);
  }, [name, resultsPath, mode, trainingTime, X, y]);

  return (
    <div>
      <Title Icon={EngineIcon} label={"Train AutoML"} />
      <div className="grid md:grid-cols-2 md:gap-4">
        <Variable
          label={"AutoML variable name"}
          name={name}
          setName={setName}
        />
        <SelectPath
          label={"Where to save results?"}
          setPath={setResultsPath}
          selectFolder={true}
          defaultPath="auto"
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-4">
        <div>
          <Select
            label={"X training matrix (pandas.DataFrame)"}
            option={X}
            options={matrices.map((m) => [m, m])}
            setOption={setX}
          />
          <Select
            label={"y training vector (pandas.Series)"}
            option={y}
            options={vectors.map((m) => [m, m])}
            setOption={setY}
          />
        </div>
        <div>
          <Select
            label={"Training mode"}
            option={mode}
            options={modeOptions}
            setOption={setMode}
          />
          <Numeric
            label={"Training time [in seconds]"}
            name={trainingTime}
            setName={setTrainingTime}
          />
        </div>
      </div>
    </div>
  );
};

export const TrainRecipe: IRecipe = {
  name: "Train AutoML",
  longName: "Train AutoML in Python",
  parentName: "MLJAR AutoML",
  description: `Train a full machine learning pipeline on tabular data. You don't have to apply any preprocessing on data, the AutoML will fill missing values and convert categorical, text and dates into numeric format if needed. The AutoML will perform algorithm search and tunning. Please select training mode that you would like to use and set the training time budget.
  
  Available modes:
  - **Explain** - it is perfect for initial data analysis, very fast,
  - **Perform** - good for bulding production-level pipelines, considers prediction time during optimization,
  - **Compete** - the best model performance, it is using feature generation techniques and Stacked Ensemble.

  `,
  codeExplanation: `
  
  1. Create AutoML object. AutoML configuration is setup in the constructor.
  2. Train AutoML object.`,
  ui: Train,
  Icon: EngineIcon,
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.5",
    },
  ],
  docsUrl: "python-train-automl",
  defaultVariables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],

};
