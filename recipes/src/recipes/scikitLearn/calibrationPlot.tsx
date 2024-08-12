import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { ElevatorIcon } from "../../icons/Elevator";
import { Focus2Icon } from "../../icons/Focus2";

const DOCS_URL = "sklearn-calibration-plot";

export const CalibrationPlot: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  console.log(variables);
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
    let src = `# calibration plot\n`;
    src += `_ = skplt.metrics.plot_calibration_curve(${target}, ${predictions})`;

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
      if (metadata["predictions"] !== undefined)
        setPredictions(metadata["predictions"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={Focus2Icon}
        label={"Calibration Plot"}
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

export const CalibrationPlotRecipe: IRecipe = {
  name: "Calibration PLot",
  longName: "Calibration Plot",
  parentName: "Scikit-learn",
  description: `Evaluate your classification model's performance with this Python code snippet that plots a calibration plot. It helps assess the agreement between predicted probabilities and actual outcomes across different deciles of predicted values.`,
  shortDescription: `Evaluate your classification model's performance with this Python code snippet that plots a calibration plot. It helps assess the agreement between predicted probabilities and actual outcomes across different deciles of predicted values.`,
  codeExplanation: `Create a calibration plot.`,
  ui: CalibrationPlot,
  Icon: Focus2Icon,
  requiredPackages: [
    {
      importName: "scikitplot",
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

export default CalibrationPlotRecipe;
