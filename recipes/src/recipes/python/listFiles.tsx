import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { FolderOpenIcon } from "../../icons/FolderOpen";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Toggle } from "../../components/Toggle";

const DOCS_URL = "python-list-files-in-directory";

export const ListFiles: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myList, setMyList] = useState("my_files");
  const [myFolder, setMyFolder] = useState("my_path");
  const [showDirectories, setShowDirectories] = useState(true);
  const [filterExtension, setFilterExtension] = useState("");

  useEffect(() => {
    let src = `# list files in directory\n`;
    let condition = "";
    if (!showDirectories) {
      condition = ` if isfile(join("${myFolder}", f))`;
    }
    if (filterExtension !== "") {
      if (condition === "") {
        condition = ` if f.endswith("${filterExtension}")`;
      } else {
        condition += ` and f.endswith("${filterExtension}")`;
      }
    }
    src += `${myList} = [f for f in listdir("${myFolder}")${condition}]\n`;
    src += `print("Files in directory ${myFolder}")\n`;
    src += `print(${myList})`;
    setCode(src);
    setPackages(["from os import listdir", "from os.path import isfile, join"]);
    if (setMetadata) {
      setMetadata({
        myList,
        myFolder,
        showDirectories,
        filterExtension,
        docsUrl: DOCS_URL,
      });
    }
  }, [myList, myFolder, showDirectories, filterExtension]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myList"]) setMyList(metadata["myList"]);
      if (metadata["myFolder"]) setMyFolder(metadata["myFolder"]);
      if (metadata["showDirectories"])
        setShowDirectories(metadata["showDirectories"]);
      if (metadata["filterExtension"])
        setFilterExtension(metadata["filterExtension"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FolderOpenIcon}
        label={"List all files in directory"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
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

      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Variable
          label={"Filter files with extension"}
          name={filterExtension}
          setName={setFilterExtension}
          tooltip="Include only files with provided extension"
        />
        <Toggle
          label="Show directories"
          value={showDirectories}
          setValue={setShowDirectories}
          tooltip="Directory is a file as well. Please set to false to exclude directories."
        />
      </div>
    </div>
  );
};

export const ListFilesRecipe: IRecipe = {
  name: "List files",
  longName: "List files in directory in Python",
  parentName: "Python",
  description: `Create and display list with all files in the selected directory with Python code. You can filter directories out and apply filtering on file extension.`,
  shortDescription: `Create and display list with all files in the selected directory with Python code. You can filter directories out and apply filtering on file extension.`,
  codeExplanation: `
1. Create list with files. You can filter out directories and filter files based on extension.
2. Display list with files.
  `,
  ui: ListFiles,
  Icon: FolderOpenIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
  tags: ["file"],
};

export default ListFilesRecipe;
