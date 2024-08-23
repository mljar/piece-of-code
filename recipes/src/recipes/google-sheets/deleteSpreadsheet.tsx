import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { GOOGLE_CONNECTION } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";

const DOCS_URL = "python-delete-spreadsheet";

export const DeleteSpreadSheet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  const vars = variables.filter((v) => v.varType.includes(GOOGLE_CONNECTION));

  if (variablesStatus === "loaded" && !vars.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There is no API connection in your notebook. Please create an API
          connection. You can use the Connection recipe.
        </p>
      </div>
    );
  }

  const [ID, setID] = useState("");

  useEffect(() => {
    let src = ``;
    src += `# delete spreadsheet\n`;
    src += `gc.del_spreadsheet('${ID}')`;

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        ID,
        docsUrl: DOCS_URL,
      });
    }
  }, [ID]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["ID"] !== undefined) setID(metadata["ID"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SpreadsheetIcon}
        label={"Delete spreadsheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Enter id"}
        name={ID}
        setName={setID}
        tooltip={"Enter the id of the spreadsheet you want to delete."}
      />
    </div>
  );
};

export const DeleteSpreadSheetRecipe: IRecipe = {
  name: "Delete spreadsheet",
  longName: "Delete the Google Sheets spreadsheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to delete a Google Sheet using Python and the gspread library. This recipe covers the steps to authenticate with Google and delete a specified spreadsheet programmatically. Follow these instructions to efficiently manage and automate the deletion of Google Sheets directly from your Python applications, ensuring proper handling and removal of unwanted documents.",
  shortDescription:
    "Learn how to delete a Google Sheet using Python and the gspread library. This recipe covers the steps to authenticate with Google and delete a specified spreadsheet programmatically.",
  codeExplanation: `
  1. Delete the spreadsheet.`,
  ui: DeleteSpreadSheet,
  Icon: SpreadsheetIcon,
  requiredPackages: [
    { importName: "gspread", installationName: "gspread", version: ">=6.1.2" },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "gc",
      varType: GOOGLE_CONNECTION,
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

export default DeleteSpreadSheetRecipe;
