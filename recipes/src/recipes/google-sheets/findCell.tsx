import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";

import { SearchIcon } from "../../icons/Search";

const DOCS_URL = "python-find-cell-by-value-google-sheets";

export const FindCell: React.FC<IRecipeProps> = ({
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
  const [choice, setChoice] = useState("single");
  const choiceOptions = [
    ["Find single cell", "single"],
    ["Find all cells", "all"],
  ] as [string, string][];
  const [text, setText] = useState("");

  useEffect(() => {
    let src = ``;
    if (choice == "single") {
      src += `# find and print cell location\n`;
      src += `try:\n`;
      src += `    cell = ${variable}.find("${text}")\n`;
      src += `    print(f"Found something at R{cell.row}C{cell.col}")\n`;
      src += `except AttributeError:\n`;
      src += `    print("Cell with that value doesn't exist.")`;
    }
    if (choice == "all") {
      src += `# find cells location\n`;
      src += `cell_list = ${variable}.findall("${text}")\n\n`;
      src += `# print result\n`;
      src += `if len(cell_list) != 0:\n`;
      src += `    print("Find something at:")\n`;
      src += `    for cell in cell_list:\n`;
      src += `        print(f"R{cell.row}C{cell.col}")\n`;
      src += `else:\n`;
      src += `    print("Cell with that value doesn't exist.")`;
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        variable,
        choice,
        text,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [variable, choice, text]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["variable"] !== undefined) setVariable(metadata["variable"]);
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SearchIcon}
        label={"Find cell by value"}
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
          tooltip={
            "Choose if you want to find single or all cells with given value."
          }
        />
        <Variable
          label={"Enter value"}
          name={text}
          setName={setText}
          tooltip={"Enter the value based on which you want to find the cells."}
        />
      </div>
    </div>
  );
};

export const FindCellRecipe: IRecipe = {
  name: "Find cell by value",
  longName: "Find cell by value in Google Sheets using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to efficiently search for specific values in Google Sheets using Python and the gspread library. This recipe covers finding single or all instances of a value within a worksheet, retrieving the matching cells, and printing their exact row and column locations. Perfect for automating data retrieval and analysis tasks in your Google Sheets projects.",
  shortDescription:
    "Discover how to search for specific values in Google Sheets using Python and the gspread library. This recipe covers finding single or all matching cells in a worksheet and printing their row and column locations.",
  codeExplanation: `
  1. Find the cells and save them as a variable.
  2. Print their location.`,
  ui: FindCell,
  Icon: SearchIcon,
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

export default FindCellRecipe;
