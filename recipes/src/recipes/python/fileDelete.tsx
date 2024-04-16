import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { FileShredderIcon } from "../../icons/FileShredder";

export const FileDelete: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [myFile, setMyFile] = useState("file_name");
  const [text, setText] = useState("hello!");
  const [advanced, setAdvanced] = useState(false);
  const [binary, setBinary] = useState(false);

  useEffect(() => {
    let src = `# open a file in write mode\n`;
    src += `if os.path.isfile(r"${myFile}"):\n`;
    src += `    # file exists, delete it\n`;
    src += `    os.remove(r"${myFile})\n`;
    src += `else:\n`;
    src += `    print("File not found")`
    
    setCode(src);
    setPackages(["import os"])
  }, [myFile]);

  return (
    <div>
      <Title
        Icon={FileShredderIcon}
        label={"Delete file"}
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
  description: "Check if file exists and if yes, then delete file.",
  shortDescription: "Check if file exists and if yes, then delete file.",
  codeExplanation: `
1. Check if file exists in the file system.
2. Delete file if present.
  `,
  tags: ["file", "delete", "remove"],
  ui: FileDelete,
  Icon: FileShredderIcon,
  requiredPackages: [],
  docsUrl: "python-delete-file",
};

export default FileDeleteRecipe;
