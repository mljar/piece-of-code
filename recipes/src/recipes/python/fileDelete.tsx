import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { FileShredderIcon } from "../../icons/FileShredder";

const DOCS_URL = "python-delete-file";

export const FileDelete: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myFile, setMyFile] = useState("file_path");

  useEffect(() => {
    let src = `# check if file path exists\n`;
    src += `if os.path.isfile(r"${myFile}"):\n`;
    src += `    # file exists, delete it\n`;
    src += `    os.remove(r"${myFile}")\n`;
    src += `else:\n`;
    src += `    print("File not found")`;

    setCode(src);
    setPackages(["import os"]);
    if (setMetadata) {
      setMetadata({
        myFile,
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"]) setMyFile(metadata["myFile"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FileShredderIcon}
        label={"Delete file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label="Select file to be deleted"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
    </div>
  );
};

export const FileDeleteRecipe: IRecipe = {
  name: "Delete file",
  longName: "Delete file in Python",
  parentName: "Python",
  description: `Use Python to automatically delete file from file system using os module and remove function. This code additionally checks if file exists before calling remove on file path.`,
  shortDescription: 
`Use Python to automatically delete file from file system using os module and remove function. This code additionally checks if file exists before calling remove on file path.`  
  ,
  codeExplanation: `
1. Check if file exists in the file system.
2. Delete file if provided file path exists.
  `,
  tags: ["file", "delete", "remove"],
  ui: FileDelete,
  Icon: FileShredderIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileDeleteRecipe;
