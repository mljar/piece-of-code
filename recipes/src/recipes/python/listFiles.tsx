import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { FolderOpenIcon } from "../../icons/FolderOpen";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";

export const ListFiles: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [myList, setMyList] = useState("my_files");
  const [myFolder, setMyFolder] = useState("my_path");
  const [onlyFiles, setOnlyFiles] = useState(true);
  useEffect(() => {
    let src = `# list files in directory\n`;
    if (onlyFiles) {
      src += `${myList} = [f for f in listdir("${myFolder}") if isfile(join("${myFolder}", f))]\n`;
    } else {
      src += `${myList} = [f for f in listdir("${myFolder}")]\n`;
    }
    src += `print("Files in directory ${myFolder}")\n`;
    src += `print(${myList})`;
    setCode(src);
    setPackages(["from os import listdir", "from os.path import isfile, join"]);
  }, [myList, myFolder, onlyFiles]);

  return (
    <div>
      <Title Icon={FolderOpenIcon} label={"List all files in directory"} />
      <Variable
        label={"Assign list with files to variable"}
        name={myList}
        setName={setMyList}
      />
      <SelectPath
        label="Select directory"
        setPath={setMyFolder}
        selectFolder={true}
      />
      <Toggle
        label="Include only files"
        value={onlyFiles}
        setValue={setOnlyFiles}
        tooltip="Directory is a file as well. Please set to false to include directories."
      />
    </div>
  );
};

export const ListFilesRecipe: IRecipe = {
  name: "List files",
  longName: "List files in directory in Python",
  parentName: "Python",
  description:
    "Create and display list with all files in the selected directory with Python code.",
  shortDescription: "List all files in directory",
  codeExplanation: "",
  ui: ListFiles,
  Icon: FolderOpenIcon,
  requiredPackages: [],
  docsUrl: "python-list-files-in-directory",
  tags: ["file"],
};

export default ListFilesRecipe;
