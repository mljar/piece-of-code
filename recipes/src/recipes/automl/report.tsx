import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { ReportIcon } from "../../icons/Report";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";

export const AutoMLReport: React.FC<IRecipeProps> = ({
  setCode,
  variablesStatus,
  variables,
}) => {

  if (variablesStatus === "loading") {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
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
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
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
  }, [automl]);


  return (
    <div>
      <Title Icon={ReportIcon} label="Display AutoML report" />
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
  description: "Display AutoML report from training. You can click on the model name in the leaderboard to check each model details.",
  codeExplanation: "",
  ui: AutoMLReport,
  Icon: ReportIcon,
  docsUrl: "python-display-automl-report",
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.5",
    },
  ],
  defaultVariables: [
    {
      varName: "automl",
      varType: "AutoML",
      varColumns: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};
