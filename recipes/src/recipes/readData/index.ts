import { OpenBookIcon } from "../../icons/OpenBook";
import { IRecipeSet } from "../base";


import { ReadCSVRecipe } from "./readCSV";
import { ReadExcelRecipe } from "./readExcel";

export const ReadDataRecipes: IRecipeSet = {
    name: "Read data",
    description: "Collection of recipies to load data from external sources into your program. You can read data from file, url or database.",
    Icon: OpenBookIcon,
    recipes: {
        [ReadCSVRecipe.name]: ReadCSVRecipe, 
        [ReadExcelRecipe.name]: ReadExcelRecipe,
    }
};
