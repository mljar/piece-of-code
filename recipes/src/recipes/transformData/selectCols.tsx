import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconTableColumn } from '@tabler/icons-react';


export const SelectCols: React.FC<IRecipeProps> = ({ }) => {
    return <div> Read file</div>;
  };
  

export const SelectColsRecipe: IRecipe = {
  name: "Select Columns",
  description: "Select columns from dataframe.",
  ui: SelectCols,
  // icon: IconTableColumn
};

export default SelectColsRecipe;