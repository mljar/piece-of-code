import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconBorderHorizontal } from '@tabler/icons-react';


export const SplitData: React.FC<IRecipeProps> = ({ }) => {
    return <div> Split data</div>;
  };
  

export const SplitDataRecipe: IRecipe = {
  name: "Split data",
  description: "Split data",
  ui: SplitData,
  // icon: IconBorderHorizontal
};

export default SplitDataRecipe;

