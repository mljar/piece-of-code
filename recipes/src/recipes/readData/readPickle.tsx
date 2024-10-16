import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { XmlIcon } from "../../icons/Xml";
import { CucumberIcon } from "../../icons/Cucumber";

const DOCS_URL = "python-load-pickle";

export const ReadPickle: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [name, setName] = useState("my_obj");
  const [filePath, setFilePath] = useState("data.pickle");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# open pickle file and load\n`;
    src += `with open(r"${filePath}", "rb") as fin:\n`;
    src += `    ${name} = pickle.load(fin)\n`;
    src += `# display loaded object\n`;
    src += `print(${name})`;
    setCode(src);
    setPackages(["import pickle"]);
    if (setMetadata) {
      setMetadata({
        name,
        filePath,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, filePath]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"] !== undefined) setName(metadata["name"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CucumberIcon}
        label={"Load Pickle file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <Variable
        label={"Allocate Pickle to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath
        label={"Select Pickle (*.pickle) file"}
        defaultPath={filePath}
        setPath={setFilePath}
      />
    </div>
  );
};

export const ReadPickleRecipe: IRecipe = {
  name: "Load Pickle",
  longName: "Load Pickle file in Python",
  parentName: "Read data",
  description: `Load Pickle file in Python code. Pickle can be used to store any Python object. Loaded content will be assigned to Python variable.  
  `,
  shortDescription: `Load Pickle file in Python code`,
  tags: ["pickle"],
  codeExplanation: `
1. Read pickle file from provided path.
2. Print loaded object.  
  `,
  ui: ReadPickle,
  Icon: CucumberIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
