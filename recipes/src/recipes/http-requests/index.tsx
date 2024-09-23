import { GlobeIcon } from "../../icons/Globe";
import { IRecipeSet } from "../base";
import GetRequestRecipe from "./get";
import DeleteRequestRecipe from "./delete";
import PostRequestRecipe from "./post";
import PutRequestRecipe from "./put";
import PatchRequestRecipe from "./patch";


export const HttpRequestRecipes: IRecipeSet = {
  name: "Http requests",
  longName: "Http requests",
  docsUrl: "python-http-request",
  //len: 184
  description: "An interface to send many different HTTP requests. Authenticate with encrypted methods, pass parameters into the requests, control timeout length, even pretty print your JSON response.",
  //len: 184
  shortDescription: "An interface to send many different HTTP requests. Authenticate with encrypted methods, pass parameters into the requests, control timeout length, even pretty print your JSON response.",
  tags: ["http", "requests", "python"],
  Icon: GlobeIcon,
  recipes: {
    [GetRequestRecipe.name]: GetRequestRecipe,
    [PutRequestRecipe.name]: PutRequestRecipe,
    [PostRequestRecipe.name]: PostRequestRecipe,
    [PatchRequestRecipe.name]: PatchRequestRecipe,
    [DeleteRequestRecipe.name]: DeleteRequestRecipe,
  },
};
