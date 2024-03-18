import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconTableColumn } from '@tabler/icons-react';


export const SelectCols: React.FC<IRecipeProps> = ({ }) => {
    return <div> Read file</div>;
  };
  

export const SelectColsRecipe: IRecipe = {
  name: "Select Columns",
  longName: "Select columns from Pandas DataFrame",
  parentName: "Data wrangling",
  description: "Select columns from dataframe.",
  ui: SelectCols,
  codeExplanation: "",
  // icon: IconTableColumn
  docsUrl: "python-select-columns-pandas-data-frame"
};

export default SelectColsRecipe;