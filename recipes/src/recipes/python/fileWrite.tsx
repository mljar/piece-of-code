import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";
import { Select } from "../../components/Select";

const DOCS_URL = "python-write-to-file";

export const FileWrite: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [variable, setVariable] = useState("");
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("my_file.txt");

  const [text, setText] = useState("hello!");
  const [advanced, setAdvanced] = useState(false);
  const [binary, setBinary] = useState(false);
  const [saveVariable, setSaveVariable] = useState(false);

  useEffect(() => {
    let src = `# construct file path\n`;
    src += `fname = os.path.join(r"${filePath}", "${fileName}")\n`;
    src += `# open a file in write mode\n`;
    src += `# new file will be created if doesnt exist\n`;
    src += `# if file exists then it will be overwritten\n`;
    let mode = "w";
    if (binary) {
      mode = "wb";
    }
    src += `with open(fname, "${mode}") as fout:\n`;
    if (saveVariable) {
      src += `    fout.write(${variable})\n`;
    } else {
      src += `    fout.write("${text}")\n`;
    }
    src += `print("File written successfully")`;
    setCode(src);
    setPackages(["import os"]);
    if (setMetadata) {
      setMetadata({
        filePath,
        fileName,
        text,
        saveVariable,
        variable,
        variables: variables.filter((v) => v.varType === "str"),
        binary,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath, fileName, text, saveVariable, variable, binary]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
      if (metadata["saveVariable"] !== undefined) setSaveVariable(metadata["saveVariable"]);
      if (metadata["variable"] !== undefined) setVariable(metadata["variable"]);
      if (metadata["binary"] !== undefined) setBinary(metadata["binary"]);
    }
  }, [metadata]);

  useEffect(() => {
    if (saveVariable && variable === "") {
      const vs = variables.filter((v) => v.varType === "str");
      if (vs.length > 0) {
        setVariable(vs[0].varName);
      }
    }
  }, [saveVariable]);

  return (
    <div>
      <Title
        Icon={FilePencilIcon}
        label={"Write to file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />

      <SelectPath
        label={"Select directory, leave empty to save in the current directory"}
        setPath={setFilePath}
        defaultPath={filePath}
        selectFolder={true}
      />
      <Variable
        label={"File name, remember to add file extension"}
        name={fileName}
        setName={setFileName}
      />
      <Toggle
        label={
          "Would you like to save text or variable? Select to save variable"
        }
        value={saveVariable}
        setValue={setSaveVariable}
      />
      {!saveVariable && (
        <Variable label="Text to save" name={text} setName={setText} />
      )}
      {saveVariable && (
        <Select
          label={"String variable to save"}
          option={variable}
          options={variables
            .filter((v) => v.varType === "str")
            .map((d) => [d.varName, d.varName])}
          setOption={setVariable}
        />
      )}
      {advanced && (
        <Toggle
          label={"Open file in binary format"}
          value={binary}
          setValue={setBinary}
        />
      )}
    </div>
  );
};

export const FileWriteRecipe: IRecipe = {
  name: "Write to file",
  longName: "Write to file in Python",
  parentName: "Python",
  description: `Write to file in Python. This code snippet constructs a file path, opens a file in write mode (creating it if it doesn't exist or overwriting it if it does), writes a string to the file, and prints a confirmation message upon completion. Files can be written as text or binary format. You can write to file provided text or string variable.`,
  shortDescription:
    "Write to file in Python. This code snippet constructs a file path, opens a file in write mode (creating it if it doesn't exist or overwriting it if it does), writes a string to the file, and prints a confirmation message upon completion.",
  codeExplanation: `
1. Construct file path from selected directory and file name. Please remember to add proper extension to file name.
2. Open file in write mode, if file doesn't exist it will be created.
3. Write a new content in the file. You can write provided text or string variable.

File can be written in text or binary format. Text format is human readable, whereas binary format is machine readable.  Text files are prefered for small content. Please use binary format to store large data in the file.
  `,
  tags: ["file", "write"],
  ui: FileWrite,
  Icon: FilePencilIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "content",
      varType: "str",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "other_content",
      varType: "str",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default FileWriteRecipe;
