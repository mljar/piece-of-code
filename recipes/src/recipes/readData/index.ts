import { IRecipeSet } from "../base";
// import { IconBook } from '@tabler/icons-react';

import { ReadCSVRecipe } from "./readCSV";
import { ReadExcelRecipe } from "./readExcel";

export const ReadDataRecipes: IRecipeSet = {
    name: "Read data",
    description: "Read data from file, url or database.",
    // icon: IconBook,
    recipes: [ReadCSVRecipe, ReadExcelRecipe],
};
