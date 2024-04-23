import { FilePencilIcon } from "../../icons/FilePencil";
import { IRecipeSet } from "../base";
import SavePickleRecipe from "./savePickle";


import { WriteCSVRecipe } from "./writeCSV";

export const WriteDataRecipes: IRecipeSet = {
    name: "Write data",
    longName: "Write data in Python",
    docsUrl: "python-write-data",
    description: "Collection of recipies to save your data into files.",
    shortDescription: "Write your results to hard drive",
    tags: ["write-data", "save-data", "pandas", "pickle"],
    Icon: FilePencilIcon,
    recipes: {
        [WriteCSVRecipe.name]: WriteCSVRecipe,
        [SavePickleRecipe.name]: SavePickleRecipe,
    }
};
