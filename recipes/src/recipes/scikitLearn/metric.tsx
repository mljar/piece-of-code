import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { RulerMeasureIcon } from "../../icons/RulerMeasure";

const DOCS_URL = "scikit-learn-compute-metric";

export const Metric: React.FC<IRecipeProps> = ({
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

  const metricsFuncs = {
    Accuracy: "accuracy_score",
    "ROC AUC": "roc_auc_score",
    // F1: "f1_score",
    Precision: "average_precision_score",
    Recall: "recall_score",
    LogLoss: "log_loss",
    "Matthews correlation coefficient": "matthews_corrcoef",
    MSE: "mean_squared_error",
    RMSE: "root_mean_squared_error",
    MAE: "mean_absolute_error",
    R2: "r2_score",
  } as Record<string, string>;

  const [advanced, setAdvanced] = useState(false);
  const [metric, setMetric] = useState(Object.keys(metricsFuncs)[0]);
  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const [yTrue, setYTrue] = useState(dataObjects.length ? dataObjects[0] : "");
  const [yPred, setYPred] = useState(
    dataObjects.length > 1 ? dataObjects[1] : ""
  );
  const [sampleWeight, setSampleWeight] = useState("None");

  const [predVarType, setPredVarType] = useState("");
  const [multiClassStrategy, setMultiClassStrategy] = useState("ovr");
  const [averageStrategy, setAverageStrategy] = useState("micro");
  const [metricTitle, setMetricTitle] = useState("Predicted values");

  useEffect(() => {
    if (
      metric === "Accuracy" ||
      metric === "F1" ||
      metric === "Matthews correlation coefficient"
    ) {
      setMetricTitle("Predicted labels");
    } else if (
      metric === "ROC AUC" ||
      metric === "Precision" ||
      metric === "Recall" ||
      metric === "LogLoss"
    ) {
      setMetricTitle("Predicted probabilities");
    }
  }, [metric]);

  useEffect(() => {
    const predShape = variables.filter((v) => v.varName === yPred)[0].varShape;
    if (predShape.includes("x 2 cols")) {
      setPredVarType("binary");
    } else if (predShape.includes("x")) {
      setPredVarType("multiclass");
    } else {
      setPredVarType("vector");
    }
  }, [yPred, metric]);

  useEffect(() => {
    let packages = [] as string[];
    if (yTrue === "" || yPred === "") {
      return;
    }
    let src = `# compute ${metric}\n`;
    let m = metricsFuncs[metric] as string;
    let varName = `metric_${metric.toLowerCase().replace(" ", "_")}`;
    let pred = yPred;

    if (metric === "ROC AUC") {
      if (predVarType === "binary") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}[:,1]`;
      } else if (predVarType === "multiclass") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}, multi_class="${multiClassStrategy}"`;
      } else {
        src += `${varName} = ${m}(${yTrue}, ${yPred}`;
      }
    } else if (metric === "Precision") {
      if (predVarType === "binary") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}[:,1], pos_label=np.unique(${yTrue})[1]`;
        packages.push("import numpy as np");
      } else if (predVarType === "multiclass") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}, average="${averageStrategy}"`;
      } else {
        src += `${varName} = ${m}(${yTrue}, ${yPred}`;
      }
    } else if (metric === "Recall") {
      if (predVarType === "binary") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}[:,1], pos_label=np.unique(${yTrue})[1]`;
        packages.push("import numpy as np");
      } else if (predVarType === "multiclass") {
        src += `${varName} = ${m}(${yTrue}, ${yPred}, average="${averageStrategy}"`;
      } else {
        src += `${varName} = ${m}(${yTrue}, ${yPred}`;
      }
    } else {
      src += `${varName} = ${m}(${yTrue}, ${yPred}`;
    }

    if (sampleWeight !== "None") {
      src += `, sample_weight=${sampleWeight}`;
    }
    src += ")\n";
    src += `print(f"${metric}: {${varName}}")`;
    setCode(src);
    packages.push(`from sklearn.metrics import ${m}`);
    setPackages(packages);
    if (setMetadata) {
      setMetadata({
        metric,
        yTrue,
        yPred,
        sampleWeight,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    metric,
    yTrue,
    yPred,
    sampleWeight,
    predVarType,
    multiClassStrategy,
    averageStrategy,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["metric"] !== undefined) setMetric(metadata["metric"]);
      if (metadata["yTrue"] !== undefined) setYTrue(metadata["yTrue"]);
      if (metadata["yPred"] !== undefined) setYPred(metadata["yPred"]);
      if (metadata["sampleWeight"] !== undefined)
        setSampleWeight(metadata["sampleWeight"]);
    }
  }, [metadata]);

  console.log({ metric, predVarType });

  return (
    <div>
      <Title
        Icon={RulerMeasureIcon}
        label={"Compute Metric"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {(yTrue === "" || yPred === "") && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}

      {!(yTrue === "" || yPred === "") && (
        <>
          <Select
            label={"Select metric"}
            option={metric}
            options={Object.keys(metricsFuncs).map((d) => [d, d])}
            setOption={setMetric}
          />
          {metric === "ROC AUC" && predVarType === "multiclass" && (
            <Select
              label={"Multi class strategy"}
              option={multiClassStrategy}
              options={[
                ["One-vs-rest", "ovr"],
                ["One-vs-one", "ovo"],
              ]}
              setOption={setMultiClassStrategy}
            />
          )}

          {(metric === "Precision" || metric === "Recall") &&
            predVarType === "multiclass" && (
              <Select
                label={"Average strategy"}
                option={averageStrategy}
                options={[
                  ["micro", "micro"],
                  ["macro", "macro"],
                  ["weighted", "weighted"],
                  ["samples", "samples"],
                ]}
                setOption={setAverageStrategy}
              />
            )}

          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Ground truth values"}
              option={yTrue}
              options={dataObjects.map((d) => [d, d])}
              setOption={setYTrue}
            />
            <Select
              label={metricTitle}
              option={yPred}
              options={dataObjects.map((c) => [c, c])}
              setOption={setYPred}
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

export const MetricRecipe: IRecipe = {
  name: "Compute Metric",
  longName: "Compute Metric",
  parentName: "Scikit-learn",
  description: `Compute metrics for predictions. This recipe supports following metrics: Accuracy, ROC AUC, Precision, Recall, LogLoss, MCC, MSE, RMSE, MAE, R2. Please use advanced settings to provide sample weights for metric function.`,
  shortDescription: `Compute metrics for predictions. This recipe supports following metrics: Accuracy, ROC AUC, Precision, Recall, LogLoss, MCC, MSE, RMSE, MAE, R2.`,
  codeExplanation: `
1. Compute metric to assess performance between true and predicted values.
2. Print computed score.  
  `,
  ui: Metric,
  Icon: RulerMeasureIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["metric", "accuracy"],
  defaultVariables: [
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
      varName: "predicted",
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
      varName: "predicted_binary",
      varType: "DataFrame",
      varColumns: ["col1"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "10 rows x 2 cols",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "predicted_multi",
      varType: "DataFrame",
      varColumns: ["col1"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "10 rows x 3 cols",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default MetricRecipe;
