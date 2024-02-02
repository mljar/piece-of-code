import { IRecipeSet } from "./base";
import { ReadDataRecipes } from "./readData";
import { TransformDataRecipes } from "./transformData";
import { AutoMLRecipes } from "./automl";

const allRecipes: IRecipeSet[] = [ReadDataRecipes, TransformDataRecipes, AutoMLRecipes]
