import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { StataIcon } from "../../icons/Stata";

export const ReadStata: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.dta");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from Stata file\n`;
    src += `${name} = pd.read_stata(r"${filePath}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath]);

  return (
    <div>
      <Title
        Icon={StataIcon}
        label={"Read Stata file"}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select Stata (*.dta) file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadStataRecipe: IRecipe = {
  name: "Read Stata",
  longName: "Read Stata file in Python",
  parentName: "Read data",
  description: `Load Stata file in Python code. 
  
Please check [pandas.read_stata](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_stata.html) for more parameters.`,
  shortDescription: `Load Stata file in Python code`,
  tags: ["stata", "pandas"],
  codeExplanation: `
1. Read Stata file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadStata,
  Icon: StataIcon,
  docsUrl: "python-read-stata",
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
