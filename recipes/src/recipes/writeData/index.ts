import { FilePencilIcon } from "../../icons/FilePencil";
import { IRecipeSet } from "../base";


import { WriteCSVRecipe } from "./writeCSV";

export const WriteDataRecipes: IRecipeSet = {
    name: "Write data",
    description: "Collection of recipies to save your data into files.",
    Icon: FilePencilIcon,
    recipes: {
        [WriteCSVRecipe.name]: WriteCSVRecipe,
    }
};
