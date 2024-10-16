import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";
import { JSONIcon } from "../../icons/JSON";
import { Select } from "../../components/Select";

const DOCS_URL = "python-read-json-from-file";

export const ReadJSON: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [myFile, setMyFile] = useState("file_name");
  const [myDict, setMyDict] = useState("data_json");

  useEffect(() => {
    let src = `# open file and load as json\n`;
    src += `${myDict} = json.load(open(r"${myFile}"))\n`;
    src += "# display loaded JSON\n";
    src += `print(json.dumps(${myDict}, indent=4))`;
    setCode(src);
    setPackages(["import json"]);
    if (setMetadata) {
      setMetadata({
        myFile,
        myDict,
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile, myDict]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"] !== undefined) setMyFile(metadata["myFile"]);
      if (metadata["myDict"] !== undefined) setMyDict(metadata["myDict"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={JSONIcon}
        label={"Read JSON from file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <SelectPath
        label="Select JSON file"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
      <Variable
        label="Assign JSON to dict variable"
        name={myDict}
        setName={setMyDict}
      />
    </div>
  );
};

export const ReadJSONRecipe: IRecipe = {
  name: "Read JSON from file",
  longName: "Read JSON file to dict in Python",
  parentName: "Python",
  description: `Read JSON file to dict in Python.`,
  shortDescription: "Read JSON file to dict in Python",
  codeExplanation: `
1. Load JSON file to dict.
2. Print dict object with indentation.

It is a good practice to check if file exists before reading it. There is **Check if file exists** recipe available.
  `,
  tags: ["json"],
  ui: ReadJSON,
  Icon: JSONIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default ReadJSONRecipe;
