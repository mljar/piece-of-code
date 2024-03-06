import { IRecipeSet } from "../base";
import { SelectRowsRecipe } from "./seletRows";
import { SelectColsRecipe } from "./selectCols";
import { SplitDataRecipe } from "./splitData";
import { SelectXyRecipe } from "./selectXy";
import { TransformIcon } from "../../icons/Transform";

export const DataWranglingRecipes: IRecipeSet = {
    name: "Data Wrangling",
    description: "Prepare and preprocess your data. You will find here code recipes for data joining, spliting, filtering and more!",
    Icon: TransformIcon,
    recipes: {
        [SelectXyRecipe.name]: SelectXyRecipe,
        [SelectRowsRecipe.name]: SelectRowsRecipe, 
        [SelectColsRecipe.name]: SelectColsRecipe, 
        [SplitDataRecipe.name]: SplitDataRecipe,
    }
};
