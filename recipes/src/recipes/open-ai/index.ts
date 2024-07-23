import { IRecipeSet } from "../base";

import { OpenAIIcon } from "../../icons/OpenAI";
import ImageGenRecipe from "./imageGen";
import ClientRecipe from "./clientOpenAI";
import ChatComplRecipe from "./chatCompletions";
import VisionLocalRecipe from "./visionLocal";

export const OpenAIRecipes: IRecipeSet = {
  name: "OpenAI",
  longName: "Python code recipes for OpenAI",
  docsUrl: "python-openai",
  description: "Doing operations with AI help has never been that easy! You can generate images, voices, text, and much more. All you need is an API KEY from OpenAI and MLJAR STUDIO will do the rest.",
  shortDescription: "Doing operations with AI help has never been that easy! You can generate images, voices, text, and much more. All you need is an API KEY from OpenAI and MLJAR STUDIO will do the rest.",
  tags: ["python", "ai-image"],
  Icon: OpenAIIcon,
  recipes: {
    [ClientRecipe.name]: ClientRecipe,
    [ImageGenRecipe.name]: ImageGenRecipe,
    [ChatComplRecipe.name]: ChatComplRecipe,
    [VisionLocalRecipe.name]: VisionLocalRecipe,
  },
};
