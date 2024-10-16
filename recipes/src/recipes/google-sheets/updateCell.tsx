import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";

import { SquareArrowUPIcon } from "../../icons/SquareArrowUp";

const DOCS_URL = "python-update-cell-google-sheets";

export const UpdateCell: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
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

  const [choice, setChoice] = useState("label");
  const choiceOptions = [
    ["Label", "label"],
    ["Row and Column Number", "address"],
  ] as [string, string][];
  const [label, setLabel] = useState("A2");
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);
  const [value, setValue] = useState("");
  const [string, setString] = useState(true);

  useEffect(() => {
    let src = ``;
    src += `# update cell value\n`;
    if (choice == "label") {
      if (string) {
        src += `${variable}.update_acell('${label}', '${value}')`;
      } else {
        src += `${variable}.update_acell('${label}', ${value})`;
      }
    }
    if (choice == "address") {
      if (string) {
        src += `${variable}.update_cell(${row}, ${col}, '${value}')`;
      } else {
        src += `${variable}.update_cell(${row}, ${col}, ${value})`;
      }
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        variable,
        choice,
        label,
        row,
        col,
        value,
        string,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [variable, choice, label, row, col, value, string]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["variable"] !== undefined) setVariable(metadata["variable"]);
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["label"] !== undefined) setLabel(metadata["label"]);
      if (metadata["row"] !== undefined) setRow(metadata["row"]);
      if (metadata["col"] !== undefined) setCol(metadata["col"]);
      if (metadata["value"] !== undefined) setValue(metadata["value"]);
      if (metadata["string"] !== undefined) setString(metadata["string"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SquareArrowUPIcon}
        label={"Update cell"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <Select
        label={"Choose worksheet"}
        option={variable}
        options={vars.map((d) => [d, d])}
        setOption={setVariable}
        tooltip={"Choose the worksheet you want to operate on."}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <div>
          <Select
            label={"Find cell using"}
            option={choice}
            options={choiceOptions}
            setOption={setChoice}
            tooltip={
              "Choose the method which you want to use to find the cell."
            }
          />
        </div>
        {choice == "label" && (
          <Variable
            label={"Enter cell label"}
            name={label}
            setName={setLabel}
            tooltip={"Enter the label of the cell you want to update."}
          />
        )}
        {choice == "address" && (
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Numeric
              label={"Enter row number"}
              name={row}
              setName={setRow}
              tooltip={"Enter the row number of the cell you want to update."}
            />
            <Numeric
              label={"Enter column number"}
              name={col}
              setName={setCol}
              tooltip={
                "Enter the column number of the cell you want to update."
              }
            />
          </div>
        )}
      </div>
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Variable
          label={"Enter value"}
          name={value}
          setName={setValue}
          tooltip={"Enter the value you want to set to the cell."}
        />
        <Toggle label={"Is that string?"} value={string} setValue={setString} />
      </div>
    </div>
  );
};

export const UpdateCellRecipe: IRecipe = {
  name: "Update cell",
  longName: "Update the cell value in Google Sheets using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to update cell values in Google Sheets using Python and the gspread library. This recipe demonstrates how to modify cell content by specifying the cell address directly and by using row and column coordinates. Whether you need to update a single cell, these methods will help you efficiently manage and automate your data updates in Google Sheets.",
  shortDescription:
    "Learn how to update cell values in Google Sheets using Python and the gspread library. This recipe covers updating a specific cell by its address and another by its row and column coordinates.",
  codeExplanation: `
  1. Update the cell with the given value.`,
  ui: UpdateCell,
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

export default UpdateCellRecipe;
