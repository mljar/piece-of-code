import { FilePencilIcon } from "../../icons/FilePencil";
import { IRecipeSet } from "../base";
import { SavePickleRecipe } from "./savePickle";
import { WriteCSVRecipe } from "./writeCSV";
import { WriteParquetRecipe } from "./writeParquet";

export const WriteDataRecipes: IRecipeSet = {
    name: "Write data",
    longName: "Write data in Python",
    docsUrl: "python-write-data",
    description: "Collection of code recipies to save your data into files. You can save DataFrames to file. You can save any Python object using Pickle module.",
    shortDescription: "Collection of code recipies to save your data into files. You can save DataFrames to file. You can save any Python object using Pickle module.",
    tags: ["write-data", "save-data", "pandas", "pickle", "parquet"],
    Icon: FilePencilIcon,
    recipes: {
        [WriteCSVRecipe.name]: WriteCSVRecipe,
        [WriteParquetRecipe.name]: WriteParquetRecipe,
        [SavePickleRecipe.name]: SavePickleRecipe,
    }
};
