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
    "Accuracy": "accuracy_score",
    "ROC AUC": "roc_auc_score",
    "F1": "f1_score",
    "Precision": "average_precision_score",
    "Recall": "recall_score", 
    "LogLoss": "log_loss",
    "MCC": "matthews_corrcoef",
    "MSE": "mean_squared_error",
    "RMSE": "root_mean_squared_error",
    "MAE": "mean_absolute_error",
    "R2": "r2_score",
  } as Record<string, string>;

  const [advanced, setAdvanced] = useState(false);
  const [metric, setMetric] = useState(Object.keys(metricsFuncs)[0]);
  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const [yTrue, setYTrue] = useState(dataObjects.length ? dataObjects[0] : "");
  const [yPred, setYPred] = useState(
    dataObjects.length > 1 ? dataObjects[1] : ""
  );
  const [sampleWeight, setSampleWeight] = useState("None");

  useEffect(() => {
    if (yTrue === "" || yPred === "") {
      return;
    }
    let src = `# compute metric\n`;
    let m = metricsFuncs[metric] as string;
    let varName = `metric_${metric.toLowerCase()}`;
    src += `${varName} = ${m}(${yTrue}, ${yPred}`
    if (sampleWeight !== "None") {
      src += `, sample_weight=${sampleWeight}`;
    }
    src += ")\n";
    src += `print(f"${metric}: {${varName}})`;
    setCode(src);
    setPackages([`from sklearn.metrics import ${m}`]);
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
  }, [metric, yTrue, yPred, sampleWeight]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["metric"]) setMetric(metadata["metric"]);
      if (metadata["yTrue"]) setYTrue(metadata["yTrue"]);
      if (metadata["yPred"]) setYPred(metadata["yPred"]);
      if (metadata["sampleWeight"]) setSampleWeight(metadata["sampleWeight"]);
    }
  }, [metadata]);

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

          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Ground truth values"}
              option={yTrue}
              options={dataObjects.map((d) => [d, d])}
              setOption={setYTrue}
            />
            <Select
              label={"Predicted values"}
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
  description: `Compute metrics for predictions. This recipe supports following metrics: Accuracy, ROC AUC, F1, Precision, Recall, LogLoss, MCC, MSE, RMSE, MAE, R2. Please use advanced settings to provide sample weights for metric function.`,
  shortDescription: `Compute metrics for predictions. This recipe supports following metrics: Accuracy, ROC AUC, F1, Precision, Recall, LogLoss, MCC, MSE, RMSE, MAE, R2.`,
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
      version: ">=1.0.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["metric", "accuracy"],
  defaultVariables: [
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

export default MetricRecipe;
