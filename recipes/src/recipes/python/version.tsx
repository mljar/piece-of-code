import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { PythonIcon } from "../../icons/Python";

const DOCS_URL = "python-check-version";

export const CheckPythonVersion: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  useEffect(() => {
    let src = `# check python version\n`;
    src += `print(sys.version)`;
    setCode(src);
    setPackages(["import sys"]);
    if (setMetadata) {
      setMetadata({
        docsUrl: DOCS_URL,
      });
    }
  }, []);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={PythonIcon}
        label={"Check Python version"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <p className="text-base text-gray-800 dark:text-white">
        Please run the cell to print Python version.
      </p>
    </div>
  );
};

export const CheckPythonVersionRecipe: IRecipe = {
  name: "Display Python version",
  longName: "Display Python version",
  parentName: "Python",
  description: "Display Python version in the current notebook.",
  shortDescription: "Display Python version in the current notebook.",
  codeExplanation: "",
  ui: CheckPythonVersion,
  Icon: PythonIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default CheckPythonVersionRecipe;
