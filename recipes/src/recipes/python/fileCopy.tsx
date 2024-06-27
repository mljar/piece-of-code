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
        docsUrl: DOCS_URL,
      });
    }
  }, [myFile, myDstFile]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myFile"] !== undefined) setMyFile(metadata["myFile"]);
      if (metadata["myDstFile"] !== undefined)
        setDstFile(metadata["myDstFile"]);
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

      <SelectPath
        label="Select destination directory"
        setPath={setDstFile}
        defaultPath={myDstFile}
        selectFolder={true}
      />
    </div>
  );
};

export const FileCopyRecipe: IRecipe = {
  name: "Copy file",
  longName: "Copy file in Python",
  parentName: "Python",
  description:
`Copy file in Python using built-in \`shutil\` module. Source file will be coppied to new to a new directory. We will use \`shutil.copy2()\` function to copy file to preserve timestamp information.`,
  shortDescription: `Copy file in Python using built-in \`shutil\` module. Source file will be coppied to new to a new directory. We will use \`shutil.copy2()\` function to copy file to preserve timestamp information.`,
  codeExplanation: `
Copy file to new destination directory.
  `,
  tags: ["file", "copy"],
  ui: FileCopy,
  Icon: FilesIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default FileCopyRecipe;
