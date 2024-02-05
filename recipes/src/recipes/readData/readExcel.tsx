import React from "react";

import { IRecipe, IRecipeProps } from "../base";
import { SpreadsheetIcon } from "../../icons/Spreadsheet";

export const ReadExcel: React.FC<IRecipeProps> = ({ }) => {
  return <div className="my-component"> Read file</div>;
};

export const ReadExcelRecipe: IRecipe = {
  name: "Read Excel",
  description: "Load Excel file into dataframe.",
  ui: ReadExcel,
  Icon: SpreadsheetIcon
};
