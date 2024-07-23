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
    longName: "Postgresql recipes",
    docsUrl: "python-postgresql",
    //len: 330
    description: "Tool which allows you to define new Postgrasql database connection with credentials stored in .env file. Exqcute sql queries such as SELECT, CREATE TABLE, DROP TABLE, UPDATE TABLE. Run raw sql queries unlocking the full potential of sql. Create pandas data frame directy from a raw select query to make data analitycs even easier!",
    //len: 176
    shortDescription: "Connect to your Postgrasql database. Run raw sql query of use one of our recipes. Create pandas dataframe straingt from SELECT query result. Credentials are stored in .env file",
    tags: ["python", "postgresql", "sql", "psycopg", "pandas", ".env", "python-dotenv"],
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
