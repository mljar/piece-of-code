import { IRecipeSet } from "../base";

import { OllamaIcon } from "../../icons/Ollama";
import ChatRecipe from "./chat";


export const OllamaRecipes: IRecipeSet = {
  name: "Ollama",
  longName: "Python code recipes for Ollama",
  docsUrl: "ollama-python",
  description: "", // description is missing
  shortDescription: "", // shortdescription is missing 
  tags: ["python", "ollama"],
  Icon: OllamaIcon, // icon is missing 
  recipes: {
    [ChatRecipe.name]: ChatRecipe,
  },
};
