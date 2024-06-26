import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { DesktopIcon } from "../../icons/Desktop";

const DOCS_URL = "python-add-.env-variable";

export const AddDotEnvVar: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myEnvVar, setMyEnvVar] = useState("MY_ENV_VARIABLE");
  const [myVar, setMyVar] = useState("my_var");

  useEffect(() => {
    let src = `# add secret to .env file\n`;
    src += `mode = "a" if os.path.exists(".env") else "w"\n`;
    src += `# open file and write variable\n`;
    src += `with open(".env", mode) as fout:\n`;
    src += `    fout.write("${myEnvVar}=${myVar}\\n")\n`;
    src += `print("Secret saved in .env file")\n`;
    src += `print("Please remove this code cell and save notebook, be safe!")`;
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
        label={"Add .env variable"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Environment variable name"}
        name={myEnvVar}
        setName={setMyEnvVar}
        tooltip={"Usually environment variables are in all capital letters"}
      />
      <Variable
        label={"Secret value"}
        name={myVar}
        setName={setMyVar}
        tooltip={
          "Value of environment variable will be assigned to Python variable"
        }
      />
      <div
        className="poc-mt-2 poc-p-4 poc-mb-4 poc-text-base poc-text-red-800 poc-rounded-lg poc-bg-red-50 dark:poc-bg-gray-800 dark:poc-text-red-400"
        role="alert"
      >
        <span className="poc-font-semibold poc-text-xl">
          Please remove this code cell after execution!
        </span>
        <br />
        This cell runs code that saves variables in the <b>.env</b> file in your
        current directory. It is used to keep secrets. Secrets can't be stored
        in the code for security reasons. If the cell is executed successfully,
        please check that you have a <b>.env</b> file, and you can safely remove
        this cell and save the notebook.
      </div>
    </div>
  );
};

export const AddDotEnvVarRecipe: IRecipe = {
  name: "Add .env variable",
  longName: "Add .env variable in Python",
  parentName: "Python",
  description: "Add environment variable in Python",
  shortDescription: "Add environment variable in Python",
  codeExplanation: `
1. Check if **.env** file exists.
2. Open **.env** file, if file exists then open in append mode.
3. Write new secret to the file.
4. Please remember to remove this code cell after successful execution. Please save notebook.
`,
  ui: AddDotEnvVar,
  Icon: DesktopIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
  tags: ["env", "environment"],
};

export default AddDotEnvVarRecipe;
