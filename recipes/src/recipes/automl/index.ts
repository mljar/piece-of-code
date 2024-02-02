import { IRecipeSet } from "../base";
// import { IconTransform } from '@tabler/icons-react';

import { TrainRecipe } from "./train";
import { PredictRecipe } from "./predict";

export const AutoMLRecipes: IRecipeSet = {
  name: "AutoML",
  description: "AutoML",
  // icon: IconTransform,
  recipes: [TrainRecipe, PredictRecipe],
};
