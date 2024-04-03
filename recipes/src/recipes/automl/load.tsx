import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { FolderOpenIcon } from "../../icons/FolderOpen";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";

export const LoadAutoML: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  const [automl, setAutoml] = useState("automl");
  const [folder, setFolder] = useState("");

  useEffect(() => {
    let src = `# create AutoML object with result_path pointing to directory with models\n`;
    src += `${automl} = AutoML(results_path=r"${folder}")\n`;
    src += `print("AutoML object ${automl} created")`;
    setCode(src);
    setPackages(["from supervised import AutoML"]);
  }, [automl, folder]);

  return (
    <div>
      <Title Icon={FolderOpenIcon} label={"Load AutoML from disk"} />

      <Variable
        label={"AutoML object name"}
        name={automl}
        setName={setAutoml}
      />
      <SelectPath
        label="Directory with AutoML models"
        setPath={setFolder}
        selectFolder={true}
      />
    </div>
  );
};

export const LoadAutoMLRecipe: IRecipe = {
  name: "Load AutoML",
  longName: "Load AutoML models from disk",
  parentName: "MLJAR AutoML",
  description: "You can load AutoML models from disk and use the to compute predictions on new data.",
  codeExplanation: "",
  ui: LoadAutoML,
  Icon: FolderOpenIcon,
  docsUrl: "python-load-automl",
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.5",
    },
  ],
};
