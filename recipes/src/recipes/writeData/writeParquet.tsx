import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { DashboardIcon } from "../../icons/Dashboard";
import { Variable } from "../../components/Variable";

const DOCS_URL = "pandas-write-parquet";

export const WriteParquet: React.FC<IRecipeProps> = ({
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
          There are no data objects in your notebook. Please create DataFrame by
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

  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("my_data.parquet");

  useEffect(() => {
    if (df === "") {
      return;
    }
    let src = `# construct file path\n`;
    src += `fname = os.path.join(r"${filePath}", "${fileName}")\n`;
    src += `# write DataFrame to parquet file\n`;
    src += `${df}.to_parquet(fname`;
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
  }, [df, filePath, index]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
      if (metadata["index"] !== undefined) setIndex(metadata["index"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={DashboardIcon}
        label={"Write Parquet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create DataFrame by
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
            label={
              "Select directory, leave empty to save in the current directory"
            }
            setPath={setFilePath}
            selectFolder={true}
            defaultPath={filePath}
          />
          <Variable
            label={"File name, remember to set .parquet extension"}
            name={fileName}
            setName={setFileName}
          />

          <Toggle
            label={"Include index column in parquet file"}
            value={index}
            setValue={setIndex}
          />
        </>
      )}
    </div>
  );
};

export const WriteParquetRecipe: IRecipe = {
  name: "Write Parquet",
  longName: "Write Pandas DataFrame to Parquet file",
  parentName: "Write data",
  description: `Write your Pandas DataFrame into Parquet file. Parquet is columnar storage format well suited for large volumes of data. We are using pyarrow engine to handle parquet binary format.`,
  shortDescription: `Write your Pandas DataFrame into Parquet file. Parquet is columnar storage format well suited for large volumes of data. We are using pyarrow engine to handle parquet binary format.`,
  codeExplanation: `
1. Write DataFrame to parquet file.
2. Print success message that file was saved.
  `,
  ui: WriteParquet,
  Icon: FileCsvIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    { importName: "pyarrow", installationName: "pyarrow", version: ">=16.1.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["pandas", "parquet"],
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

export default WriteParquetRecipe;
