import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";

const DOCS_URL = "pandas-write-csv";

export const WriteCSV: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  if (variablesStatus === "loaded" && !variables.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [index, setIndex] = useState(true);
  // const [advanced, setAdvanced] = useState(false);

  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("my_file.csv");

  useEffect(() => {
    if(df === "") {
      return;
    }
    let src = `# construct file path\n`;
    src += `fname = os.path.join(r"${filePath}", "${fileName}")\n`;
    src += `# write DataFrame to CSV\n`;
    src += `${df}.to_csv(fname`;
    if (!index) {
      src += `, index=False`;
    }
    src += `)\n`;
    src += `print(f"DataFrame ${df} saved at {fname}")`;
    setCode(src);
    setPackages(["import os", "import pandas as pd"]);

    if (setMetadata) {
      setMetadata({
        df,
        filePath,
        fileName,
        index,
        variables: variables.filter((v) => v.varType === "DataFrame"),
        docsUrl: DOCS_URL,
      });
    }
  }, [df, filePath, fileName, index]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["filePath"]) setFilePath(metadata["filePath"]);
      if (metadata["fileName"]) setFileName(metadata["fileName"]);
      if (metadata["index"]) setIndex(metadata["index"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FileCsvIcon}
        label={"Write CSV"}
        //advanced={advanced}
        //setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"DataFrame to save"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          
          <SelectPath
            label={"Select directory, leave empty to save in the current directory"}
            setPath={setFilePath}
            selectFolder={true}
          />
          <Variable
            label={"File name, remember to set .csv extension"}
            name={fileName}
            setName={setFileName}
          />

          <Toggle
            label={"Include index column in CSV file"}
            value={index}
            setValue={setIndex}
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
  description:
    "Write your Pandas DataFrame into CSV file. If CSV file path doesn't exist please select similar path and modify in the code the path that you want.",
  shortDescription: "Write your Pandas DataFrame into CSV file",
  codeExplanation: ``,
  ui: WriteCSV,
  Icon: FileCsvIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["pandas", "csv"],
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "df_2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2", "feature3", "feature4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default WriteCSVRecipe;
