import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { EngineIcon } from "../../icons/Engine";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { SelectPath } from "../../components/SelectPath";
import { MultiSelect } from "../../components/MultiSelect";

const DOCS_URL = "python-train-automl";

export const Train: React.FC<IRecipeProps> = ({
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

  const [name, setName] = useState("automl");
  const [resultsPath, setResultsPath] = useState("auto");
  const [advanced, setAdvanced] = useState(false);
  const allAlgorithms = [
    "Baseline",
    "Linear",
    "Decision Tree",
    "Random Forest",
    "Extra Trees",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "Neural Network",
    "Nearest Neighbors",
  ];
  const explainAlgorithms = [
    "Baseline",
    "Linear",
    "Decision Tree",
    "Random Forest",
    "XGBoost",
    "Neural Network",
  ];
  const performAlgorithms = [
    "Linear",
    "Random Forest",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "Neural Network",
  ];
  const competeAlgorithms = [
    "Decision Tree",
    "Random Forest",
    "Extra Trees",
    "XGBoost",
    "LightGBM",
    "CatBoost",
    "Neural Network",
    "Nearest Neighbors",
  ];
  const [algorithms, setAlgorithms] = useState([
    "Baseline",
    "Linear",
    "Decision Tree",
    "Random Forest",
    "XGBoost",
    "Neural Network",
  ]);
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
  const metrics = [
    "auto",
    "logloss",
    "auc",
    "f1",
    "average_precision",
    "accuracy",
    "rmse",
    "mse",
    "mae",
    "r2",
    "mape",
    "spearman",
    "pearson",
  ];
  const [metric, setMetric] = useState("auto");
  const [trainEnsemble, setTrainEnsemble] = useState("yes");
  const [stackModels, setStackModels] = useState("auto");
  const [featuresSelection, setFeaturesSelection] = useState("auto");
  const [goldenFeatures, setGoldenFeatures] = useState("auto");
  const [kMeansFeatures, setKMeansFeatures] = useState("auto");
  const [boostOnErrors, setBoostOnErrors] = useState("auto");

  useEffect(() => {
    if (mode === "Explain") {
      setAlgorithms(explainAlgorithms);
    } else if (mode === "Performance") {
      setAlgorithms(performAlgorithms);
    } else if (mode === "Compete") {
      setAlgorithms(competeAlgorithms);
    }
  }, [mode]);

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
    if (metric !== "auto") {
      src += `, eval_metric="${metric}"`;
    }
    if (trainEnsemble === "no") {
      src += `, train_ensemble=False`;
    }

    if (stackModels !== "auto") {
      src += `, stack_models=${stackModels == "yes" ? "True" : "False"}`;
    }

    if (featuresSelection !== "auto") {
      src += `, features_selection=${featuresSelection == "yes" ? "True" : "False"}`;
    }
    if (goldenFeatures !== "auto") {
      src += `, golden_features=${goldenFeatures == "yes" ? "True" : "False"}`;
    }
    if (kMeansFeatures !== "auto") {
      src += `, kmeans_features=${kMeansFeatures == "yes" ? "True" : "False"}`;
    }
    if (boostOnErrors !== "auto") {
      src += `, boost_on_errors=${boostOnErrors == "yes" ? "True" : "False"}`;
    }

    if (algorithms.length > 0) {
      let includeAlgorithms = false;
      if (mode === "Explain") {
        if (JSON.stringify(algorithms) !== JSON.stringify(explainAlgorithms)) {
          includeAlgorithms = true;
        }
      } else if (mode === "Perform") {
        if (JSON.stringify(algorithms) !== JSON.stringify(performAlgorithms)) {
          includeAlgorithms = true;
        }
      } else if (mode === "Compete") {
        if (JSON.stringify(algorithms) !== JSON.stringify(competeAlgorithms)) {
          includeAlgorithms = true;
        }
      }
      if (includeAlgorithms) {
        src += `,\n    algorithms=[\n        "${algorithms.join('",\n        "')}"\n    ]`;
      }
    }

    src += `)\n`;
    src += `# train automl\n`;
    src += `${name}.fit(${X}, ${y})`;
    setCode(src);

    if (setMetadata) {
      setMetadata({
        name,
        resultsPath,
        mode,
        trainingTime,
        X,
        y,
        algorithms,
        metric,
        trainEnsemble,
        stackModels,
        goldenFeatures,
        kMeansFeatures,
        featuresSelection,
        boostOnErrors,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    name,
    resultsPath,
    mode,
    trainingTime,
    X,
    y,
    algorithms,
    metric,
    trainEnsemble,
    stackModels,
    goldenFeatures,
    kMeansFeatures,
    featuresSelection,
    boostOnErrors,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"]) setName(metadata["name"]);
      if (metadata["resultsPath"]) setResultsPath(metadata["resultsPath"]);
      if (metadata["mode"]) setMode(metadata["mode"]);
      if (metadata["trainingTime"]) setTrainingTime(metadata["trainingTime"]);
      if (metadata["X"]) setX(metadata["X"]);
      if (metadata["y"]) setY(metadata["y"]);
      if (metadata["algorithms"]) setAlgorithms(metadata["algorithms"]);
      if (metadata["metric"]) setMetric(metadata["metric"]);
      if (metadata["trainEnsemble"])
        setTrainEnsemble(metadata["trainEnsemble"]);
      if (metadata["stackModels"]) setStackModels(metadata["stackModels"]);
      if (metadata["goldenFeatures"])
        setGoldenFeatures(metadata["goldenFeatures"]);
      if (metadata["featuresSelection"])
        setFeaturesSelection(metadata["featuresSelection"]);
      if (metadata["kMeansFeatures"])
        setKMeansFeatures(metadata["kMeansFeatures"]);
      if (metadata["boostOnErrors"])
        setBoostOnErrors(metadata["boostOnErrors"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={EngineIcon}
        label={"Train AutoML"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Variable
          label={"AutoML variable name"}
          name={name}
          setName={setName}
        />
        <SelectPath
          label={"Where to save results?"}
          setPath={setResultsPath}
          selectFolder={true}
          defaultPath={resultsPath === "" ? "auto" : resultsPath}
          tooltip={
            "The 'auto' means automatically create a new directory for results."
          }
        />
      </div>
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <div>
          <Select
            label={"X (input data)"}
            option={X}
            options={matrices.map((m) => [m, m])}
            setOption={setX}
          />
          <Select
            label={"y (target vector)"}
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
      {advanced && (
        <>
          <MultiSelect
            label={"Algorithms to be trained"}
            selection={algorithms}
            allOptions={allAlgorithms}
            setSelection={setAlgorithms}
          />
          <Select
            label={"Evaluation metric"}
            option={metric}
            options={metrics.map((m) => [m, m])}
            setOption={setMetric}
          />
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Train ensemble"}
              option={trainEnsemble}
              options={["yes", "no"].map((m) => [m, m])}
              setOption={setTrainEnsemble}
            />
            <Select
              label={"Stack models"}
              option={stackModels}
              options={["auto", "yes", "no"].map((m) => [m, m])}
              setOption={setStackModels}
            />
          </div>
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Features selection"}
              option={featuresSelection}
              options={["auto", "yes", "no"].map((m) => [m, m])}
              setOption={setFeaturesSelection}
              tooltip="Run feature selection for best models"
            />
            <Select
              label={"Golden features"}
              option={goldenFeatures}
              options={["auto", "yes", "no"].map((m) => [m, m])}
              setOption={setGoldenFeatures}
              tooltip="Combine features with mathematical operators to create golden features with great predictive power"
            />
            <Select
              label={"k-Means features"}
              option={kMeansFeatures}
              options={["auto", "yes", "no"].map((m) => [m, m])}
              setOption={setKMeansFeatures}
              tooltip="Create new features using k-Means"
            />

            <Select
              label={"Boost on errors"}
              option={boostOnErrors}
              options={["auto", "yes", "no"].map((m) => [m, m])}
              setOption={setBoostOnErrors}
              tooltip="Train models with sample weight increased when the model response is incorrect"
            />
          </div>
        </>
      )}
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
  shortDescription: "Train Machine Learning pipeline with AutoML in Python",
  codeExplanation: `
  
  1. Create AutoML object. AutoML configuration is setup in the constructor.
  2. Train AutoML object.`,
  ui: Train,
  Icon: EngineIcon,
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.7",
    },
  ],
  docsUrl: DOCS_URL,
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
      varName: "y",
      varType: "Series",
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
