import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { XmlIcon } from "../../icons/Xml";

const DOCS_URL = "python-read-xml";

export const ReadXml: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.xml");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from XML file\n`;
    src += `${name} = pd.read_xml(r"${filePath}")\n`;
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
        Icon={XmlIcon}
        label={"Read Stata file"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select XML (*.xml) file"} defaultPath={filePath} setPath={setFilePath} />
    </div>
  );
};

export const ReadXmlRecipe: IRecipe = {
  name: "Read XML",
  longName: "Read XML file in Python",
  parentName: "Read data",
  description: `
  An XML (Extensible Markup Language) file is a text-based file that stores data in a format that is 
both human-readable and machine-readable, using a hierarchical structure. You can load XML file in your notebook using Python code and Pandas library. 
  
Please check [pandas.read_xml](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_xml.html) for more parameters.`,
  shortDescription: 
`An XML (Extensible Markup Language) file is a text-based file that stores data using a hierarchical structure. You can load XML file in Python using Pandas library.`,
  tags: ["xml", "pandas"],
  codeExplanation: `
1. Read XML file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadXml,
  Icon: XmlIcon,
  docsUrl: DOCS_URL,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    { importName: "lxml", installationName: "lxml", version: ">=5.2.2" },
  ],
};
