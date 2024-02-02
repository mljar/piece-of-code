import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconBarbell } from '@tabler/icons-react';

export const Train: React.FC<IRecipeProps> = ({}) => {
  return (
    <div>
      {/* <IconBarbell /> */}
      Read file
    </div>
  );
};

export const TrainRecipe: IRecipe = {
  name: "Train AutoML",
  description: "Train AutoML.",
  ui: Train,
  // icon: IconBarbell
};
