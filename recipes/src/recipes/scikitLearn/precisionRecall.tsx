import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { ChartPpfIcon } from "../../icons/ChartPpf";

const DOCS_URL = "plot-precision-recall";

export const PrecisionRecall: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  console.log(variables)
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

  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);

  const [target, setTarget] = useState(
    dataObjects.length ? dataObjects[0] : ""
  );
  const [predictions, setPredictions] = useState(
    dataObjects.length ? dataObjects[dataObjects.length - 1] : ""
  );
  
  useEffect(() => {
    if (target === "" || predictions === "") {
      return;
    }
    let src = `# plot precision recall plot\n`;
    src += `_ = skplt.metrics.plot_precision_recall_curve(${target}, ${predictions})`;

    setCode(src);
    setPackages(["import scikitplot as skplt"]);
    if (setMetadata) {
      setMetadata({
        target,
        predictions,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [target, predictions]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["target"]) setTarget(metadata["target"]);
      if (metadata["predictions"]) setPredictions(metadata["predictions"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ChartPpfIcon}
        label={"Precision Recall"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {(target === "" || predictions === "") && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data object in your notebook. Do something :)
        </p>
      )}

      {!(target === "" || predictions === "") && (
        <>
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"True values"}
              option={target}
              options={dataObjects.map((c) => [c, c])}
              setOption={setTarget}
            />
            <Select
              label={"Predicted probabilites"}
              option={predictions}
              options={dataObjects.map((c) => [c, c])}
              setOption={setPredictions}
            />
          </div> 
        </>
      )}
    </div>
  );
};

export const PrecisionRecallRecipe: IRecipe = {
  name: "Precision-Recall",
  longName: "Precision-Recall Curve",
  parentName: "Scikit-learn",
  description: `Plot Precision-Recall curve.

**Precision** measures the proportion of true positives out of all positive predictions made by the model. 
  
    Precision = TP / (TP + FP)
  
**Recall**, also known as **Sensitivity**, measures the proportion of true positives out  of all actual positive instances. 

    Recall = TP / (TP + FN)
  
  `,
  shortDescription: `Plot Precision-Recall curve.`,
  codeExplanation: `Plot Precision-Recall curve.`,
  ui: PrecisionRecall,
  Icon: ChartPpfIcon,
  requiredPackages: [
    {
      importName: "scikit-plot",
      installationName: "mljar-scikit-plot",
      version: ">=0.3.11",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["precision-recall", "classification"],
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
      varType: "Series",
      varColumns: ["prediction"],
      varColumnTypes: ["float"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default PrecisionRecallRecipe;
