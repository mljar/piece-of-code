import { IRecipeSet } from "../base";
import { TrainRecipe } from "./train";
import { PredictRecipe } from "./predict";
import { AutoMLReportRecipe } from "./report";
import { LoadAutoMLRecipe } from "./load";
import { RobotIcon } from "../../icons/Robot";

export const AutoMLRecipes: IRecipeSet = {
  name: "MLJAR AutoML",
  docsUrl: "mljar-automl",
  description: "Use MLJAR AutoML to train ML pipeline on tabular data.",
  Icon: RobotIcon,
  recipes: {
    [TrainRecipe.name]: TrainRecipe,
    [PredictRecipe.name]: PredictRecipe,
    [AutoMLReportRecipe.name]: AutoMLReportRecipe,
    [LoadAutoMLRecipe.name]: LoadAutoMLRecipe,
  }
};
