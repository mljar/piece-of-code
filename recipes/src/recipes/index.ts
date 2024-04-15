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
      longName: recipe.longName,
      docsUrl: recipe.docsUrl,
      parentName: recipe.parentName,
      description: recipe.description,
      shortDescription: recipe.shortDescription,
      tags: recipe.tags?.join(",")
    };
  });
  recipeUrls.unshift({
    name,
    longName: recipeSet.longName,
    docsUrl: recipeSet.docsUrl,
    parentName: '',
    description: recipeSet.description,
    shortDescription: recipeSet.shortDescription,
    tags: recipeSet.tags?.join(",")
  });
  return recipeUrls;
}).flat();

import axios from "axios";
if (process.env.STORYBOOK_UPDATE_DB) {
  console.log("Update server data");
  console.log(urlList);
  axios.post('https://licenses.mljar.com/api/set-recipes/', {
    apiKey: process.env.STORYBOOK_UPDATE_DB,
    recipes: urlList
  })
    .then(function (response: any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
}
