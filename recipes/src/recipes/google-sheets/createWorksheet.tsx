import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SPREADSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";

import { ToolIcon } from "../../icons/Tool";

const DOCS_URL = "create-worksheet-python";

export const CreateWorkSheet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  const vars = variables.filter((v) => v.varType.includes(SPREADSHEET));

  if (variablesStatus === "loaded" && !vars.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There is no declared Spreadsheet in your notebook. Please create or
          open the spreadsheet. You can use Create Spreadsheet or Open
          Spreadsheet recipes.
        </p>
      </div>
    );
  }
  const [title, setTitle] = useState("");
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [advanced, setAdvanced] = useState(false);
  const [worksheetName, setWorksheetName] = useState("worksheet");

  useEffect(() => {
    let src = ``;
    src += `# create worksheet\n`;
    src += `${worksheetName} = sh.add_worksheet(title="${title}", rows=${rows ? rows : 0}, cols=${cols ? cols : 0})`;

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        title,
        rows,
        cols,
        advanced,
        worksheetName,
        docsUrl: DOCS_URL,
      });
    }
  }, [title, rows, cols, advanced, worksheetName]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["title"] !== undefined) setTitle(metadata["title"]);
      if (metadata["rows"] !== undefined) setRows(metadata["rows"]);
      if (metadata["cols"] !== undefined) setCols(metadata["cols"]);
      if (metadata["worksheetName"] !== undefined)
        setWorksheetName(metadata["worksheetName"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ToolIcon}
        label={"Create worksheet"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Enter worksheet name"}
        name={worksheetName}
        setName={setWorksheetName}
        tooltip={
          "Enter the name of the variable to which the worksheet will be assigned."
        }
      />
      <Variable
        label={"Enter title"}
        name={title}
        setName={setTitle}
        tooltip={"Enter the title of the worksheet you want to create."}
      />
      {advanced && (
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Numeric
            label={"Enter number of rows"}
            name={rows}
            setName={setRows}
            tooltip={
              "As many rows as there should be in the worksheet (0 means default)."
            }
          />
          <Numeric
            label={"Enter number of columns"}
            name={cols}
            setName={setCols}
            tooltip={
              "As many columns as there should be in the worksheet (0 means default)."
            }
          />
        </div>
      )}
    </div>
  );
};

export const CreateWorkSheetRecipe: IRecipe = {
  name: "Create worksheet",
  longName: "Create the Google Sheets worksheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to create a new worksheet in Google Sheets using Python and the gspread library. This recipe covers the steps to add a worksheet to an existing spreadsheet by specifying its title, number of rows, and columns. Follow these instructions to efficiently manage and organize your data by adding new worksheets programmatically within your Google Sheets.",
  shortDescription:
    "Learn how to create a new worksheet in Google Sheets using Python and the gspread library. This recipe covers adding a worksheet by specifying its title, number of rows, and columns programmatically.",
  codeExplanation: `
  1. Create the worksheet`,
  ui: CreateWorkSheet,
  Icon: ToolIcon,
  requiredPackages: [
    { importName: "gspread", installationName: "gspread", version: ">=6.1.2" },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "sh",
      varType: SPREADSHEET,
      varColumns: [""],
      varColumnTypes: [""],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export default CreateWorkSheetRecipe;
