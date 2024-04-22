import { OpenBookIcon } from "../../icons/OpenBook";
import { IRecipeSet } from "../base";


import { ReadCSVRecipe } from "./readCSV";
import { ReadExcelRecipe } from "./readExcel";
import { ExampleDataRecipe } from "./exampleData";
import { ReadStataRecipe } from "./readStata";
import { ReadSpssRecipe } from "./readSpss";
import { ReadParquetRecipe } from "./readParquet";
import { ReadSasRecipe } from "./readSas";
import { ReadXmlRecipe } from "./readXml";
import { ReadHtmlRecipe } from "./readHtml";

export const ReadDataRecipes: IRecipeSet = {
    name: "Read data",
    longName: "Read data in Python",
    docsUrl: "read-data",
    description: `Collection of recipies to load data from external files into your program. Python can load files in many formats: CSV, XLS, XLSX, JSON and many more. 
    `,
    shortDescription: `Recipes to load data in Python`,
    tags: ["read-data", "pandas"],
    Icon: OpenBookIcon,
    recipes: {
        [ExampleDataRecipe.name]: ExampleDataRecipe,
        [ReadCSVRecipe.name]: ReadCSVRecipe,
        [ReadExcelRecipe.name]: ReadExcelRecipe,
        [ReadXmlRecipe.name]: ReadXmlRecipe,
        [ReadHtmlRecipe.name]: ReadHtmlRecipe,
        [ReadParquetRecipe.name]: ReadParquetRecipe,
        [ReadSpssRecipe.name]: ReadSpssRecipe,
        [ReadStataRecipe.name]: ReadStataRecipe,
        [ReadSasRecipe.name]: ReadSasRecipe,
    }
};
