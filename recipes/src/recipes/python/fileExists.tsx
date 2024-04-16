import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title"; 
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { FileUnknownIcon } from "../../icons/FileUnknown";

export const FileExists: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  const [exists, setExists] = useState("my_file_exists");
  const [myFile, setMyFile] = useState("file_name");
  
  useEffect(() => {
    let src = `# check if file exists and assign this information to variable\n`;
    src += `${exists} = exists(r"${myFile}")\n`;
    src += `# display information\n`;
    src += `if ${exists}:\n`;
    src += `    print(f"File ${myFile} exists")\n`;
    src += `else:\n`;
    src += `    print(f"File ${myFile} does not exists")\n`;
    setCode(src);
    setPackages(["from os.path import exists"]);
  }, [exists, myFile]);

  return (
    <div>
      <Title Icon={FileUnknownIcon} label={"Check if file exists"} />
      <Variable
        label={"File exists variable"}
        name={exists}
        setName={setExists}
      />
      <SelectPath
        label="Select file"
        setPath={setMyFile}
        defaultPath={myFile}
        selectFolder={false}
      />
    </div>
  );
};

export const FileExistsRecipe: IRecipe = {
  name: "Check if file exists",
  longName: "Check if file exists in Python",
  parentName: "Python",
  description: "Check if file exists in Python without raising Exception",
  shortDescription: "Check if file exists in Python without raising Exception",
  codeExplanation: `
1. Check if file exists and store that information in variable.
2. Display information if file exists or not.
  `,
  ui: FileExists,
  Icon: FileUnknownIcon,
  requiredPackages: [],
  docsUrl: "python-check-file-exists",
  tags: ["file"],
};

export default FileExistsRecipe;
