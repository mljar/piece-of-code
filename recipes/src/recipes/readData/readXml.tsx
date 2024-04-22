import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { XmlIcon } from "../../icons/Xml";

export const ReadXml: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
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
  }, [name, filePath]);

  return (
    <div>
      <Title
        Icon={XmlIcon}
        label={"Read Stata file"}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select XML (*.xml) file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadXmlRecipe: IRecipe = {
  name: "Read XML",
  longName: "Read XML file in Python",
  parentName: "Read data",
  description: `Load XML file in Python code. 
  
Please check [pandas.read_xml](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_xml.html) for more parameters.`,
  shortDescription: `Load XML file in Python code.`,
  tags: ["xml", "pandas"],
  codeExplanation: `
1. Read XML file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadXml,
  Icon: XmlIcon,
  docsUrl: "python-read-xml",
};
