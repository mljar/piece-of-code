import { IRecipeSet } from "../base";
import { PythonIcon } from "../../icons/Python";
import CheckPythonVersionRecipe from "./version";

export const PythonRecipes: IRecipeSet = {
    name: "Python",
    docsUrl: "python-snippets",
    description: "Collection of Python recipies.",
    Icon: PythonIcon,
    recipes: {
        [CheckPythonVersionRecipe.name]: CheckPythonVersionRecipe
    }
};
