import { IRecipeSet } from "../base";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";

import { APIConRecipe } from "./apiConnection";
import { OpenSpreadSheetRecipe } from "./openSpreadsheet";
import { CreateSpreadSheetRecipe } from "./createSpreadsheet";
import { DeleteSpreadSheetRecipe } from "./deleteSpreadsheet";
import { ShareSpreadSheetRecipe } from "./shareSpreadsheet";
import { OpenWorkSheetRecipe } from "./openWorksheet";
import { CreateWorkSheetRecipe } from "./createWorksheet";
import { DeleteWorkSheetRecipe } from "./deleteWorksheet";
import { ReadSheetsRecipe} from "./reading";
import { FindCellRecipe } from "./findCell";
import { AppendRowRecipe } from "./appendRow";
import { UpdateCellRecipe } from "./updateCell";
import { UpdateRangeRecipe } from "./updateRange";

export const GoogleSheetsRecipes: IRecipeSet = {
  name: "Google Sheets",
  longName: "Python code recipes for operations in Google Sheets",
  docsUrl: "python-google-sheets",
  description: "Discover how to integrate Google Sheets with Python in this comprehensive guide seamlessly. Learn to efficiently manage and manipulate data, and significantly enhance productivity. This article provides practical examples and easy-to-follow instructions, making it perfect for both beginners and advanced users looking to optimize their workflow.",
  shortDescription: "Discover how to integrate Google Sheets with Python. Learn to automate tasks, manage data, and enhance your productivity with practical examples and easy-to-follow instructions.",
  tags: ["python", "google-sheets"],
  Icon: SpreadsheetIcon,
  recipes: {
    [APIConRecipe.name]: APIConRecipe,
    [OpenSpreadSheetRecipe.name]: OpenSpreadSheetRecipe,
    [CreateSpreadSheetRecipe.name]: CreateSpreadSheetRecipe,
    [DeleteSpreadSheetRecipe.name]: DeleteSpreadSheetRecipe,
    [ShareSpreadSheetRecipe.name]: ShareSpreadSheetRecipe,
    [OpenWorkSheetRecipe.name]: OpenWorkSheetRecipe,
    [CreateWorkSheetRecipe.name]: CreateWorkSheetRecipe,
    [DeleteWorkSheetRecipe.name]: DeleteWorkSheetRecipe,
    [ReadSheetsRecipe.name]: ReadSheetsRecipe,
    [FindCellRecipe.name]: FindCellRecipe,
    [AppendRowRecipe.name]: AppendRowRecipe,
    [UpdateCellRecipe.name]: UpdateCellRecipe,
    [UpdateRangeRecipe.name]: UpdateRangeRecipe,
  },
};