import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";

export const WriteCSV: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
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

  const [filePath, setFilePath] = useState("my_data.csv");

  useEffect(() => {
    let src = `# write DataFrame to CSV\n`;
    src += `${df}.to_csv(r"${filePath}")\n`;
    src += `print(f"DataFrame saved at ${filePath}"`
    if(!index) {
      src += `, index=False`;
    }
    src += `)`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [df, filePath, index]);

  return (
    <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
      <Title
        Icon={FileCsvIcon}
        label={"Write CSV"}
        //advanced={advanced}
        //setAdvanced={setAdvanced}
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
          <SelectPath label={"CSV file path"} setPath={setFilePath} />
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
  docsUrl: "pandas-write-csv",
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
