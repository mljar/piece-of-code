import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { CucumberIcon } from "../../icons/Cucumber";

const DOCS_URL = "python-save-pickle";

export const SavePickle: React.FC<IRecipeProps> = ({
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
          There are no Python objects in your notebook. Please create some :-)
        </p>
      </div>
    );
  }

  const [df, setDf] = useState(variables.length ? variables[0].varName : "");
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("my_data.pickle");

  useEffect(() => {
    setPackages(["import os", "import pickle"]);

    let src = `# construct file path\n`;
    src += `fname = os.path.join(r"${filePath}", "${fileName}")\n`;
    src += `# save object to pickle file\n`;
    src += `with open(fname, "wb") as fout:\n`;
    src += `    pickle.dump(${df}, fout)\n`;
    src += `print(f"Object ${df} saved at {fname}")`;
    setCode(src);

    if (setMetadata) {
      setMetadata({
        df,
        filePath,
        fileName,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, filePath, fileName]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["filePath"]) setFilePath(metadata["filePath"]);
      if (metadata["fileName"]) setFileName(metadata["fileName"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CucumberIcon}
        label={"Save Python object to Pickle"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
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
          <SelectPath
            label={"Select directory, leave empty to save in the current directory"}
            setPath={setFilePath}
            selectFolder={true}
          />
          <Variable
            label={"File name, remember to set .pickle extension"}
            name={fileName}
            setName={setFileName}
          />
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
  description: `You can save any Python object to Pickle file. You can persist Python object on hard drive and load it later also with Pickle module. This is great!`,
  shortDescription: `You can save any Python object to Pickle file. You can persist Python object on hard drive and load it later also with Pickle module. This is great!`,
  codeExplanation: `
1. Construct the file path from selected folder and file name.
2. Save Python object to pickle format.
3. Print success message.`,
  ui: SavePickle,
  Icon: CucumberIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
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
