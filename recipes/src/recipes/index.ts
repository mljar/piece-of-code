import { IRecipeSet } from "./base";
import { PythonRecipes } from "./python";
import { MarkdownRecipes } from "./markdown";
import { ReadDataRecipes } from "./readData";
import { WriteDataRecipes } from "./writeData";
import { DataWranglingRecipes } from "./wrangling";
import { ChartsRecipes } from "./charts";
import { MLRecipes } from "./ml";
import { AutoMLRecipes } from "./automl";
import { WidgetsRecipes } from "./widgets";

export const allRecipes: Record<string, IRecipeSet> = {
    // [PythonRecipes.name]: PythonRecipes,
    // [MarkdownRecipes.name]: MarkdownRecipes,
    [ReadDataRecipes.name]: ReadDataRecipes,
    // [WriteDataRecipes.name]: WriteDataRecipes,
    [DataWranglingRecipes.name]: DataWranglingRecipes,
    // [ChartsRecipes.name]: ChartsRecipes,
    // [MLRecipes.name]: MLRecipes,
    [AutoMLRecipes.name]: AutoMLRecipes,
    // [WidgetsRecipes.name]: WidgetsRecipes,
}

export const urlList = Object.entries(allRecipes).map((objs) => {
    const name = objs[0];
    const recipeSet = objs[1];
    let recipeUrls = Object.entries(recipeSet.recipes).map((rs) => {
      const recipe = rs[1];
      return {
        name: recipe.name,
        docsUrl: recipe.docsUrl,
        parentName: recipe.parentName,
        description: recipe.description.split(' ').splice(0, 40).join(' '),
      };
    });
    recipeUrls.unshift({
      name,
      docsUrl: recipeSet.docsUrl,
      parentName: '',
      description: recipeSet.description.split(' ').splice(0, 40).join(' '),
    });
    return recipeUrls;
  });
