import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { FilePlusIcon } from "../../icons/FilePlus";
import { Toggle } from "../../components/Toggle";

const DOCS_URL = "python-append-to-file";

export const FileAppend: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [myFile, setMyFile] = useState("file_name");
  const [text, setText] = useState("hello!");
  const [advanced, setAdvanced] = useState(false);
  const [binary, setBinary] = useState(false);

  useEffect(() => {
    let src = `# open file in append mode\n`;
    let mode = 'a';
    if(binary) {
        mode = 'ab';
    }
    src += `with open(r"${myFile}", "${mode}") as fin:\n`;
    src += `    fin.write("${text}")`;
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
      if (metadata["myFile"] !== undefined) setMyFile(metadata["myFile"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
      if (metadata["binary"] !== undefined) setBinary(metadata["binary"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FilePlusIcon}
        label={"Append to file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
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

export const FileAppendRecipe: IRecipe = {
  name: "Append to file",
  longName: "Append to file in Python",
  parentName: "Python",
  description:
    "You can append any content to file using Python. Python built-in functions `open()` and `read()` will help you automate your workflows. Files can be edited as text or binary format.",
  shortDescription:  "You can append any content to file using Python. Python built-in functions `open()` and `read()` will help you automate your workflows. Files can be edited as text or binary format.",
  codeExplanation: `
1. Open file in append mode.
2. Write a new content at the end of file.
  `,
  tags: ["file", "append"],
  ui: FileAppend,
  Icon: FilePlusIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileAppendRecipe;
