import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { SasIcon } from "../../icons/Sas";

export const ReadSas: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.sas7bdat");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from SAS file\n`;
    src += `${name} = pd.read_sas(r"${filePath}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath]);

  return (
    <div>
      <Title Icon={SasIcon} label={"Read SAS file"} />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath
        label={"Select SAS (*.sas7bdat) file"}
        setPath={setFilePath}
      />
    </div>
  );
};

export const ReadSasRecipe: IRecipe = {
  name: "Read SAS",
  longName: "Read SAS file in Python",
  parentName: "Read data",
  description: `Load SAS file in Python code. 

Please check [pandas.read_sas](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_sas.html) for more parameters.`,
  shortDescription: `Load SAS file in Python code.`,
  tags: ["sas", "pandas"],
  codeExplanation: `
1. Read Stata file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadSas,
  Icon: SasIcon,
  docsUrl: "python-read-sas",
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
