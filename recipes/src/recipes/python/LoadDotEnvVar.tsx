import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { DesktopIcon } from "../../icons/Desktop";

export const LoadDotEnvVar: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  useEffect(() => {
    let src = `# load .env to environment variables\n`;
    src += `_ = load_dotenv()`;
    setCode(src);
    setPackages(["from dotenv import load_dotenv"]);
  }, []);

  return (
    <div>
      <Title Icon={DesktopIcon} label={"Load .env file"} />
    </div>
  );
};

export const LoadDotEnvVarRecipe: IRecipe = {
  name: "Load secrets from .env",
  longName: "Load secrets from .env file",
  parentName: "Python",
  description: "Load secrets from .env file to environment variables in Python",
  shortDescription:
    "Load secrets from .env file to environment variable",
  codeExplanation: `
1. Call **load_dotenv()** function from **dotenv** package.
2. You can access your variables with code: 

    os.environ.get("VARIABLE")


`,
  ui: LoadDotEnvVar,
  Icon: DesktopIcon,
  requiredPackages: [
    {
      importName: "dotenv",
      installationName: "python-dotenv",
      version: ">=1.0.1",
    },
  ],
  docsUrl: "python-load-.env",
  tags: [".env", "environment"],
};

export default LoadDotEnvVarRecipe;
