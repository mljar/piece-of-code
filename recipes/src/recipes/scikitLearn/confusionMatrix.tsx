import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { BorderAllIcon } from "../../icons/BorderAll";

const DOCS_URL = "plot-confusion-matrix";

export const ConfusionMatrix: React.FC<IRecipeProps> = ({
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
  const [normalize, setNormalize] = useState(false);

  useEffect(() => {
    if (target === "" || predictions === "") {
      return;
    }
    let src = `# plot confusion matrix\n`;
    src += `_ = skplt.metrics.plot_confusion_matrix(${target}, ${predictions}, normalize=${normalize ? "True" : "False"})`;

    setCode(src);
    setPackages(["import scikitplot as skplt"]);
    if (setMetadata) {
      setMetadata({
        target,
        predictions,
        normalize,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [target, predictions, normalize]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      if (metadata["predictions"] !== undefined) setPredictions(metadata["predictions"]);
      if (metadata["normalize"] !== undefined) setNormalize(metadata["normalize"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={BorderAllIcon}
        label={"Confusion Matrix"}
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
              label={"Predicted labels"}
              option={predictions}
              options={dataObjects.map((c) => [c, c])}
              setOption={setPredictions}
            />
          </div>
          <Toggle
            label="Normalize values in the matrix"
            setValue={setNormalize}
            value={normalize}
          />
        </>
      )}
    </div>
  );
};

export const ConfusionMatrixRecipe: IRecipe = {
  name: "Confusion Matrix",
  longName: "Plot Confusion Matrix",
  parentName: "Scikit-learn",
  description: `Visualize the performance of your Machine Learning model with a confusion matrix. It is a fundamental tool in evaluating 
  classification models, providing insights into model predictions. You can display total count of responses in the matrix, or if you toggle **Normalize** then it will be showing the ratio.
  `,
  shortDescription: `Visualize the performance of your Machine Learning model with a confusion matrix.`,
  codeExplanation: `Produce a plot of confusion matrix. This code can be used with binary and multi-class classification tasks.`,
  ui: ConfusionMatrix,
  Icon: BorderAllIcon,
  requiredPackages: [
    {
      importName: "scikit-plot",
      installationName: "mljar-scikit-plot",
      version: ">=0.3.11",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["confusion-matrix", "classification"],
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

export default ConfusionMatrixRecipe;
