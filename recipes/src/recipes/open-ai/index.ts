import { IRecipeSet } from "../base";

import { OpenAIIcon } from "../../icons/OpenAI";
import ImageGenRecipe from "./imageGen";
import ClientRecipe from "./clientOpenAI";
import ChatComplRecipe from "./chatCompletions";

export const OpenAIRecipes: IRecipeSet = {
  name: "OpenAI",
  longName: "Make things easier with OpenAI",
  docsUrl: "open-ai",
  description: "Doing operations with AI help has never been that easy! You can generate images, voices, text, and much more. All you need is an API KEY from OpenAI and MLJAR STUDIO will do the rest.",
  shortDescription: "Doing operations with AI help has never been that easy! You can generate images, voices, text, and much more. All you need is an API KEY from OpenAI and MLJAR STUDIO will do the rest.",
  tags: ["python", "ai-image"],
  Icon: OpenAIIcon,
  recipes: {
    [ClientRecipe.name]: ClientRecipe,
    [ImageGenRecipe.name]: ImageGenRecipe,
    [ChatComplRecipe.name]: ChatComplRecipe,
  },
};
