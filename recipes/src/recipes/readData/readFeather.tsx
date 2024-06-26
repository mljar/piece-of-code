import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { LayoutGridIcon } from "../../icons/LayoutGrid";
import { DashboardIcon } from "../../icons/Dashboard";
import { FeatherIcon } from "../../icons/Feather";

const DOCS_URL = "python-read-feather";

export const ReadFeather: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
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
      if (metadata["name"] !== undefined) setName(metadata["name"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FeatherIcon}
        label={"Read Feather file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath
        label={"Select Feather file"}
        defaultPath={filePath}
        setPath={setFilePath}
      />
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
  shortDescription: `Load Feather file in Python code`,
  tags: ["feather", "pandas"],
  codeExplanation: `
1. Read Feather file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadFeather,
  Icon: FeatherIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
