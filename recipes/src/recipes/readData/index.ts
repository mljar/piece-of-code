import { OpenBookIcon } from "../../icons/OpenBook";
import { IRecipeSet } from "../base";


import { ReadCSVRecipe } from "./readCSV";
import { ReadExcelRecipe } from "./readExcel";
import { ExampleDataRecipe } from "./exampleData";

export const ReadDataRecipes: IRecipeSet = {
    name: "Read data",
    docsUrl: "read-data",
    description: "Collection of recipies to load data from external sources into your program. You can read data from file, url or database.",
    Icon: OpenBookIcon,
    recipes: {
        [ExampleDataRecipe.name]: ExampleDataRecipe,
        [ReadCSVRecipe.name]: ReadCSVRecipe,
        // [ReadExcelRecipe.name]: ReadExcelRecipe,
    }
};
