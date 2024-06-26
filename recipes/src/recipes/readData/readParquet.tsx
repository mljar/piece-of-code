import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { LayoutGridIcon } from "../../icons/LayoutGrid";
import { DashboardIcon } from "../../icons/Dashboard";

const DOCS_URL = "python-read-parquet";

export const ReadParquet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.parquet");

  useEffect(() => {
    setPackages(["import pandas as pd"]);
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from parquet file\n`;
    src += `${name} = pd.read_parquet(r"${filePath}")\n`;
    src += `# display data shape\n`;
    src += `print(${name}.shape)\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);

    if (setMetadata) {
      setMetadata({
        name,
        filePath,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, filePath]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"]) setName(metadata["name"]);
      if (metadata["filePath"]) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={DashboardIcon}
        label={"Read Parquet file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath
        label={"Select Parquet file"}
        defaultPath={filePath}
        setPath={setFilePath}
      />
    </div>
  );
};

export const ReadParquetRecipe: IRecipe = {
  name: "Read Parquet",
  longName: "Read Parquet file in Python",
  parentName: "Read data",
  description: `Parquet files are designed to store large volumes of data in columnar storage format. Parquet files can be read in Python code using pandas and pyarrow packages.
  
Please check [pandas.read_parquet](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_parquet.html) function for more details.`,
  shortDescription: `Parquet files are designed to store large volumes of data in columnar storage format. Parquet files can be read in Python code using pandas and pyarrow packages.`,
  tags: ["parquet", "pandas"],
  codeExplanation: `
1. Read Parquet file from provided path.
2. Display shape of loaded data.
3. Display first rows of data.  

Additionally, you can specify \`columns\` list as argument in \`read_parquet()\` function, and only columns from list will be loaded.
  `,
  ui: ReadParquet,
  Icon: DashboardIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    { importName: "pyarrow", installationName: "pyarrow", version: ">=16.1.0" },
  ],
};
