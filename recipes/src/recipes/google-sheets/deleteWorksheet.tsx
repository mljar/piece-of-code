import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SPREADSHEET, WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";

import { ToolIcon } from "../../icons/Tool";

const DOCS_URL = "delete-worksheet-python";

export const DeleteWorkSheet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  const varsW = variables
    .filter((v) => v.varType.includes(WORKSHEET))
    .map((v) => v.varName);
  const [worksheet, setWorksheet] = useState(
    varsW.length > 0 ? varsW[0] : ""
  );

  const varsS = variables
    .filter((v) => v.varType.includes(SPREADSHEET))
    .map((v) => v.varName);
  const [spreadsheet, setSpreadsheet] = useState(
    varsS.length > 0 ? varsS[0] : ""
  );

  if (variablesStatus === "loaded" && !varsS.length) {
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

  useEffect(() => {
    let src = ``;
    src += `# delete worksheet\n`;
    src += `${spreadsheet}.del_worksheet(${worksheet})`

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        worksheet,
        spreadsheet,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [worksheet, spreadsheet]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["worksheet"] !== undefined)
        setWorksheet(metadata["worksheet"]);
      if (metadata["spreadsheet"] !== undefined)
        setSpreadsheet(metadata["spreadsheet"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ToolIcon}
        label={"Delete worksheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
      <Select
          label={"Choose spreadsheet"}
          option={spreadsheet}
          options={varsS.map((d) => [d, d])}
          setOption={setSpreadsheet}
          tooltip={
            "Choose the spreadsheet where the worksheet you want to delete is located."
          }
        />
        <Select
          label={"Choose worksheet"}
          option={worksheet}
          options={varsW.map((d) => [d, d])}
          setOption={setWorksheet}
          tooltip={
            "Choose the worksheet you want to delete."
          }
        />
      </div>
    </div>
  );
};

export const DeleteWorkSheetRecipe: IRecipe = {
  name: "Delete worksheet",
  longName: "Delete the Google Sheets worksheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to delete a worksheet from a Google Sheets document using Python and the gspread library. This recipe walks you through the steps to identify and remove a specific worksheet, ensuring efficient management of your Google Sheets data. Whether you're automating tasks or cleaning up your spreadsheets, this method makes it easy to keep your documents organized.",
  shortDescription:
    "Learn how to delete a worksheet in Google Sheets using Python and gspread. This recipe demonstrates the process of removing a specified worksheet from a Google Sheets document efficiently.",
  codeExplanation: `
  1. Delete the worksheet.`,
  ui: DeleteWorkSheet,
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
    {
      varName: "worksheet",
      varType: WORKSHEET,
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

export default DeleteWorkSheetRecipe;
