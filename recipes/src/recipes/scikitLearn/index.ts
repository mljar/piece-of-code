import { IRecipeSet } from "../base";

import { ScikitLearnIcon } from "../../icons/ScikitLearn";
import TrainDecisionTreeRecipe from "./trainDescitionTree";

export const ScikitLearnRecipes: IRecipeSet = {
    name: "Scikit-learn",
    longName: "Scikit-learn recipes",
    docsUrl: "scikit-learn",
    description: `Scikit-learn, commonly abbreviated as sklearn, is a popular open-source machine learning library. Scikit-learn offers a wide range of machine learning algorithms for tasks such as classification, regression, clustering, dimensionality reduction, and model selection. It also provides tools for data preprocessing, model evaluation, and cross-validation.`,
    shortDescription: "Machine Learning code recipes with Scikit-learn.",
    tags: ["scikit-learn", "sklearn", "machine-learning", "classifier", "regressor"],
    Icon: ScikitLearnIcon,
    recipes: {
        [TrainDecisionTreeRecipe.name]: TrainDecisionTreeRecipe,
    }
};