import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { LayoutGridIcon } from "../../icons/LayoutGrid";
import { DashboardIcon } from "../../icons/Dashboard";
import { FeatherIcon } from "../../icons/Feather";

export const ReadFeather: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
}) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.feather");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from Stata file\n`;
    src += `${name} = pd.read_feather(r"${filePath}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath]);

  return (
    <div>
      <Title Icon={FeatherIcon} label={"Read Feather file"} />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select Feather file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadFeatherRecipe: IRecipe = {
  name: "Read Feather",
  longName: "Read Feather file in Python",
  parentName: "Read data",
  description: `Load Feather file in Python code.
  
Please check [pandas.read_feather](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_feather.html) for more parameters.
  `,
  shortDescription: `Load Feather file in Python code.`,
  tags: ["feather", "pandas"],
  codeExplanation: `
1. Read Feather file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadFeather,
  Icon: FeatherIcon,
  docsUrl: "python-read-feather",
};
