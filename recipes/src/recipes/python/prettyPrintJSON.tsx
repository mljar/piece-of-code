import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";
import { JSONIcon } from "../../icons/JSON";
import { Select } from "../../components/Select";

export const PrettyPrintJSON: React.FC<IRecipeProps> = ({
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

  const [myDict, setMyDict] = useState(myDicts[0]);

  useEffect(() => {
    let src = `# display json or dict\n`;
    src += `json.dumps(${myDict}, indent=4)`;
    setCode(src);
    setPackages(["import json"]);
  }, [myDict]);

  return (
    <div>
      <Title Icon={JSONIcon} label={"Pretty print JSON"} />
      <Select
        label={"Select JSON (dict) object"}
        option={myDict}
        options={myDicts.map((d) => [d, d])}
        setOption={setMyDict}
      />
    </div>
  );
};

export const PrettyPrintJSONRecipe: IRecipe = {
  name: "Pretty print JSON ",
  longName: "Pretty print JSON in Python",
  parentName: "Python",
  description: `Pretty print JSON or dict objects in Python. It is much easier to understand JSON objects that have nice indentation.`,
  shortDescription: "Pretty print JSON in Python",
  codeExplanation: `
The above code displays JSON with pretty indentation (4 spaces).
  `,
  tags: ["json"],
  ui: PrettyPrintJSON,
  Icon: JSONIcon,
  requiredPackages: [],
  docsUrl: "python-pretty-print-json",
  defaultVariables: [
    {
      varName: "my_dict",
      varType: "dict",
      varColumns: [],
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
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export default PrettyPrintJSONRecipe;
