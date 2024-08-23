import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SPREADSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";
import { Select } from "../../components/Select";

import { ToolIcon } from "../../icons/Tool";

const DOCS_URL = "open-worksheet-python";

export const OpenWorkSheet: React.FC<IRecipeProps> = ({
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

  const [open, setOpen] = useState("index");
  const openOptions = [
    ["Index", "index"],
    ["Title", "title"],
    ["ID", "id"],
  ] as [string, string][];
  const [index, setIndex] = useState(0);
  const [title, setTitle] = useState("");
  const [ID, setID] = useState(111222333);
  const [worksheetName, setWorksheetName] = useState("worksheet");

  useEffect(() => {
    let src = ``;
    src += `# open worksheet\n`;
    if (open == "index") {
      src += `${worksheetName} = sh.get_worksheet(${index})`;
    }
    if (open == "title") {
      src += `${worksheetName} = sh.worksheet("${title}")`;
    }
    if (open == "id") {
      src += `${worksheetName} = sh.get_worksheet_by_id(${ID})`;
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        worksheetName,
        open,
        index,
        title,
        ID,
        docsUrl: DOCS_URL,
      });
    }
  }, [worksheetName, open, index, title, ID]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["worksheetName"] !== undefined)
        setWorksheetName(metadata["worksheetName"]);
      if (metadata["open"] !== undefined) setOpen(metadata["open"]);
      if (metadata["index"] !== undefined) setIndex(metadata["index"]);
      if (metadata["title"] !== undefined) setTitle(metadata["title"]);
      if (metadata["ID"] !== undefined) setID(metadata["ID"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ToolIcon}
        label={"Open worksheet"}
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
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose option"}
          option={open}
          options={openOptions}
          setOption={setOpen}
          tooltip={"Choose the variable you want to use to open the worksheet."}
        />
        {open == "index" && (
          <Numeric
            label={"Enter index"}
            name={index}
            setName={setIndex}
            tooltip={
              "Enter the index of the worksheet you want to open. (starts with 0)"
            }
            step={1}
            minValue={0}
          />
        )}
        {open == "title" && (
          <Variable
            label={"Enter title"}
            name={title}
            setName={setTitle}
            tooltip={"Enter the title of the worksheet you want to open."}
          />
        )}
        {open == "id" && (
          <Numeric
            label={"Enter ID"}
            name={ID}
            setName={setID}
            tooltip={"Enter the ID of the worksheet you want to open."}
          />
        )}
      </div>
    </div>
  );
};

export const OpenWorkSheetRecipe: IRecipe = {
  name: "Open worksheet",
  longName: "Open the Google Sheets worksheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to open and access worksheets in Google Sheets using Python and the gspread library. This recipe covers multiple methods for accessing worksheets, including by index, name, and ID. Follow these steps to efficiently manage and retrieve data from specific worksheets in your Google Sheets, enhancing your ability to automate and handle spreadsheet tasks programmatically.",
  shortDescription:
    "Learn how to open worksheets in Google Sheets using Python and the gspread library. This recipe covers accessing worksheets by index, name, and ID, enabling efficient data management and retrieval from your Google Sheets.",
  codeExplanation: `
  1. Open the worksheet`,
  ui: OpenWorkSheet,
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

export default OpenWorkSheetRecipe;
