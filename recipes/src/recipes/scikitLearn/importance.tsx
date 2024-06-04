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
import { RulerMeasureIcon } from "../../icons/RulerMeasure";
import { AdjustmentsIcon } from "../../icons/Adjustments";
import { StarsIcon } from "../../icons/Stars";

const DOCS_URL = "scikit-learn-feature-importance";

export const Importance: React.FC<IRecipeProps> = ({
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

  const classifierMetricsFuncs = {
    Accuracy: "accuracy_score",
    "ROC AUC": "roc_auc_score",
    F1: "f1_score",
    Precision: "average_precision_score",
    Recall: "recall_score",
    LogLoss: "log_loss",
    MCC: "matthews_corrcoef",
  } as Record<string, string>;
  const regressorMetricsFuncs = {
    MSE: "mean_squared_error",
    RMSE: "root_mean_squared_error",
    MAE: "mean_absolute_error",
    R2: "r2_score",
  } as Record<string, string>;

  const [metricsFuncs, setMetricsFuncs] = useState(classifierMetricsFuncs);

  const [advanced, setAdvanced] = useState(false);
  const [metric, setMetric] = useState(Object.keys(metricsFuncs)[0]);
  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const models = variables
    .filter(
      (v) => v.varType.includes("Classifier") || v.varType.includes("Regressor")
    )
    .map((v) => v.varName);
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataObjects.length ? dataObjects[0] : "");
  const [target, setTarget] = useState(
    dataObjects.length ? dataObjects[dataObjects.length - 1] : ""
  );
  const [sampleWeight, setSampleWeight] = useState("None");
  const [iterations, setIterations] = useState(10);
  const [seed, setSeed] = useState(42);

  const isClassifier = () => {
    const selectedModel = variables.filter((v) => v.varName === model)[0];
    return selectedModel.varType.includes("Classifier");
  };

  const selectedModelType = () => {
    const selectedModel = variables.filter((v) => v.varName === model)[0];
    return selectedModel.varType;
  };

  useEffect(() => {
    if (isClassifier()) {
      setMetricsFuncs(classifierMetricsFuncs);
      setMetric(classifierMetricsFuncs[0]);
    } else {
      setMetricsFuncs(regressorMetricsFuncs);
      setMetric(regressorMetricsFuncs[0]);
    }
  }, [model]);

  useEffect(() => {
    if (model === "" || df === "" || target === "") {
      return;
    }
    let metricName = { ...classifierMetricsFuncs, ...regressorMetricsFuncs }[
      metric
    ] as string;
    let src = `# compute permutation importance\n`;
    src += `result = permutation_importance(${model}, ${df}, ${target},\n    scoring="${metricName}", n_repeats=${iterations}, random_state=${seed}`;
    if (sampleWeight !== "None") {
      src += `, sample_weight=${sampleWeight}`;
    }
    src += `)\n`;
    src += `result\n`;

    setCode(src);
    setPackages(["from sklearn.inspection import permutation_importance"]);

    if (setMetadata) {
      setMetadata({
        iterations,
        model,
        df,
        target,
        sampleWeight,
        metric,
        seed,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [iterations, model, df, target, sampleWeight, metric, seed, metricsFuncs]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["iterations"]) setIterations(metadata["iterations"]);
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["target"]) setTarget(metadata["target"]);
      if (metadata["sampleWeight"]) setSampleWeight(metadata["sampleWeight"]);
      if (metadata["metric"]) setMetric(metadata["metric"]);
      if (metadata["seed"]) setSeed(metadata["seed"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={StarsIcon}
        label={"Feature Importance"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {(df === "" || target === "") && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create data by
          reading data from file, url or database.
        </p>
      )}
      {models.length === 0 && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no models objects in your notebook. Please create ML model.
        </p>
      )}

      {!(df === "" || target === "" || models.length === 0) && (
        <>
          <Select
            label={"Select model object "}
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
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Numeric
              label="Number of repeats"
              setName={setIterations}
              name={iterations}
              minValue={2}
            />
            <Select
              label={"Select metric"}
              option={metric}
              options={Object.keys(metricsFuncs).map((d) => [d, d])}
              setOption={setMetric}
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

              <Numeric
                label={"Random number generator seed"}
                name={seed}
                setName={setSeed}
                minValue={42}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export const ImportanceRecipe: IRecipe = {
  name: "Hyper Parameters Search",
  longName: "Hyper Parameters Search",
  parentName: "Scikit-learn",
  description: ``,
  shortDescription: ``,
  codeExplanation: ``,
  ui: Importance,
  Icon: AdjustmentsIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["metric", "accuracy"],
  defaultVariables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1"],
      varColumnTypes: ["int"],
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
  ],
};

export default ImportanceRecipe;
