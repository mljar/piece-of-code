import React, { useState } from "react";
import { IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";

export interface IWelcomeProps {
  title?: string;
  Icon?: React.FC<IconProps>;
  description: string;
}

export const Welcome: React.FC<IWelcomeProps> = ({
  title,
  Icon,
  description,
}: IWelcomeProps) => {
  return (
    <>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
        <WalkIcon className="inline pb-1" /> Select your next step
      </h3>
      <p className="mb-2">
        What is your next step? Please select code recipe from the left sidebar.
      </p>
    </>
  );
};

export interface ISelectRecipeProps {
  allRecipeSets: Record<string, IRecipeSet>;
}

export const SelectRecipe: React.FC<ISelectRecipeProps> = ({
  allRecipeSets,
}: ISelectRecipeProps) => {
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

  let subTabs = undefined;
  if (selectedRecipeSet !== "") {
    subTabs = allRecipeSets[selectedRecipeSet].recipes.map((recipe) => (
      <li key={`select-recipe-${recipe.name}`}>
        <a
          className={selectedRecipe === recipe.name ? ActiveTabClass : TabClass}
          onClick={() => {
            setSelectedRecipe(recipe.name);
          }}
        >
          {recipe.Icon && <recipe.Icon className="p-1" />} {recipe.name}
        </a>
      </li>
    ));
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
  if (selectedRecipeSet !== "" && selectedRecipe !== "") {
    const recipeSet = allRecipeSets[selectedRecipeSet];
    welcomeMsg = (
      <Welcome
        title={recipeSet.name}
        Icon={recipeSet.Icon}
        description={recipeSet.description}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-slate-700 p-2">
      <div className="md:flex">
        <ul className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0">
          {tabs}
        </ul>
        {subTabs && (
          <ul className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0">
            {subTabs}
          </ul>
        )}
        <div className="p-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
          {welcomeMsg}
        </div>
      </div>
    </div>
  );
};
