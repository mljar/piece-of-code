import { IRecipeSet } from "../base";
import { TrainRecipe } from "./train";
import { PredictRecipe } from "./predict";
import { AutoMLReportRecipe } from "./report";
import { LoadAutoMLRecipe } from "./load";
import { RobotIcon } from "../../icons/Robot";

export const AutoMLRecipes: IRecipeSet = {
  name: "MLJAR AutoML",
  longName: "AutoML in Python",
  docsUrl: "python-automl",
  description: "Use MLJAR AutoML to train Machine Learning pipeline on tabular data.",
  shortDescription: "Train MLJAR AutoML in Python with no-code.",
  tags: ["automl", "mljar"],
  Icon: RobotIcon,
  recipes: {
    [TrainRecipe.name]: TrainRecipe,
    [PredictRecipe.name]: PredictRecipe,
    [AutoMLReportRecipe.name]: AutoMLReportRecipe,
    [LoadAutoMLRecipe.name]: LoadAutoMLRecipe,
  }
};
