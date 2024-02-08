import React, { useState } from "react";
import { IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { Welcome } from "./Welcome";
import { allRecipes } from "../recipes";
import { PlayIcon } from "../icons/Play";
import { HomeIcon } from "../icons/Home";
import { TrashIcon } from "../icons/Trash";

export interface ISelectRecipeProps {
  setCode: (src: string) => void;
  runCell: () => void;
  setPackages: (packages: string[]) => void;
}

export const SelectRecipe: React.FC<ISelectRecipeProps> = ({
  setCode,
  runCell,
  setPackages,
}: ISelectRecipeProps) => {
  const [showNav, setShowNav] = useState(true);
  const allRecipeSets: Record<string, IRecipeSet> = allRecipes;
  const [selectedRecipeSet, setSelectedRecipeSet] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");

  const ActiveTabClass =
    "inline-flex items-center px-4 py-2 text-white bg-blue-500 rounded-lg w-full dark:bg-blue-600";
  const TabClass =
    "inline-flex items-center px-4 py-2 rounded-lg bg-gray-50 hover:text-gray-900 hover:bg-blue-100 w-full dark:bg-gray-800 dark:hover:bg-gray-800 dark:text-gray-200 dark:hover:text-white";
  const tabs = Object.entries(allRecipeSets).map(([name, recipeSet]) => (
    <li key={`select-recipe-set-${recipeSet.name}`}>
      <a
        className={
          recipeSet.name === selectedRecipeSet ? ActiveTabClass : TabClass
        }
        onClick={() => {
          setSelectedRecipeSet(name);
          setSelectedRecipe("");
        }}
      >
        {recipeSet.Icon && <recipeSet.Icon className="p-1" />} {recipeSet.name}
      </a>
    </li>
  ));

  let showSubTabs = false;
  let subTabs = undefined;
  if (selectedRecipeSet !== "") {
    subTabs = Object.entries(allRecipeSets[selectedRecipeSet].recipes).map(
      ([_, recipe]) => (
        <li key={`select-recipe-${recipe.name}`}>
          <a
            className={
              selectedRecipe === recipe.name ? ActiveTabClass : TabClass
            }
            onClick={() => {
              setSelectedRecipe(recipe.name);
            }}
          >
            {recipe.Icon && <recipe.Icon className="p-1" />} {recipe.name}
          </a>
        </li>
      )
    );
    if (Object.entries(allRecipeSets[selectedRecipeSet].recipes).length > 0) {
      showSubTabs = true;
    }
  }

  let welcomeMsg = (
    <Welcome
      title={"Select your next step"}
      Icon={WalkIcon}
      description={
        "What is your next step? Please select code recipe from the left sidebar."
      }
    />
  );
  if (selectedRecipeSet !== "" && selectedRecipe == "") {
    const recipeSet = allRecipeSets[selectedRecipeSet];
    welcomeMsg = (
      <Welcome
        title={recipeSet.name}
        Icon={recipeSet.Icon}
        description={recipeSet.description}
      />
    );
  }
  let RecipeUI = undefined;
  if (selectedRecipeSet !== "" && selectedRecipe !== "") {
    console.log(selectedRecipeSet, selectedRecipe);
    const recipe = allRecipeSets[selectedRecipeSet].recipes[selectedRecipe];
    welcomeMsg = (
      <Welcome
        title={recipe.name}
        Icon={recipe.Icon}
        description={recipe.description}
        packages={recipe.requiredPackages}
        docsLink={recipe.docsLink}
      />
    );
    RecipeUI = recipe.ui;
  }
  return (
    <div className="flex">
      <div className="flex-none" style={{ width: "72px" }}>
        <div className="h-full grid grid-cols-1 content-end">
          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-8 text-sm">
              Delete cell
            </span>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 ml-4"
              onClick={() => setShowNav(!showNav)}
            >
              {<TrashIcon className="inline p-0.5" />}
            </button>
          </div>
          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-8 text-sm">
              Toggle menu view
            </span>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 ml-4"
              onClick={() => setShowNav(!showNav)}
            >
              {<HomeIcon className="inline p-0.5" />}
            </button>
          </div>

          <div className="has-tooltip">
            <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-8 text-sm">
              Run code
            </span>
            <button
              type="button"
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2  mb-2 ml-4"
              onClick={() => runCell()}
            >
              {<PlayIcon className="inline" />}
            </button>
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-700 p-2 w-full border-gray-100 border-t border-l border-r rounded-t-md">
        {showNav && (
          <div className="md:flex">
            <ul className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0">
              {tabs}
            </ul>
            {showSubTabs && (
              <ul className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0">
                {subTabs}
              </ul>
            )}
            <div className="p-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
              {welcomeMsg}
            </div>
          </div>
        )}

        {RecipeUI && (
          <div>
            {showNav && <hr className="p-1 m-2" />}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-md">
              <RecipeUI setCode={setCode} setPackages={setPackages} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectRecipe;
