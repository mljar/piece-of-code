import { OpenBookIcon } from "../../icons/OpenBook";
import { IRecipeSet } from "../base";


import { ReadCSVRecipe } from "./readCSV";
import { ReadExcelRecipe } from "./readExcel";

export const ReadDataRecipes: IRecipeSet = {
    name: "Read data",
    description: "Read data from file, url or database.",
    Icon: OpenBookIcon,
    recipes: [ReadCSVRecipe, ReadExcelRecipe],
};
