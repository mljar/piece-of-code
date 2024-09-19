import { GetIcon } from "../../icons/httpGet";
import { IRecipeSet } from "../base";

import GetRequestRecipe from "./get";

export const HttpRequestRecipes: IRecipeSet = {
  name: "Http requests",
  longName: "Http requests",
  docsUrl: "",
  //len: 330
  description: "",
  //len: 176
  shortDescription: "",
  tags: ["http"],
  Icon: GetIcon,
  recipes: {
    [GetRequestRecipe.name]: GetRequestRecipe,
  },
};

