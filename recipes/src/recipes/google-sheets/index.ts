import { IRecipeSet } from "../base";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";

import { APIConRecipe } from "./apiConnection";
import { ReadSheetsRecipe } from "./reading";
import { OpenSpreadSheetRecipe } from "./openSpreadsheet";
import { CreateSpreadSheetRecipe } from "./createSpreadsheet";
import { ShareSpreadSheetRecipe } from "./shareSpreadsheet";

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
    [ShareSpreadSheetRecipe.name]: ShareSpreadSheetRecipe,
    [ReadSheetsRecipe.name]: ReadSheetsRecipe

  },
};