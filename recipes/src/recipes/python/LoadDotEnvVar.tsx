import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { DesktopIcon } from "../../icons/Desktop";

const DOCS_URL = "python-load-.env";

export const LoadDotEnvVar: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  useEffect(() => {
    let src = `# load .env to environment variables\n`;
    src += `_ = load_dotenv()`;
    setCode(src);
    setPackages(["from dotenv import load_dotenv"]);

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
        Icon={DesktopIcon}
        label={"Load .env file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
    </div>
  );
};

export const LoadDotEnvVarRecipe: IRecipe = {
  name: "Load secrets from .env",
  longName: "Load secrets from .env file",
  parentName: "Python",
  description: "Load secrets from .env file to environment variables in Python",
  shortDescription: "Load secrets from .env file to environment variable",
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
  docsUrl: DOCS_URL,
  tags: [".env", "environment"],
};

export default LoadDotEnvVarRecipe;
