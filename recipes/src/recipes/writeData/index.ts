import { FilePencilIcon } from "../../icons/FilePencil";
import { IRecipeSet } from "../base";


import { ReadCSVRecipe } from "./writeCSV";

export const WriteDataRecipes: IRecipeSet = {
    name: "Write data",
    description: "Collection of recipies to save your data into files.",
    Icon: FilePencilIcon,
    recipes: {
        [ReadCSVRecipe.name]: ReadCSVRecipe, 
    }
};
