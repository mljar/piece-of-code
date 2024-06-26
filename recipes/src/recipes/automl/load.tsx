import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { FolderOpenIcon } from "../../icons/FolderOpen";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";

const DOCS_URL = "python-load-automl";

export const LoadAutoML: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [automl, setAutoml] = useState("automl");
  const [folder, setFolder] = useState("");

  useEffect(() => {
    let src = `# create AutoML object with result_path pointing to directory with models\n`;
    src += `${automl} = AutoML(results_path=r"${folder}")\n`;
    src += `print("AutoML object ${automl} created")`;
    setCode(src);
    setPackages(["from supervised import AutoML"]);
    if (setMetadata) {
      setMetadata({
        automl,
        folder,
        docsUrl: DOCS_URL,
      });
    }
  }, [automl, folder]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["automl"] !== undefined) setAutoml(metadata["automl"]);
      if (metadata["folder"] !== undefined) setFolder(metadata["folder"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FolderOpenIcon}
        label={"Load AutoML from disk"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />

      <Variable
        label={"AutoML object name"}
        name={automl}
        setName={setAutoml}
      />
      <SelectPath
        label="Directory with AutoML models"
        setPath={setFolder}
        defaultPath={folder}
        selectFolder={true}
      />
    </div>
  );
};

export const LoadAutoMLRecipe: IRecipe = {
  name: "Load AutoML",
  longName: "Load AutoML models from disk",
  parentName: "MLJAR AutoML",
  description:
    "You can load AutoML models from disk and use them to compute predictions on new data.",
  shortDescription:
    "Load AutoML models from disk and use them to compute predictions on new data",
  codeExplanation: "",
  ui: LoadAutoML,
  Icon: FolderOpenIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">=1.1.7",
    },
  ],
};
