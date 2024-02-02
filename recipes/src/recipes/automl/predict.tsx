import React from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconCrystalBall } from "@tabler/icons-react";

export const Predict: React.FC<IRecipeProps> = ({}) => {
  return (
    <div>
      {/* <IconCrystalBall /> */}
      Read file
    </div>
  );
};

export const PredictRecipe: IRecipe = {
  name: "Predict with AutoML",
  description: "Predict with AutoML.",
  ui: Predict,
  // icon: IconCrystalBall,
};
