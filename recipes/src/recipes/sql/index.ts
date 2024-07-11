import { QuestionMarkIcon } from "../../icons/QuestionMark";
import { IRecipeSet } from "../base";

import ConnectToDatabaseRecipe from "./connectToDatabase";
import { DefineNewConnectionRecipe } from "./defineNewConnection";
import SelectQuerryRecipe from "./selectQuerry";

export const SqlRecipes: IRecipeSet = {
  name: "Sql",
  longName: "Run sql querryies usign python",
  docsUrl: "python-sql-querry",
  description: `Tool which allows you to define new database connection with credentials stored in .env file. Exqcute sql querries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE.`,
  shortDescription: "Tool which provides sql database functionality",
  tags: ["python", "sql"],
  Icon: QuestionMarkIcon,
  recipes: {
    [DefineNewConnectionRecipe.name]: DefineNewConnectionRecipe,
    [ConnectToDatabaseRecipe.name]: ConnectToDatabaseRecipe,
    [SelectQuerryRecipe.name]: SelectQuerryRecipe,
  },
};
