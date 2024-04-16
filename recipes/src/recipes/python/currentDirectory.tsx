import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Toggle } from "../../components/Toggle";
import { CalendarClockIcon } from "../../icons/CalendarClock";
import { FolderOpenIcon } from "../../icons/FolderOpen";

export const CurrentDirectory: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  const [myVar, setMyVar] = useState("working_dir");

  useEffect(() => {
    let src = `# get current working directory\n`;
    src += `${myVar} = os.getcwd()\n`;
    src += `# print working directory\n`;
    src += `print(f"Current working directory is {${myVar}}")`;
    setCode(src);
    setPackages(["import os"]);
  }, [myVar]);

  return (
    <div>
      <Title Icon={FolderOpenIcon} label={"Get working directory"} />
      <Variable
        label={"Current working directory"}
        name={myVar}
        setName={setMyVar}
        tooltip={"Current direcory path will be stored in this variable"}
      />
    </div>
  );
};

export const CurrentDirectoryRecipe: IRecipe = {
  name: "Get working directory",
  longName: "Get working directory in Python",
  parentName: "Python",
  description: "Get and display current working directory in Python",
  shortDescription: "Get and display current working directory in Python",
  codeExplanation: `
1. Get current working directory.
2. Display its value.`,
  ui: CurrentDirectory,
  Icon: FolderOpenIcon,
  requiredPackages: [],
  docsUrl: "python-get-working-directory",
  tags: ["directory", "folder"],
};

export default CurrentDirectoryRecipe;
