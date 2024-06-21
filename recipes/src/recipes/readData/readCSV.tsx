import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { SelectPath } from "../../components/SelectPath";
import { Select } from "../../components/Select";

const DOCS_URL = "python-read-csv";

export const ReadCSV: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
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
    src += `# display data shape\n`;
    src += `print(${name}.shape())\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;

    setCode(src);
    setPackages(["import pandas as pd"]);

    if (setMetadata) {
      setMetadata({
        name,
        delimiter,
        filePath,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, filePath, delimiter]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"]) setName(metadata["name"]);
      if (metadata["delimiter"]) setDelimiter(metadata["delimiter"]);
      if (metadata["filePath"]) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FileCsvIcon}
        label={"Read CSV file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select CSV file"} setPath={setFilePath} />
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
  longName: "Read CSV file in Python",
  parentName: "Read data",
  description:
    "Read CSV file into Pandas DataFrame. Please provide the name of variable and file path. Please switch `Advanced` toggle for more options.",
  shortDescription: "Read CSV file in Python using Pandas package",
  codeExplanation: `
1. Read CSV file to Pandas DataFrame.
2. Display shape of DataFrame.
3. Display first rows of DataFrame.  
`,
  ui: ReadCSV,
  Icon: FileCsvIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["csv", "pandas"],
};

export default ReadCSV;
