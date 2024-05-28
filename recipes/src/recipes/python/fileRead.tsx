import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";
import { FileDownloadIcon } from "../../icons/FileDownload";

const DOCS_URL = "python-read-file";

export const FileRead: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myFile, setMyFile] = useState("file_name");
  const [content, setContent] = useState("content");
  const [advanced, setAdvanced] = useState(false);
  const [binary, setBinary] = useState(false);

  useEffect(() => {
    let src = `# initialize variable\n${content} = ''\n# open a file in read mode\n`;
    let mode = "r";
    if (binary) {
      mode = "rb";
    }
    src += `with open(r"${myFile}", "${mode}") as fin:\n`;
    src += `    ${content} = fin.read()\n`;
    src += `# display file content\n`;
    src += `print(${content})`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        myFile,
        content,
        binary,
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile, content, binary]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"]) setMyFile(metadata["myFile"]);
      if (metadata["content"]) setContent(metadata["content"]);
      if (metadata["binary"]) setBinary(metadata["binary"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FileDownloadIcon}
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
      <Variable label="Content variable" name={content} setName={setContent} />
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

export const FileReadRecipe: IRecipe = {
  name: "Read file",
  longName: "Read file in Python",
  parentName: "Python",
  description: `Read file in Python. File can be read as text or binary.`,
  shortDescription: "Read file in Python",
  codeExplanation: `
1. Open file in read mode.
2. Read content from file and assign to variable.
  `,
  tags: ["file", "read"],
  ui: FileRead,
  Icon: FileDownloadIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileReadRecipe;
