import React from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SpreadsheetIcon } from "../../icons/Spreadsheet";

export const ReadExcel: React.FC<IRecipeProps> = ({}) => {
  return <div className="my-component"> Read file</div>;
};

export const ReadExcelRecipe: IRecipe = {
  name: "Read Excel",
  longName: "Read data from Excel file",
  parentName: "Read data",
  description: "Load Excel file into dataframe.",
  shortDescription: "Load Excel file into dataframe.",
  codeExplanation: "",
  ui: ReadExcel,
  Icon: SpreadsheetIcon,
};
