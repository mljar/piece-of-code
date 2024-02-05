import { IRecipeSet } from "../base";
import { TrainRecipe } from "./train";
import { PredictRecipe } from "./predict";
import { RobotIcon } from "../../icons/Robot";

export const AutoMLRecipes: IRecipeSet = {
  name: "MLJAR AutoML",
  description: "AutoML",
  Icon: RobotIcon,
  recipes: [TrainRecipe, PredictRecipe],
};
