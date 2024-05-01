import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { FolderXIcon } from "../../icons/FolderX";

export const FolderDelete: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  const [myFolder, setMyFolder] = useState("directory_path");

  useEffect(() => {
    let src = `# try to delete directory\n`;
    src += `try:\n`;
    src += `    shutil.rmtree(r"${myFolder}")\n`;
    src += `except Exception as e:\n`;
    src += `    print(f"Error during directory delete, {str(e)}")`;

    setCode(src);
    setPackages(["import shutil"]);
  }, [myFolder]);

  return (
    <div>
      <Title Icon={FolderXIcon} label={"Delete folder"} />
      <SelectPath
        label="Select folder to be deleted"
        setPath={setMyFolder}
        defaultPath={myFolder}
        selectFolder={true}
      />
    </div>
  );
};

export const FolderDeleteRecipe: IRecipe = {
  name: "Delete directory",
  longName: "Delete directory in Python",
  parentName: "Python",
  description: "Check if directory exists and if yes, then delete it.",
  shortDescription: "Check if directory exists and if yes, then delete it",
  codeExplanation: `
1. Check if directory exists in the file system.
2. Delete directory if present.
  `,
  tags: ["folder", "directory", "delete", "remove"],
  ui: FolderDelete,
  Icon: FolderXIcon,
  requiredPackages: [],
  docsUrl: "python-delete-directory",
};

export default FolderDeleteRecipe;
