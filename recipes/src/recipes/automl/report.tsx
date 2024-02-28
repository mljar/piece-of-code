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
  const automls = variables
    .filter((v) => v.varType === "AutoML")
    .map((v) => v.varName);

  if (variablesStatus === "loaded" && !automls.length) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
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
      <Title Icon={ReportIcon} title="Display AutoML report" />
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
  description: "Display AutoML report from training",
  ui: AutoMLReport,
  Icon: ReportIcon,
};
