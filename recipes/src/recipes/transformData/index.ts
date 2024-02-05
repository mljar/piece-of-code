import { IRecipeSet } from "../base";
import { SelectRowsRecipe } from "./seletRows";
import { SelectColsRecipe } from "./selectCols";
import { SplitDataRecipe } from "./splitData";
import { TransformIcon } from "../../icons/Transform";

export const TransformDataRecipes: IRecipeSet = {
    name: "Transform Data",
    description: "Transform DataFrame",
    Icon: TransformIcon,
    recipes: {
        [SelectRowsRecipe.name]: SelectRowsRecipe, 
        [SelectColsRecipe.name]: SelectColsRecipe, 
        [SplitDataRecipe.name]: SplitDataRecipe,
    }
};
