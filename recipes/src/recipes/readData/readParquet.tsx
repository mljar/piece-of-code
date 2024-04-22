import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { LayoutGridIcon } from "../../icons/LayoutGrid";
import { DashboardIcon } from "../../icons/Dashboard";

export const ReadParquet: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.parquet");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from Stata file\n`;
    src += `${name} = pd.read_parquet(r"${filePath}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath]);

  return (
    <div>
      <Title
        Icon={DashboardIcon}
        label={"Read Parquet file"}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select Parquet file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadParquetRecipe: IRecipe = {
  name: "Read Parquet",
  longName: "Read Parquet file in Python",
  parentName: "Read data",
  description: `Load Parquet file in Python code.
  
Please check [pandas.read_parquet](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_parquet.html) for more parameters.`,
  shortDescription: `Load Parquet file in Python code.`,
  tags: ["parquet", "pandas"],
  codeExplanation: `
1. Read Parquet file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadParquet,
  Icon: DashboardIcon,
  docsUrl: "python-read-parquet",
};
