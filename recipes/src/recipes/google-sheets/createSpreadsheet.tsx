import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { GOOGLE_CONNECTION } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";

const DOCS_URL = "create-spreadsheet-python";

export const CreateSpreadSheet: React.FC<IRecipeProps> = ({
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

  const [title, setTitle] = useState("");
  const [varName, setVarName] = useState("sh");

  useEffect(() => {
    let src = ``;
    src += `# create spreadsheet\n`;
    src += `${varName} = gc.create('${title}')`;

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        title,
        varName,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [title, varName]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["title"] !== undefined) setTitle(metadata["title"]);
      if (metadata["varName"] !== undefined) setVarName(metadata["varName"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SpreadsheetIcon}
        label={"Create spreadsheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Variable
          label={"Enter spreadsheet name"}
          name={varName}
          setName={setVarName}
          tooltip={
            "Enter the name of the variable to which the spreadsheet will be assigned."
          }
        />
        <Variable
          label={"Enter title"}
          name={title}
          setName={setTitle}
          tooltip={"Enter the title of the spreadsheet you want to create."}
        />
      </div>
    </div>
  );
};

export const CreateSpreadSheetRecipe: IRecipe = {
  name: "Create spreadsheet",
  longName: "Create the Google Sheets spreadsheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to create a new Google Sheet using Python and the gspread library. This recipe covers the steps to authenticate with Google, create a new spreadsheet with a specified name, and access it programmatically. Follow these steps to efficiently manage and automate your Google Sheets tasks directly from your Python applications.",
  shortDescription:
    "Learn how to create a new Google Sheet using Python and the gspread library. This recipe covers the steps to authenticate with Google, create a new spreadsheet, and access it programmatically.",
  codeExplanation: `
  1. Create the spreadsheet.`,
  ui: CreateSpreadSheet,
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

export default CreateSpreadSheetRecipe;
