import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconFileSpreadsheet } from '@tabler/icons-react';


export const ReadExcel: React.FC<IRecipeProps> = ({ }) => {
  return <div className="my-component"> Read file</div>;
};

export const ReadExcelRecipe: IRecipe = {
  name: "Read Excel",
  description: "Load Excel file into dataframe.",
  ui: ReadExcel,
  // icon: IconFileSpreadsheet
};
