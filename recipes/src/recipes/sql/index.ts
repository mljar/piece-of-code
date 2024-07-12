import { QuestionMarkIcon } from "../../icons/QuestionMark";
import { IRecipeSet } from "../base";

import ConnectToDatabaseRecipe from "./connectToDatabase";
import { DefineNewConnectionRecipe } from "./defineNewConnection";
import SelectQueryRecipe from "./selectQuery";

export const SqlRecipes: IRecipeSet = {
    name: "Postgresql",
    longName: "Run sql queryies on Postgresql database usign python",
    docsUrl: "postgresql-query-python",
    //len: 180
    description: "Tool which allows you to define new Postgrasql database connection with credentials stored in .env file. Exqcute sql queries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE.",
    shortDescription: "Tool which allows you to define new Postgrasql database connection with credentials stored in .env file. Exqcute sql queries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE.",
    tags: ["python", "postgresql", "sql", "psycopg"],
    Icon: QuestionMarkIcon,
    recipes: {
        [DefineNewConnectionRecipe.name]: DefineNewConnectionRecipe,
        [ConnectToDatabaseRecipe.name]: ConnectToDatabaseRecipe,
        [SelectQueryRecipe.name]: SelectQueryRecipe,
    },
};
