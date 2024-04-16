import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";
import { JSONIcon } from "../../icons/JSON";
import { Select } from "../../components/Select";

export const ReadJSON: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [myFile, setMyFile] = useState("file_name");
  const [myDict, setMyDict] = useState("data_json");
  
  useEffect(() => {
    let src = `# open file and load as json\n`;
    src += `${myDict} = json.load(open(r"${myFile}"))\n`;
    src += "# display loaded JSON\n";
    src += `print(json.dumps(${myDict}, indent=4))`
    setCode(src);
    setPackages(["import json"]);
  }, [myFile, myDict]);

  return (
    <div>
      <Title Icon={JSONIcon} label={"Read JSON from file"} />
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
  shortDescription: "Read JSON file to dict in Python.",
  codeExplanation: `
1. Load JSON file to dict.
2. Print dict object with indentation.
  `,
  tags: ["json"],
  ui: ReadJSON,
  Icon: JSONIcon,
  requiredPackages: [],
  docsUrl: "python-read-json-from-file",
};

export default ReadJSONRecipe;
