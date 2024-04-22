import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { Numeric } from "../../components/Numeric";
import { XlsIcon } from "../../icons/Xls";

export const ReadExcel: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [advanced, setAdvanced] = useState(false);
  const [name, setName] = useState("df");
  const [sheet, setSheet] = useState("0");
  const [skipRows, setSkipRows] = useState(0);

  const [filePath, setFilePath] = useState("data.xlsx");

  useEffect(() => {
    if (name === "" || filePath === "") {
      //setCode("");
      //setPackages([""]);
      return;
    }
    let src = `# read data from Excel file\n`;
    src += `${name} = pd.read_excel(r"${filePath}"`;
    if (sheet !== "0") {
      src += `, sheet_name="${sheet}"`;
    }
    if (skipRows !== 0) {
      src += `, skiprows=${skipRows}`;
    }
    src += `)\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;

    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, filePath, sheet, skipRows]);

  return (
    <div>
      <Title
        Icon={XlsIcon}
        label={"Read Excel file"}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <SelectPath label={"Select Excel file"} setPath={setFilePath} />
      {advanced && (
        <>
          <Variable
            label={"Sheet name"}
            name={sheet}
            setName={setSheet}
            tooltip="Sheet name can be string with Sheet title or integer with Sheet position (zero-indexed)."
          />
          <Numeric
            label={"Skip rows"}
            name={skipRows}
            setName={setSkipRows}
            tooltip={"Number of rows to skip when file reading."}
          />
        </>
      )}
    </div>
  );
};

export const ReadExcelRecipe: IRecipe = {
  name: "Read Excel",
  longName: "Read Excel in Python",
  parentName: "Read data",
  description: `Load Excel file into Pandas DataFrame. Please check **Advanced** settings. You can select Sheet by name or by integer index, which is zero-indexed. You can also specify number of rows to skip when file reading.
    
Please check [pandas.read_excel](https://pandas.pydata.org/pandas-docs/stable/reference/api/pandas.read_excel.html) for more parameters.`,
  shortDescription: "Load Excel file into Pandas DataFrame.",
  tags: ["excel", "spreadsheet"],
  codeExplanation: `
1. Read Excel file from provided path.
2. Display first rows of data.  
  `,
  ui: ReadExcel,
  Icon: XlsIcon,
  docsUrl: "python-read-excel",
};
