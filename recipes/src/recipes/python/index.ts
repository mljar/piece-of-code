import { IRecipeSet } from "../base";
import { PythonIcon } from "../../icons/Python";
import CheckPythonVersionRecipe from "./version";

export const PythonRecipes: IRecipeSet = {
    name: "Python",
    longName: "Python code snippets",
    docsUrl: "python-snippets",
    description: "Collection of Python recipies.",
    shortDescription: "Collection of Python code recipes.",
    tags: ["python", "snippets"],
    Icon: PythonIcon,
    recipes: {
        [CheckPythonVersionRecipe.name]: CheckPythonVersionRecipe
    }
};
