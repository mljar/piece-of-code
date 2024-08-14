import React, { useEffect, useState, useSyncExternalStore } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";

import { SquareArrowUPIcon } from "../../icons/SquareArrowUp";

const DOCS_URL = "python-update-data-google-sheets";

export const UpdateRange: React.FC<IRecipeProps> = ({
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
  const [range, setRange] = useState("A2:C7");
  const [choice, setChoice] = useState("same");
  const choiceOptions = [
    ["The Same Value Everywhere", "same"],
    ["Values from List", "list"],
  ] as [string, string][];
  const [value, setValue] = useState("");
  const [string, setString] = useState(true);
  const [list, setList] = useState("");

  useEffect(() => {
    let src = `# define range\n`;
    src += `cell_list = ${variable}.range('${range}')\n\n`
    src += `# set new values\n`;
    if (choice == "same") {
        src += `for cell in cell_list:\n`;
        if (string) {
            src += `    cell.value = "${value}"\n\n`;
        } else {
            src += `    cell.value = ${value}\n\n`;
        }
    }
    if (choice == "list") {
        src += `x=0\n`;
        src += `for cell in cell_list:\n`;
        src += `    cell.value = ${list}[x]\n`;
        src += `    x=x+1\n\n`;
    }
    src += `# update worksheet\n`;
    src += `${variable}.update_cells(cell_list)`

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        variable,
        range,
        choice,
        value,
        string,
        list,
        docsUrl: DOCS_URL,
      });
    }
  }, [variable, range, choice, value, string, list]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["variable"] !== undefined) setVariable(metadata["variable"]);
      if (metadata["range"] !== undefined) setRange(metadata["range"]);
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["value"] !== undefined) setValue(metadata["value"]);
      if (metadata["string"] !== undefined) setString(metadata["string"]);
      if (metadata["list"] !== undefined) setList(metadata["list"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SquareArrowUPIcon}
        label={"Update Range"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Select
        label={"Choose Worksheet"}
        option={variable}
        options={vars.map((d) => [d, d])}
        setOption={setVariable}
        tooltip={"Choose the worksheet you want to operate on."}
      />
      <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-2">
        <Variable
          label={"Set range"}
          name={range}
          setName={setRange}
          tooltip={"Set the range of operation in A1 notation."}
        />
        <Select
          label={"Choose value source"}
          option={choice}
          options={choiceOptions}
          setOption={setChoice}
          tooltip={
            "Choose the value source from which you want to place values in cells."
          }
        />
        {choice == "same" && (
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Variable
              label={"Enter value"}
              name={value}
              setName={setValue}
              tooltip={
                "Enter the value you want to place in each cell of the range."
              }
            />
            <Toggle
              label={"Is that string?"}
              value={string}
              setValue={setString}
            />
          </div>
        )}
        {choice == "list" && (
          <Variable
            label={"Enter list name"}
            name={list}
            setName={setList}
            tooltip={
              "Enter the list name from which you want to place values in cells. The list must have at least the same amount of elements as the range."
            }
          />
        )}
      </div>
    </div>
  );
};

export const UpdateRangeRecipe: IRecipe = {
  name: "Update Range",
  longName: "Update data in the range in Google Sheets using Python",
  parentName: "Google Sheets",
  description: "Learn how to update a range of cells in Google Sheets using Python and the gspread library. This guide covers defining a cell range, setting new values for those cells—either from a list or with a single value—and then updating the entire range in the worksheet. Perfect for efficiently managing and automating your spreadsheet data.",
  shortDescription: "Learn how to update a range of cells in Google Sheets using Python and gspread. This guide shows how to set new values for a specified range and update the worksheet with those values efficiently.",
  codeExplanation: `
  1. Define the range of cells to update.
  2. Create the loop which goes through each cell and sets values.
  3. Update the worksheet with new values.`,
  ui: UpdateRange,
  Icon: SquareArrowUPIcon,
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

export default UpdateRangeRecipe;
