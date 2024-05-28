import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { FilesIcon } from "../../icons/Files";
import { Toggle } from "../../components/Toggle";

const DOCS_URL = "python-copy-file";

export const FileCopy: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myFile, setMyFile] = useState("source_file_name");
  const [myDstFile, setDstFile] = useState("destination_path");
  const [copyFolder, setCopyFolder] = useState(false);

  useEffect(() => {
    let src = `# copy file\n`;
    src += `shutil.copy2(r"${myFile}", r"${myDstFile}")\n`;
    src += `print("File coppied")`;
    setCode(src);
    setPackages(["import shutil"]);
    if (setMetadata) {
      setMetadata({
        myFile,
        myDstFile,
        copyFolder,
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile, myDstFile, copyFolder]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"]) setMyFile(metadata["myFile"]);
      if (metadata["myDstFile"]) setDstFile(metadata["myDstFile"]);
      if (metadata["copyFolder"]) setCopyFolder(metadata["copyFolder"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FilesIcon}
        label={"Copy files"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
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
  name: "Copy file",
  longName: "Copy file in Python",
  parentName: "Python",
  description:
    "Copy file in Python. Source file can be coppied to new file path or to new directory.",
  shortDescription: "Copy file in Python",
  codeExplanation: `
1. Copy file to new destination.

Please note that in this recipe you can select a file in the User Interface, which already means that file must exits. What to do, if file doesn't exist?
Please select some other file in the same or similar directory, and manually edit the file path in the code.
  `,
  tags: ["file", "copy"],
  ui: FileCopy,
  Icon: FilesIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileCopyRecipe;
