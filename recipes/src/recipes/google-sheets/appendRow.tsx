import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";

import { TableAddIcon } from "../../icons/TableAdd";

const DOCS_URL = "python-data-append-google-sheets";

export const AppendRow: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  const vars = variables
    .filter((v) => v.varType.includes(WORKSHEET))
    .map((v) => v.varName);
  const [variable, setVariable] = useState(vars.length > 0 ? vars[0] : "");

  if (variablesStatus === "loaded" && !vars.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There is no declared Worksheet in your notebook. Please create or open
          the worksheet. You can use Create Worksheet or Open Worksheet recipes.
        </p>
      </div>
    );
  }

  const [choice, setChoice] = useState("row");
  const choiceOptions = [
    ["Append Single Row", "row"],
    ["Append Many Rows", "rows"],
  ] as [string, string][];
  const [list, setList] = useState("");
  const [listOfLists, setListOfLists] = useState("");

  useEffect(() => {
    let src = ``;
    if (choice == "row") {
      src += `# append row\n`;
      src += `${variable}.append_row(${list})`;
    }
    if (choice == "rows") {
      src += `# append rows\n`;
      src += `${variable}.append_rows(${listOfLists})`;
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        variable,
        choice,
        list,
        listOfLists,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [variable, choice, list, listOfLists]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["variable"] !== undefined) setVariable(metadata["variable"]);
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["list"] !== undefined) setList(metadata["list"]);
      if (metadata["listOfLists"] !== undefined)
        setListOfLists(metadata["listOfLists"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TableAddIcon}
        label={"Append rows"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Select
        label={"Choose Worksheet"}
        option={variable}
        options={vars.map((d) => [d, d])}
        setOption={setVariable}
        tooltip={"Choose the worksheet you want to operate on."}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose operation"}
          option={choice}
          options={choiceOptions}
          setOption={setChoice}
          tooltip={"Select the operation you want to perform."}
        />
        {choice == "row" && (
          <Variable
            label={"Enter list name"}
            name={list}
            setName={setList}
            tooltip={
              "Enter the name of the list with the data you want to append."
            }
          />
        )}
        {choice == "rows" && (
          <Variable
            label={"Enter list name"}
            name={listOfLists}
            setName={setListOfLists}
            tooltip={
              "Enter the name of the list with the data you want to append. In this case, it should be a list of lists."
            }
          />
        )}
      </div>
    </div>
  );
};

export const AppendRowRecipe: IRecipe = {
  name: "Append rows",
  longName: "Append rows with value in Google Sheets using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to efficiently add data to Google Sheets using Python and the gspread library. This recipe covers appending a single row or multiple rows to a worksheet, enabling you to automate data entry and updates in your spreadsheets. Whether you're adding new records or bulk data, these methods will help you manage your Google Sheets more effectively.",
  shortDescription:
    "Learn how to add data to Google Sheets using Python and the gspread library. This recipe covers appending a single row or multiple rows to a worksheet, helping you efficiently manage and update your spreadsheet.",
  codeExplanation: `
  1. Append rows with data from the list.`,
  ui: AppendRow,
  Icon: TableAddIcon,
  requiredPackages: [
    { importName: "gspread", installationName: "gspread", version: ">=6.1.2" },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [
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

export default AppendRowRecipe;
