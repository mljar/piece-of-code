import { IRecipeSet } from "../base";
import { SelectColsRecipe } from "./selectCols";
import { SplitDataRecipe } from "./splitData";
import { SelectXyRecipe } from "./selectXy";
import { TransformIcon } from "../../icons/Transform";
import FilterRowsRecipe from "./filterRows";
import CheckMissingRecipe from "./checkMissing";
import DfInfoRecipe from "./dfInfo";
import FillMissingRecipe from "./fillMissing";

export const DataWranglingRecipes: IRecipeSet = {
    name: "Data wrangling",
    longName: "Data wrangling in Python",
    docsUrl: "data-wrangling",
    description: "Prepare and preprocess your data. You will find here code recipes for data joining, spliting, filtering and more!",
    shortDescription: "Prepare and preprocess your data in Python",
    tags: ["preprocessing", "prepare", "wrangling", "pandas"],
    Icon: TransformIcon,
    recipes: {
        [DfInfoRecipe.name]: DfInfoRecipe,
        [SelectXyRecipe.name]: SelectXyRecipe,
        [SelectColsRecipe.name]: SelectColsRecipe,
        [FilterRowsRecipe.name]: FilterRowsRecipe,
        [SplitDataRecipe.name]: SplitDataRecipe,
        [CheckMissingRecipe.name]: CheckMissingRecipe,
        [FillMissingRecipe.name]: FillMissingRecipe,
    }
};
