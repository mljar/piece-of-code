import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { PythonIcon } from "../../icons/Python";

export const CheckPythonVersion: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  useEffect(() => {
    let src = `# check python version\n`;
    src += `print(sys.version)\n`;
    setCode(src);
    setPackages(["import sys"]);
  }, []);

  return (
    <div>
      <Title Icon={PythonIcon} label={"Check Python version"} />
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
  description:
    "Display Python version in the current notebook.",
  codeExplanation: "",
  ui: CheckPythonVersion,
  Icon: PythonIcon,
  requiredPackages: [],
  docsUrl: "python-check-version"
};

export default CheckPythonVersionRecipe;
