import { IRecipeSet } from "../base";
import { PythonIcon } from "../../icons/Python";
import CheckPythonVersionRecipe from "./version";
import CurrentTimeRecipe from "./currentTime";
import FileExistsRecipe from "./fileExists";
import FileReadRecipe from "./fileRead";
import FileWriteRecipe from "./fileWrite";
import FileAppendRecipe from "./fileAppend";
import ReadJSONRecipe from "./readJSON";
import WriteJSONRecipe from "./writeJSON";
import PrettyPrintJSONRecipe from "./prettyPrintJSON";
import RandomIntegerRecipe from "./randomInteger";
import CurrentDirectoryRecipe from "./currentDirectory";
import TimeDelayRecipe from "./timeDelay";

export const PythonRecipes: IRecipeSet = {
    name: "Python",
    longName: "Python code snippets",
    docsUrl: "python-snippets",
    description: "Collection of Python code recipies.",
    shortDescription: "Collection of Python code recipes.",
    tags: ["python", "snippets", "file", "json", "random"],
    Icon: PythonIcon,
    recipes: {
        [CheckPythonVersionRecipe.name]: CheckPythonVersionRecipe,
        [CurrentTimeRecipe.name]: CurrentTimeRecipe,
        [CurrentDirectoryRecipe.name]: CurrentDirectoryRecipe,
        [RandomIntegerRecipe.name]: RandomIntegerRecipe,
        [TimeDelayRecipe.name]: TimeDelayRecipe,
        [FileExistsRecipe.name]: FileExistsRecipe,
        [FileReadRecipe.name]: FileReadRecipe,
        [FileWriteRecipe.name]: FileWriteRecipe,
        [FileAppendRecipe.name]: FileAppendRecipe,
        [ReadJSONRecipe.name]: ReadJSONRecipe,
        [WriteJSONRecipe.name]: WriteJSONRecipe,
        [PrettyPrintJSONRecipe.name]: PrettyPrintJSONRecipe,
    }
};
