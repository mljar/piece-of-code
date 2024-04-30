import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { HtmlIcon } from "../../icons/Html";

export const ReadHtml: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [name, setName] = useState("df");
  const [filePath, setFilePath] = useState("data.xml");

  useEffect(() => {
    if (name === "" || filePath === "") {
      return;
    }
    let src = `# read data from HTML file\n`;
    src += `${name} = pd.read_html(r"${filePath}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath]);

  return (
    <div>
      <Title Icon={HtmlIcon} label={"Read HTML file"} />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select HTML (*.html) file"} setPath={setFilePath} />
    </div>
  );
};

export const ReadHtmlRecipe: IRecipe = {
  name: "Read HTML",
  longName: "Read HTML file in Python",
  parentName: "Read data",
  description: `Load HTML file in Python code. 
  
Please check [pandas.read_html](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_html.html) for more parameters.`,
  shortDescription: `Load HTML file in Python code.`,
  tags: ["html", "pandas"],
  codeExplanation: `
1. Read XML file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadHtml,
  Icon: HtmlIcon,
  docsUrl: "python-read-html",
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
};
