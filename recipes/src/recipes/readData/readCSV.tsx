// MyComponent.tsx
import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";

export const ReadCSV: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
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
  }, [name, filePath]);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
      <Title
        Icon={FileCsvIcon}
        title={"Read CSV file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      <Variable
        description={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <FileUpload title={"CSV file"} setFilePath={setFilePath} />
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

export const ReadCSVRecipe: IRecipe = {
  name: "Read CSV",
  description: "Read CSV file into Pandas DataFrame. Please provide the name of variable and file path. Please switch `Advanced` toggle for more options.",
  ui: ReadCSV,
  Icon: FileCsvIcon,
  requiredPackages: [['pandas', '>=1.0.0']],
  docsLink: "http://mljar.com"
};

export default ReadCSV;
