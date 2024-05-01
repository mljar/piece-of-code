import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { CucumberIcon } from "../../icons/Cucumber";

export const SavePickle: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
}) => {
  if (variablesStatus === "loaded" && !variables.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no Python objects in your notebook. Please create some :-)
        </p>
      </div>
    );
  }

  const [df, setDf] = useState(variables.length ? variables[0].varName : "");
  const [filePath, setFilePath] = useState("my_data.pickle");

  useEffect(() => {
    let src = `# save object to pickle file\n`;
    src += `with open(r"${filePath}", "wb) as fout:\n`;
    src += `    pickle.dump(${df}, fout)\n`;
    src += `print(f"Object ${df} saved at ${filePath}"`;
    setCode(src);
    setPackages(["import pickle"]);
  }, [df, filePath]);

  return (
    <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
      <Title Icon={CucumberIcon} label={"Save Python object to Pickle"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no objects in your notebook. Please create some :-)
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Object to save"}
            option={df}
            options={variables.map((d) => [d.varName, d.varName])}
            setOption={setDf}
          />
          <SelectPath label={"File path"} setPath={setFilePath} />
        </>
      )}
    </div>
  );
};

// export default ReadCSV;

export const SavePickleRecipe: IRecipe = {
  name: "Save to Pickle",
  longName: "Write any Python object to Pickle file",
  parentName: "Write data",
  description: `You can save any Python object to Pickle file. If your output file doesn't exist, please similar path and do adjustment to path in the code.`,
  shortDescription: "Write Python object to Pickle file",
  codeExplanation: ``,
  ui: SavePickle,
  Icon: CucumberIcon,
  requiredPackages: [],
  docsUrl: "python-save-pickle",
  tags: ["pickle"],
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

export default SavePickleRecipe;
