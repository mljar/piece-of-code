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
  description: "MLJAR AutoML makes it easy to work with data in tables by automatically training and adjusting machine learning models. It handles data preparation, improves features, and provides clear reports and explanations for the models. You can get great results fast.",
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
