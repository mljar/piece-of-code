import { IRecipeSet } from "./base";
import { ReadDataRecipes } from "./readData";
import { TransformDataRecipes } from "./transformData";
import { AutoMLRecipes } from "./automl";

export const allRecipes: Record<string, IRecipeSet> = {
    [ReadDataRecipes.name]: ReadDataRecipes,
    [TransformDataRecipes.name]: TransformDataRecipes,
    [AutoMLRecipes.name]: AutoMLRecipes
}
