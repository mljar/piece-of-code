import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";
import { JSONIcon } from "../../icons/JSON";
import { Select } from "../../components/Select";

export const WriteJSON: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
}) => {
  const myDicts = variables
    .filter((v) => v.varType === "dict")
    .map((v) => v.varName);

  if (variablesStatus === "loading") {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          Loading variables ...
        </p>
      </div>
    );
  }
  if (variablesStatus === "loaded" && !myDicts.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no JSON (dict) objects in your notebook.
        </p>
      </div>
    );
  }

  const [myFile, setMyFile] = useState("file_name");
  const [myDict, setMyDict] = useState("data_json");

  useEffect(() => {
    let src = `# write dict to json file\n`;
    src += `with open(r"${myFile}", "w", encoding="utf-8") as fout:\n`;
    src += `    json.dump(${myDict}, fout, ensure_ascii=False, indent=4)`;
    setCode(src);
    setPackages(["import json"]);
  }, [myDict]);

  return (
    <div>
      <Title Icon={JSONIcon} label={"Write JSON to file"} />
      <Select
        label={"Select JSON (dict) object"}
        option={myDict}
        options={myDicts.map((d) => [d, d])}
        setOption={setMyDict}
      />
      <SelectPath
        label="Write to file"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
    </div>
  );
};

export const WriteJSONRecipe: IRecipe = {
  name: "Write JSON to file",
  longName: "Write JSON to file in Python",
  parentName: "Python",
  description: `Save JSON object to file in Python.`,
  shortDescription: "Save JSON object to file in Python",
  codeExplanation: `
The above code saves dict object to file. The **utf-8** encoding is used.
  `,
  tags: ["json"],
  ui: WriteJSON,
  Icon: JSONIcon,
  requiredPackages: [],
  docsUrl: "python-write-json-to-file",
  defaultVariables: [
    {
      varName: "my_dict",
      varType: "dict",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "data_json",
      varType: "dict",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export default WriteJSONRecipe;
