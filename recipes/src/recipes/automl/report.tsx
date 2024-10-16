import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { ReportIcon } from "../../icons/Report";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";

const DOCS_URL = "python-display-automl-report";

export const AutoMLReport: React.FC<IRecipeProps> = ({
  setCode,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  if (variablesStatus === "loading") {
    return (
      <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-4 poc-rounded-md">
        <p className="poc-text-base poc-text-gray-800 dark:poc-text-white">
          Loading variables ...
        </p>
      </div>
    );
  }

  const automls = variables
    .filter((v) => v.varType === "AutoML")
    .map((v) => v.varName);

  if (automls.length == 0) {
    return (
      <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-4 poc-rounded-md">
        <p className="poc-text-base poc-text-gray-800 dark:poc-text-white">
          There are no AutoML objects in your notebook. Please train AutoML or
          load AutoML from folder.
        </p>
      </div>
    );
  }
  const [automl, setAutoml] = useState(automls[0]);

  useEffect(() => {
    let src = `# display AutoML report\n`;
    src += `${automl}.report()`;
    setCode(src);

    if (setMetadata) {
      setMetadata({
        automl,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [automl]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["automl"] !== undefined) setAutoml(metadata["automl"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ReportIcon}
        label="Display AutoML report"
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <Select
        label={"Display report for AutoML object"}
        option={automl}
        options={automls.map((a) => [a, a])}
        setOption={setAutoml}
      />
    </div>
  );
};

export const AutoMLReportRecipe: IRecipe = {
  name: "AutoML report",
  longName: "Display AutoML report",
  parentName: "MLJAR AutoML",
  description:
    "Display AutoML report from training. You can click on the model name in the leaderboard to check each model details.",
  shortDescription:
    "Display AutoML report from training with details about each model",
  codeExplanation: "",
  ui: AutoMLReport,
  Icon: ReportIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.7",
    },
  ],
  defaultVariables: [
    {
      varName: "automl",
      varType: "AutoML",
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
