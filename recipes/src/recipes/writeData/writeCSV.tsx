import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";

export const WriteCSV: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [advanced, setAdvanced] = useState(false);
  const [name, setName] = useState("df");

  const delimiterOptions: [string, string][] = [
    ["Comma (,)", ","],
    ["Semicolon (;)", ";"],
    //["Tab (\\t)", "\\t"]
  ];
  const [delimiter, setDelimiter] = useState(delimiterOptions[0][1]);
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    if (name === "" || filePath === "") {
      //setCode("");
      //setPackages([""]);
      return;
    }
    let delimiterSrc = "";
    if (delimiter !== ",") {
      delimiterSrc = `, delimiter="${delimiter}"`;
    }
    let src = `${name} = pd.read_csv("path/to/your/file/${filePath}"${delimiterSrc})`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath, delimiter]);

  return (
    <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
      <Title
        Icon={FileCsvIcon}
        label={"Read CSV file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"CSV file"} setPath={setFilePath} />
      {advanced && (
        <>
          <Select
            label={"Delimiter"}
            option={delimiter}
            setOption={setDelimiter}
            options={delimiterOptions}
          />
        </>
      )}
    </div>
  );
};

// export default ReadCSV;

export const WriteCSVRecipe: IRecipe = {
  name: "Write CSV",
  longName: "Write Pandas DataFrame to CSV file",
  parentName: "Write data",
  description: "Write your Pandas DataFrame into CSV file.",
  shortDescription: "Write your Pandas DataFrame into CSV file.",
  codeExplanation: "",
  ui: WriteCSV,
  Icon: FileCsvIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: "python-write-dataframe-csv",
};

export default WriteCSVRecipe;
