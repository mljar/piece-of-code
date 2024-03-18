import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconTableRow } from '@tabler/ikcons-react';


export const SelectRows: React.FC<IRecipeProps> = ({ }) => {
    return <div> Select rows</div>;
  };
  

export const SelectRowsRecipe: IRecipe = {
  name: "Select Rows",
  longName: "Select rows from Pandas DataFrame",
  parentName: "Data wrangling",
  description: "Select rows from dataframe.",
  codeExplanation: "",
  ui: SelectRows,
  docsUrl: "python-select-rows-pandas-dataframe"
  // icon: IconTableRow
};

export default SelectRowsRecipe;