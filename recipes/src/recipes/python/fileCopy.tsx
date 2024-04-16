import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { FileShredderIcon } from "../../icons/FileShredder";
import { FilesIcon } from "../../icons/Files";
import { Toggle } from "../../components/Toggle";

export const FileCopy: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [myFile, setMyFile] = useState("source_file_name");
  const [myDstFile, setDstFile] = useState("destination_path");
  const [copyFolder, setCopyFolder] = useState(false);

  useEffect(() => {
    let src = `# copy file\n`;
    src += `shutil.copy2(r"${myFile}", r"${myDstFile}")\n`;
    src += `print("File coppied")`;
    setCode(src);
    setPackages(["import shutil"]);
  }, [myFile, myDstFile]);

  return (
    <div>
      <Title Icon={FilesIcon} label={"Copy files"} />
      <SelectPath
        label="Select file to be copied"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
      <Toggle
        label={"Destination is a directory"}
        value={copyFolder}
        setValue={setCopyFolder}
        tooltip="Destination might be other file path or a directory"
      />
      {!copyFolder && (
        <SelectPath
          label="Select destination file"
          setPath={setDstFile}
          defaultPath={myDstFile}
          selectFolder={false}
        />
      )}
      {copyFolder && (
        <SelectPath
          label="Select destination directory"
          setPath={setDstFile}
          defaultPath={myDstFile}
          selectFolder={true}
        />
      )}
    </div>
  );
};

export const FileCopyRecipe: IRecipe = {
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
  ui: FileCopy,
  Icon: FileShredderIcon,
  requiredPackages: [],
  docsUrl: "python-delete-file",
};

export default FileCopyRecipe;
