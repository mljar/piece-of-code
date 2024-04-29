import { IRecipeSet } from "../base";

import { MatplotlibIcon } from "../../icons/Matplotlib";
import ScatterPlotRecipe from "./scatter";

export const MatplotlibRecipes: IRecipeSet = {
    name: "matplotlib",
    longName: "matplotlib recipes",
    docsUrl: "matplotlib",
    description: `Let's do some charts.`,
    shortDescription: "We will do a lot of plots with matplotlib.",
    tags: ["matplotlib"],
    Icon: MatplotlibIcon,
    recipes: {
        [ScatterPlotRecipe.name]: ScatterPlotRecipe,
    }
};
