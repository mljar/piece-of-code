import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { WORKSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";

import { OpenBookIcon } from "../../icons/OpenBook";

const DOCS_URL = "python-read-from-google-sheets";

export const ReadSheets: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  variables,
  variablesStatus,
  setMetadata,
}) => {

  const vars = variables.filter((v) => v.varType.includes(WORKSHEET));

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

  const [choice, setChoice] = useState("cell");
  const choiceOptions = [
    ["Cell", "cell"],
    ["Row", "row"],
    ["Column", "column"],
    ["Worksheet", "worksheet"],
  ] as [string, string][];
  const [print, setPrint] = useState(true);
  const [address, setAddress] = useState("A2");
  const [format, setFormat] = useState("list");
  const formatOptions = [
    ["List of Lists", "list"],
    ["List of Dictionaries", "dict"],
  ] as [string, string][];
  const [row, setRow] = useState(1);
  const [col, setCol] = useState(1);

  useEffect(() => {
    let src = ``;
    if (choice == "cell") {
        src += `# get value from cell\n`;
        src += `cell = worksheet.acell('${address}').value\n\n`;
        if (print) {
            src += `# print cell value\n`;
            src += `print(cell)`;
        }
    }
    if (choice == "row") {
        src += `# get values from row\n`;
        src += `row =  worksheet.row_values(${row})\n\n`;
        if (print) {
            src += `# print row values\n`;
            src += `print(row)`;
        }
    }
    if (choice == "column") {
        src += `# get values from column\n`;
        src += `column = worksheet.col_values(${col})\n\n`;
        if (print) {
            src += `# print column values\n`;
            src += `print(column)`
        }
    }
    if (choice == "worksheet") {
        src += `# get all values from worksheet\n`;
        if (format == "list") {
            src += `worksheet_values = worksheet.get_all_values()\n\n`;
        } else {
            src += `worksheet_values = worksheet.get_all_records()\n\n`;
        }
        if (print) {
            src += `# print worksheet values\n`;
            src += `print(worksheet_values)`
        }
    }


    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        choice,
        print,
        address,
        format,
        row,
        col,
        docsUrl: DOCS_URL,
      });
    }
  }, [choice, print, address, format, row, col]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
      if (metadata["print"] !== undefined) setPrint(metadata["print"]);
      if (metadata["address"] !== undefined) setAddress(metadata["address"]);
      if (metadata["format"] !== undefined) setFormat(metadata["format"]);
      if (metadata["row"] !== undefined) setRow(metadata["row"]);
      if (metadata["col"] !== undefined) setCol(metadata["col"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={OpenBookIcon}
        label={"Read Data"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-2">
        <Select
          label={"What to read"}
          option={choice}
          options={choiceOptions}
          setOption={setChoice}
          tooltip={"Choose which element you want to read."}
        />
        {choice == "cell" && (
          <Variable
            label={"Enter cell address"}
            name={address}
            setName={setAddress}
            tooltip={
              "Enter the address of the cell in the worksheet e.g. 'A2'."
            }
          />
        )}
        {choice == "row" && (
          <Numeric
            label={"Row number"}
            name={row}
            setName={setRow}
            tooltip={"The number of the row which you want to read."}
          />
        )}
        {choice == "column" && (
          <Numeric
            label={"Column number"}
            name={col}
            setName={setCol}
            tooltip={"The number of the column which you want to read."}
          />
        )}
        {choice == "worksheet" && (
          <Select
            label={"Choose format"}
            option={format}
            options={formatOptions}
            setOption={setFormat}
            tooltip={"Choose in which format you want to read the worksheet."}
          />
        )}
        <Toggle label={"Print data"} value={print} setValue={setPrint} />
      </div>
    </div>
  );
};

export const ReadSheetsRecipe: IRecipe = {
  name: "Read Data",
  longName: "Read data from Google Sheets using Python",
  parentName: "Google Sheets",
  description: "Learn how to interact with Google Sheets using Python. This guide covers retrieving and printing cell, row, and column values, as well as fetching all values and records from a worksheet using gspread. Detailed steps include accessing specific cells, rows, columns, and extracting comprehensive data from the entire worksheet for efficient data manipulation and analysis.",
  shortDescription: "Learn how to interact with Google Sheets using Python. This guide covers getting and printing cell, row, and column values, as well as retrieving and printing all values and records from a worksheet using gspread.",
  codeExplanation: `
  1. Read the chosen element/elements. 
  2. Print the reading.`,
  ui: ReadSheets,
  Icon: OpenBookIcon,
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

export default ReadSheetsRecipe;