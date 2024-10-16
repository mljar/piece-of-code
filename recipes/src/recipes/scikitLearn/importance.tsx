import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { StarsIcon } from "../../icons/Stars";

const DOCS_URL = "scikit-learn-feature-importance";

export const Importance: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
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
    Accuracy: "accuracy",
    "ROC AUC": "roc_auc",
    F1: "f1",
    Precision: "average_precision",
    Recall: "recall",
    LogLoss: "log_loss",
  } as Record<string, string>;
  const regressorMetricsFuncs = {
    MSE: "neg_mean_squared_error",
    RMSE: "neg_root_mean_squared_error",
    MAE: "neg_mean_absolute_error",
    R2: "r2",
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
      setMetric(Object.keys(classifierMetricsFuncs)[0]);
    } else {
      setMetricsFuncs(regressorMetricsFuncs);
      setMetric(Object.keys(regressorMetricsFuncs)[0]);
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
    src += `# plot importance\n`;
    src += `sorted_idx = result.importances_mean.argsort()\n`;
    src += `_ = plt.barh(${model}.feature_names_in_[sorted_idx], result.importances_mean[sorted_idx])\n`;
    src += `_ = plt.xlabel("Feature importance")\n`;

    setCode(src);
    setPackages([
      "from matplotlib import pyplot as plt",
      "from sklearn.inspection import permutation_importance",
    ]);

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
      if (metadata["iterations"] !== undefined) setIterations(metadata["iterations"]);
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      if (metadata["sampleWeight"] !== undefined) setSampleWeight(metadata["sampleWeight"]);
      if (metadata["metric"] !== undefined) setMetric(metadata["metric"]);
      if (metadata["seed"] !== undefined) setSeed(metadata["seed"]);
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
        hideTitle={hideTitle}
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
  name: "Feature Importance",
  longName: "Feature Importance",
  parentName: "Scikit-learn",
  description: `Compute feature importance for any model (can be classifier or regressor). This approach compute score for original data. Then it shuffle each feature and compute the change in the score. The featuers that after shuffling change the score the most are the most important. This method can be used with any predictive model that implements Scikit-learn API.`,
  shortDescription: `Compute feature importance for any model (can be classifier or regressor) using permutation importance approach.`,
  codeExplanation: `
1. Compute permutation importance for features.
2. Display results in matplotlib horizontal bar.

This step can be time consuming in case of large data or complex algorithm that has large prediction time.`,
  ui: Importance,
  Icon: StarsIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
    {
      importName: "matplotlib",
      installationName: "matplotlib",
      version: ">=3.8.4",
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
