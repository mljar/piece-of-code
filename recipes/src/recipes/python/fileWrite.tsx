import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FilePencilIcon } from "../../icons/FilePencil";

const DOCS_URL = "python-write-to-file";

export const FileWrite: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myFile, setMyFile] = useState("file_name");
  const [text, setText] = useState("hello!");
  const [advanced, setAdvanced] = useState(false);
  const [binary, setBinary] = useState(false);

  useEffect(() => {
    let src = `# open a file in write mode\n`;
    src += `# new file will be created if doesnt exist\n`;
    src += `# if file exists then it will be overwritten\n`;
    let mode = "w";
    if (binary) {
      mode = "wb";
    }
    src += `with open(r"${myFile}", "${mode}") as fout:\n`;
    src += `    fout.write("${text}")`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        myFile,
        text,
        binary,
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile, text, binary]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"]) setMyFile(metadata["myFile"]);
      if (metadata["text"]) setText(metadata["text"]);
      if (metadata["binary"]) setBinary(metadata["binary"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FilePencilIcon}
        label={"Write to file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />

      <SelectPath
        label="Select file"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
      <Variable label="Text to be added" name={text} setName={setText} />
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
  description: `Write to file in Python. If file doesn't exist, then it will be created. If file exists, then it will be overwritten. 
    Files can be written as text or binary format.`,
  shortDescription: "Write to file in Python",
  codeExplanation: `
1. Open file in write mode.
2. Write a new content in the file.
  `,
  tags: ["file", "write"],
  ui: FileWrite,
  Icon: FilePencilIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileWriteRecipe;
