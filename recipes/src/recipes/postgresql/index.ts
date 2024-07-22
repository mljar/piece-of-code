import { PostgresqlIcon } from "../../icons/Postgresql";
import { IRecipeSet } from "../base";

import ConnectToDatabaseRecipe from "./connectToDatabase";
import CreateTableRecipe from "./createTable";
import { DefineNewConnectionRecipe } from "./defineNewConnection";
import DropTableRecipe from "./dropTable";
import InsertQueryRecipe from "./insertQuery";
import RawQueryRecipe from "./rawQuery";
import RawQueryToPandasRecipe from "./rawQueryToPandas";
import SelectQueryRecipe from "./selectQuery";
import ShowAllColumnsRecipe from "./showAllColumns";
import ShowAllTablesRecipe from "./showAllTables";

export const PostgresqlRecipes: IRecipeSet = {
    name: "Postgresql",
    longName: "Run sql queryies on Postgresql database usign python",
    docsUrl: "postgresql-query-python",
    //len: 180
    description: "Tool which allows you to define new Postgrasql database connection with credentials stored in .env file. Exqcute sql queries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE.",
    shortDescription: "Tool which allows you to define new Postgrasql database connection with credentials stored in .env file. Exqcute sql queries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE.",
    tags: ["python", "postgresql", "sql", "psycopg"],
    Icon: PostgresqlIcon,
    recipes: {
        [DefineNewConnectionRecipe.name]: DefineNewConnectionRecipe,
        [ConnectToDatabaseRecipe.name]: ConnectToDatabaseRecipe,
        [ShowAllTablesRecipe.name]: ShowAllTablesRecipe,
        [ShowAllColumnsRecipe.name]: ShowAllColumnsRecipe,
        [RawQueryToPandasRecipe.name]: RawQueryToPandasRecipe,
        [RawQueryRecipe.name]: RawQueryRecipe,
        [SelectQueryRecipe.name]: SelectQueryRecipe,
        [InsertQueryRecipe.name]: InsertQueryRecipe,
        [CreateTableRecipe.name]: CreateTableRecipe,
        [DropTableRecipe.name]: DropTableRecipe,
        [ShowAllTablesRecipe.name]: ShowAllTablesRecipe,
        [ShowAllColumnsRecipe.name]: ShowAllColumnsRecipe,
        [RawQueryRecipe.name]: RawQueryRecipe,
    },
};
