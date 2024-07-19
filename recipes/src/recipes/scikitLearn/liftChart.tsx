import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select"; 
import { ElevatorIcon } from "../../icons/Elevator";

const DOCS_URL = "sklearn-lift-chart";

export const LiftChart: React.FC<IRecipeProps> = ({
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
    let src = `# plot lift chart\n`;
    src += `_ = skplt.metrics.plot_lift_curve(${target}, ${predictions})`;

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
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      if (metadata["predictions"] !== undefined) setPredictions(metadata["predictions"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ElevatorIcon}
        label={"Lift Chart"}
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

export const LiftChartRecipe: IRecipe = {
  name: "Lift Chart",
  longName: "Plot Lift Chart",
  parentName: "Scikit-learn",
  description: `A lift chart is a valuable tool for assessing the effectiveness of a classifier, particularly in terms of its ability to identify and prioritize positive instances. By comparing the performance of your model against random selection, a lift chart provides clear insights into how much better your model is at predicting positive outcomes.`,
  shortDescription: `Evaluate your classification model's performance with this Python code snippet that plots a lift chart. It helps assess the model's effectiveness in identifying positive instances, highlighting its predictive power over random selection.`,
  codeExplanation: `Plot lift chart`,
  ui: LiftChart,
  Icon: ElevatorIcon,
  requiredPackages: [
    {
      importName: "scikit-plot",
      installationName: "mljar-scikit-plot",
      version: ">=0.3.11",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["lift-chart", "classification"],
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

export default LiftChartRecipe;
