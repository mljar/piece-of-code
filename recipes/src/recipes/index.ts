import { IRecipeSet } from "./base";
import { PythonRecipes } from "./python";
import { MarkdownRecipes } from "./markdown";
import { ReadDataRecipes } from "./readData";
import { WriteDataRecipes } from "./writeData";
import { TransformDataRecipes } from "./transformData";
import { ChartsRecipes } from "./charts";
import { MLRecipes } from "./ml";
import { AutoMLRecipes } from "./automl";
import { WidgetsRecipes } from "./widgets";

export const allRecipes: Record<string, IRecipeSet> = {
    // [PythonRecipes.name]: PythonRecipes,
    // [MarkdownRecipes.name]: MarkdownRecipes,
    [ReadDataRecipes.name]: ReadDataRecipes,
    // [WriteDataRecipes.name]: WriteDataRecipes,
    [TransformDataRecipes.name]: TransformDataRecipes,
    // [ChartsRecipes.name]: ChartsRecipes,
    // [MLRecipes.name]: MLRecipes,
    [AutoMLRecipes.name]: AutoMLRecipes,
    // [WidgetsRecipes.name]: WidgetsRecipes,
}
