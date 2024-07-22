import { IRecipeSet } from "./base";
import { PythonRecipes } from "./python";
import { MarkdownRecipes } from "./markdown";
import { ReadDataRecipes } from "./readData";
import { WriteDataRecipes } from "./writeData";
import { DataWranglingRecipes } from "./wrangling";
// import { ChartsRecipes } from "./charts";
// import { MLRecipes } from "./ml";
import { MatplotlibRecipes } from "./matplotlib";
import { ScikitLearnRecipes } from "./scikitLearn";
import { AutoMLRecipes } from "./automl";
import { ImagesOperationsRecipes } from "./images-operations";
import { PostgresqlRecipes } from "./postgresql";
import { OpenAIRecipes } from "./open-ai"

// import { WidgetsRecipes } from "./widgets";

export const allRecipes: Record<string, IRecipeSet> = {
  [PythonRecipes.name]: PythonRecipes,
  [MarkdownRecipes.name]: MarkdownRecipes,
  [ReadDataRecipes.name]: ReadDataRecipes,
  [WriteDataRecipes.name]: WriteDataRecipes,
  [PostgresqlRecipes.name]: PostgresqlRecipes,
  [DataWranglingRecipes.name]: DataWranglingRecipes,
  // [ChartsRecipes.name]: ChartsRecipes,
  // [MLRecipes.name]: MLRecipes,
  [MatplotlibRecipes.name]: MatplotlibRecipes,
  [ScikitLearnRecipes.name]: ScikitLearnRecipes,
  [AutoMLRecipes.name]: AutoMLRecipes,
  [ImagesOperationsRecipes.name]: ImagesOperationsRecipes,
  [OpenAIRecipes.name]: OpenAIRecipes,
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
      tags: recipe.tags === undefined ? "" : recipe.tags?.join(","),
      packages: recipe.requiredPackages === undefined ? "" : recipe.requiredPackages?.map(p => `${p.installationName}${p.version}`).join(","),
      variables: recipe.defaultVariables === undefined ? "" : recipe.defaultVariables?.map(v => `${v.varName}@${v.varType}`).join(","),
      code: "",
      codeExplanation: recipe.codeExplanation,
    };
  });
  recipeUrls.unshift({
    name,
    longName: recipeSet.longName,
    docsUrl: recipeSet.docsUrl,
    parentName: '',
    description: recipeSet.description,
    shortDescription: recipeSet.shortDescription,
    tags: recipeSet.tags === undefined ? "" : recipeSet.tags?.join(","),
    packages: "",
    variables: "",
    code: "",
    codeExplanation: "",
  });
  return recipeUrls;
}).flat();

// do we have duplicates in urlList ?

import axios from "axios";
if (process.env.STORYBOOK_UPDATE_DB) {
  console.info("Update server data");
  console.info(urlList);
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
