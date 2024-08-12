import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SPREADSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
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

  const [choice, setChoice] = useState("var");
  const choiceOptions = [
    ["Variable Name", "var"],
    ["ID", "id"],
  ] as [string, string][];
  const [varName, setVarName] = useState("");
  const [ID, setID] = useState("");

  useEffect(() => {
    let src = ``;
    src += `# delete worksheet\n`;
    if (choice == "var") {
        src += `sh.del_worksheet(${varName})`;
    }
    if (choice == "id") {
        src += `sh.del_worksheet_by_id(${ID})`;
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        choice,
        varName,
        ID,
        docsUrl: DOCS_URL,
      });
    }
  }, [choice, varName, ID]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["varName"] !== undefined) setVarName(metadata["varName"]);
      if (metadata["ID"] !== undefined) setID(metadata["ID"]); 
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ToolIcon}
        label={"Delete Worksheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose delete option"}
          option={choice}
          options={choiceOptions}
          setOption={setChoice}
          tooltip={"Choose the option which you want to use to delete the worksheet."}
        />
        {choice == "var" && (
          <Variable
            label={"Enter var name"}
            name={varName}
            setName={setVarName}
            tooltip={"Enter the name of variable to which the worksheet is assigned."}
          />
        )}
        {choice == "id" && (
          <Variable 
            label={"Enter ID"} 
            name={ID} 
            setName={setID} 
            tooltip={"Enter the ID of the worksheet you want to delete"} 
          />
        )}
      </div>
    </div>
  );
};

export const DeleteWorkSheetRecipe: IRecipe = {
  name: "Delete Worksheet",
  longName: "Delete the Google Sheets worksheet using Python",
  parentName: "Google Sheets",
  description: "Learn how to delete worksheets in Google Sheets using Python and the gspread library. This guide covers the steps to remove a worksheet from a spreadsheet by index and by ID, allowing you to efficiently manage and organize your spreadsheet content. Follow these instructions to streamline your data management by programmatically deleting unnecessary worksheets.",
  shortDescription: "Learn how to delete a worksheet in Google Sheets using Python and the gspread library. This guide covers removing worksheets by index and by ID, helping you manage your spreadsheet content efficiently.",
  codeExplanation: `
  1. Deleet the worksheet`,
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
  ],
};

export default DeleteWorkSheetRecipe;
