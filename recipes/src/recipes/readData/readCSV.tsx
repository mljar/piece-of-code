// MyComponent.tsx
import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { SelectPath } from "../../components/SelectPath";
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
  const [filePath, setFilePath] = useState("data.csv");

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
    let src = `# read data from csv file\n`;
    src += `${name} = pd.read_csv(r"${filePath}"${delimiterSrc})\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;

    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath, delimiter]);

  return (
    <div>
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
      <SelectPath
        label={"Select CSV file"}
        setPath={setFilePath}
      />
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
  description:
    "Read CSV file into Pandas DataFrame. Please provide the name of variable and file path. Please switch `Advanced` toggle for more options.",
  ui: ReadCSV,
  Icon: FileCsvIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsLink: "http://mljar.com",
};

export default ReadCSV;
