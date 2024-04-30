import { IRecipeSet } from "../base";

import { MatplotlibIcon } from "../../icons/Matplotlib";
import ScatterPlotRecipe from "./scatter";

export const MatplotlibRecipes: IRecipeSet = {
    name: "matplotlib",
    longName: "Matplotlib",
    docsUrl: "matplotlib",
    description: `Create matplotlib charts in Python with no-code UI.`,
    shortDescription: "Create matplotlib plots with no-code UI.",
    tags: ["matplotlib"],
    Icon: MatplotlibIcon,
    recipes: {
        [ScatterPlotRecipe.name]: ScatterPlotRecipe,
    }
};
