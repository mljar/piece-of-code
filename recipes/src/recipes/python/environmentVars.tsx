import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { DesktopIcon } from "../../icons/Desktop";

const DOCS_URL = "python-access-environment-variables";

export const EnvironmentVars: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [myEnvVar, setMyEnvVar] = useState("MY_ENV_VARIABLE");
  const [myVar, setMyVar] = useState("my_var");

  useEffect(() => {
    let src = `# get environment variable\n`;
    src += `${myVar} = os.environ.get("${myEnvVar}")\n`;
    src += `# print environment variable\n`;
    src += `if ${myVar} is not None:\n`;
    src += `    print(f"My environment variable is {${myVar}}")\n`;
    src += `else:\n`;
    src += `    print("Sorry, environment variable not found")`;
    setCode(src);
    setPackages(["import os"]);
    if (setMetadata) {
      setMetadata({
        myEnvVar,
        myVar,
        docsUrl: DOCS_URL,
      });
    }
  }, [myEnvVar, myVar]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myEnvVar"] !== undefined) setMyEnvVar(metadata["myEnvVar"]);
      if (metadata["myVar"] !== undefined) setMyVar(metadata["myVar"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={DesktopIcon}
        label={"Get environment variable"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <Variable
        label={"Environment variable name"}
        name={myEnvVar}
        setName={setMyEnvVar}
        tooltip={"Usually environment variables are in all capital letters"}
      />
      <Variable
        label={"Assign environment variable to Python variable"}
        name={myVar}
        setName={setMyVar}
        tooltip={
          "Value of environment variable will be assigned to Python variable"
        }
      />
    </div>
  );
};

export const EnvironmentVarsRecipe: IRecipe = {
  name: "Get environment variable",
  longName: "Access environment variable in Python",
  parentName: "Python",
  description: "Access environment variable in Python",
  shortDescription: "Access environment variable in Python",
  codeExplanation: `
1. Get environment variable.
2. If variable is not empty it is displayed.

Additionally, you can set default value when get value from **environ** dictionary. For example:
\`\`\`
my_var = os.envrion.get("MY_ENV_VARIABLE", "some_default_value")
\`\`\`
To list all environment variables, please use:
\`\`\`
print(os.environ)
\`\`\`
`,
  ui: EnvironmentVars,
  Icon: DesktopIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
  tags: ["env", "environment"],
};

export default EnvironmentVarsRecipe;
