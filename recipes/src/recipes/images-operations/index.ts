import { IRecipeSet } from "../base";

import { EditImageIcon } from "../../icons/EditImage";
import SingleImageRecipe from "./singleRmBackground";
import ShowImageRecipe from "./showImage";
import MultiImagesRecipe from "./multiRmBackground";

export const ImagesOperationsRecipes: IRecipeSet = {
  name: "Images Operations",
  longName: "Python images operations using AI",
  docsUrl: "image-operation",
  description: `Python image operations are much easier when you use AI. Removing background from the single image or all images in the given directory with any extension and displaying them in Jupyter Notebook.`,
  shortDescription: "Python image operations are much easier when you use AI. Removing background from the single image or all images in the given directory with any extension and displaying them in Jupyter Notebook.",
  tags: ["python", "remove-background", "show-images"],
  Icon: EditImageIcon,
  recipes: {
    [SingleImageRecipe.name]: SingleImageRecipe,
    [MultiImagesRecipe.name]: MultiImagesRecipe,
    [ShowImageRecipe.name]: ShowImageRecipe,
  },
};
