import { GlobeIcon } from "../../icons/Globe";
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
  Icon: GlobeIcon,
  recipes: {
    [GetRequestRecipe.name]: GetRequestRecipe,
  },
};

