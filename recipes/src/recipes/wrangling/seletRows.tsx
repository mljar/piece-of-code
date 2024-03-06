import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconTableRow } from '@tabler/ikcons-react';


export const SelectRows: React.FC<IRecipeProps> = ({ }) => {
    return <div> Select rows</div>;
  };
  

export const SelectRowsRecipe: IRecipe = {
  name: "Select Rows",
  description: "Select rows from dataframe.",
  ui: SelectRows,
  // icon: IconTableRow
};

export default SelectRowsRecipe;