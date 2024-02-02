import { IRecipeSet } from "../base";
// import { IconTransform } from '@tabler/icons-react';

import { SelectRowsRecipe } from "./seletRows";
import { SelectColsRecipe } from "./selectCols";
import { SplitDataRecipe } from "./splitData";

export const TransformDataRecipes: IRecipeSet = {
    name: "Transform Data",
    description: "Transform DataFrame",
    // icon: IconTransform,
    recipes: [SelectRowsRecipe, SelectColsRecipe, SplitDataRecipe],
};
