import { IRecipeSet } from "../base";

import { EditImageIcon } from "../../icons/EditImage";
import RembgRecipe from "./rembg";

export const RembgRecipes: IRecipeSet = {
  name: "Remove Background",
  longName: "Remove Background from images using Python",
  docsUrl: "python-ai-remove-background",
  description: `Tool which allows you to remove background from sigle image or all of the images located in given directory using Python and save them with extension of your choice(PNG, JPG, JPEG).`,
  shortDescription: "Tool which allows to remove background from images",
  tags: ["python", "remove-background"],
  Icon: EditImageIcon,
  recipes: {
    [RembgRecipe.name]: RembgRecipe,
  },
};
