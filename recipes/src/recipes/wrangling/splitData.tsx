import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconBorderHorizontal } from '@tabler/icons-react';


export const SplitData: React.FC<IRecipeProps> = ({ }) => {
    return <div> Split data</div>;
  };
  

export const SplitDataRecipe: IRecipe = {
  name: "Split data",
  longName: "Split dataset to train and test",
  parentName: "Data wrangling",
  description: "Split data",
  shortDescription: "Split data",
  codeExplanation: "",
  ui: SplitData,
  docsUrl: "python-split-data-train-test",
  // icon: IconBorderHorizontal
};

export default SplitDataRecipe;

