// MyComponent.tsx
import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconFileTypeCsv, IconInfoCircle } from "@tabler/icons-react";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";

export const ReadCSV: React.FC<IRecipeProps> = ({}) => {
  const [advanced, setAdvanced] = useState(false);
  const [name, setName] = useState("df");

  const delimiterOptions: [string, string][] = [
    ["Comma (,)", ","],
    ["Semicolon (;)", ";"],
    //["Tab (\\t)", "\\t"]
  ];
  const [delimiter, setDelimiter] = useState(delimiterOptions[0][1]);
  const [filePath, setFilePath] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    setCode(name);
    console.log(name);
  }, [name]);

  return (
    <div className="bg-gray-50 dark:bg-slate-700 p-2">
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
      <FileUpload title={"Upload CSV file"} />
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
      <code>
        import pandas as pd
        <br />
        {name} = pd.read_csv("filename")
      </code>
    </div>
  );
};

// export default ReadCSV;

export const ReadCSVRecipe: IRecipe = {
  name: "Read CSV",
  description: "Load CSV file into dataframe.",
  ui: ReadCSV,
  Icon: FileCsvIcon,
};

export default ReadCSV;
