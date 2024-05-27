import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { LayoutGridIcon } from "../../icons/LayoutGrid";
import { SumIcon } from "../../icons/Sum";

const DOCS_URL = "python-read-spss";

export const ReadSpss: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.sav");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from SPSS file\n`;
    src += `${name} = pd.read_spss(r"${filePath}")\n`;
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
      if (metadata["name"]) setName(metadata["name"]);
      if (metadata["filePath"]) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SumIcon}
        label={"Read SPSS file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select SPSS (*.sav) file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadSpssRecipe: IRecipe = {
  name: "Read SPSS",
  longName: "Read SPSS file in Python",
  parentName: "Read data",
  description: `Load SPSS file in Python code. 
  
Please check [pandas.read_spss](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_spss.html) for more parameters.`,
  shortDescription: `Load SPSS file in Python code`,
  tags: ["spss", "pandas"],
  codeExplanation: `
1. Read SPSS file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadSpss,
  Icon: SumIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
