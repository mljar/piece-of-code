import React, { useEffect, useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { IconProps } from "../icons/props";
import { Welcome } from "./Welcome";
import { allRecipes } from "../recipes";
import { PlayIcon } from "../icons/Play";
import { HomeIcon } from "../icons/Home";
import { TrashIcon } from "../icons/Trash";
import RunStatus from "./RunStatus";
import TopButtons from "./TopButtons";

import { PlusIcon } from "../icons/Plus";
import IVariable from "./IVariable";
import ExecutionStatus from "./ExecutionStatus";
import { PackageIcon } from "../icons/Package";
import { WarningIcon } from "../icons/Warning";
import { ErrorIcon } from "../icons/Error";
import { SuccessIcon } from "../icons/Success";
import { SpinnerIcon } from "../icons/Spinner";
import { Tooltip } from "react-tooltip";

export interface ISelectRecipeProps {
  previousCode: string;
  previousErrorName: string;
  previousErroValue: string;
  previousExecutionCount: number;
  setCode: (src: string) => void;
  runCell: () => void;
  setPackages: (packages: string[]) => void;
  executionSteps: [string, ExecutionStatus][];
  deleteCell: () => void;
  addCell: () => void;
  variablesStatus: "loading" | "loaded" | "error" | "unknown";
  variables: IVariable[];
  checkPackage: (pkg: string) => void;
  checkedPackages: Record<string, string>;
  installPackage: (installationName: string, importName: string) => void;
}

export const SelectRecipe: React.FC<ISelectRecipeProps> = ({
  previousCode,
  previousErrorName,
  previousErroValue,
  previousExecutionCount,
  setCode,
  runCell,
  setPackages,
  executionSteps,
  deleteCell,
  addCell,
  variablesStatus,
  variables,
  checkPackage,
  checkedPackages,
  installPackage,
}: ISelectRecipeProps) => {
  const [overwriteExistingCode, setOverwriteExistingCode] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const allRecipeSets: Record<string, IRecipeSet> = allRecipes;
  const [selectedRecipeSet, setSelectedRecipeSet] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [executed, setExecuted] = useState(previousExecutionCount !== 0);

  useEffect(() => {
    setExecuted(previousExecutionCount !== 0);
  }, [previousExecutionCount]);

  useEffect(() => {
    if (executionSteps.length) {
      setShowNav(false);
      // if all success
      if (
        executionSteps.length ===
        executionSteps.filter((step) => step[1] === ExecutionStatus.Success)
          .length
      ) {
        setShowSuccess(true);
      }
    }
  }, [executionSteps]);

  if (
    executed &&
    previousCode !== "" &&
    //previousErrorName === "" &&
    !overwriteExistingCode
  ) {
    return (
      <div className="flex">
        <div className="flex-none" style={{ width: "72px" }}></div>
        <div
          className="bg-white dark:bg-slate-700 p-2 w-full border-gray-100 border-t border-l border-r rounded-t-md"
          style={{ marginBottom: "-13px" }}
        >
          <TopButtons
            letsOverwrite={() => setOverwriteExistingCode(true)}
            runCell={() => {
              runCell();
              setExecuted(true);
            }}
            addCell={addCell}
            deleteCell={deleteCell}
          />
          {executionSteps.length > 0 && (
            <RunStatus
              steps={executionSteps}
              errorName={previousErrorName}
              errorValue={previousErroValue}
              addCell={addCell}
            />
          )}
        </div>
      </div>
    );
  }

  // if (
  //   executed &&
  //   previousCode !== "" &&
  //   previousErrorName !== "" &&
  //   !overwriteExistingCode
  // ) {
  //   return (
  //     <div className="flex">
  //       <div className="flex-none" style={{ width: "72px" }}>
  //         {leftButtons}
  //       </div>
  //       <div className="bg-white dark:bg-slate-700 p-2 w-full border-gray-100 border-t border-l border-r rounded-t-md">
  //         <NextStepError ename={previousErrorName} evalue={previousErroValue} />
  //       </div>
  //     </div>
  //   );
  // }

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

  let installPackages: IPackage[] = [];
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
        checkPackage={checkPackage}
        checkedPackages={checkedPackages}
        installPackage={installPackage}
      />
    );
    RecipeUI = recipe.ui;

    recipe.requiredPackages?.forEach((p) => {
      if (
        !(
          checkedPackages &&
          p.importName in checkedPackages &&
          checkedPackages[p.importName] !== "error" &&
          checkedPackages[p.importName] !== "install"
        )
      ) {
        installPackages.push(p);
      }
    });
  }
  let showRecipeUI = false;
  if (
    RecipeUI !== undefined &&
    executionSteps.length === 0 &&
    installPackages.length === 0
  ) {
    showRecipeUI = true;
  }

  const leftButtons = (
    <div className="h-full grid grid-cols-1 content-end">
      <Tooltip
        id="left-buttons-tooltip"
        place="top"
        positionStrategy="fixed"
        offset={5}
        style={{ zIndex: "10001" }}
        className="text-base"
      />

      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Delete cell"
          type="button"
          className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 ml-4"
          onClick={() => deleteCell()}
        >
          {<TrashIcon className="inline p-0.5" />}
        </button>
      </div>

      {/* {showRecipeUI && (
        <div className="has-tooltip">
          <span className="tooltip rounded shadow-lg p-1 bg-slate-800 text-gray-50 -mt-7 text-sm">
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
      )} */}
      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Add cell"
          type="button"
          className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2 mb-2 ml-4"
          onClick={() => addCell()}
        >
          <PlusIcon className="inline pb-1" />
        </button>
      </div>
      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Run cell"
          type="button"
          className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-1.5 text-center me-2  mb-2 ml-4"
          onClick={() => {
            runCell();
            setExecuted(true);
          }}
        >
          {<PlayIcon className="inline" />}
        </button>
      </div>
    </div>
  );

  const installPackagesElement = installPackages.map((p) => {
    let status = "unknown";

    if (checkedPackages && p.importName in checkedPackages) {
      switch (checkedPackages[p.importName]) {
        case "error":
        case "install":
          status = checkedPackages[p.importName];
          break;
        default:
          status = "available";
          break;
      }
    }

    let tooltipMsg = "Package is available";
    if (status === "error") {
      tooltipMsg = "Package is not available, please install it";
    } else if (status === "install") {
      tooltipMsg = "Package installation, please wait";
    } else if (status === "unknown") {
      tooltipMsg = "Package status is unknown";
    }

    return (
      <div key={`${p.installationName}-${p.version}`}>
        <Tooltip id="package-icon-tooltip-recipe" className="text-base"/>
        <div
          data-tooltip-id="package-icon-tooltip-recipe"
          data-tooltip-content={tooltipMsg}
          className="inline"
        >
          {status === "available" && <SuccessIcon className="inline pt-1" />}
          {status === "error" && <ErrorIcon className="inline p-1" />}
          {status === "unknown" && <WarningIcon className="inline pt-1" />}
          {status === "install" && <SpinnerIcon className="inline p-1" />}

          <label className="text-gray-900 dark:text-gray-300">
            {p.installationName}
            {p.version}
          </label>
        </div>
        {status === "error" && (
          <button
            type="button"
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-2 py-1 text-center mx-2"
            onClick={() => {
              if (installPackage)
                installPackage(p.installationName, p.importName);
            }}
          >
            Install package
          </button>
        )}
        {status === "install" && (
          <label className="text-gray-900 dark:text-gray-300">
            {" "}
            Please wait, package installation ...
          </label>
        )}
      </div>
    );
  });

  // const [showNavDelayed, setShowNavDelayed] = useState(showNav);
  // useEffect(
  //   () => {
  //     console.log('nav effect')
  //     let timer1 = setTimeout(() => setShowNavDelayed(showNav), 800);
  //     return () => {
  //       clearTimeout(timer1);
  //     };
  //   },
  //   [showNav]
  // );

  return (
    <div className="flex">
      <div className="flex-none" style={{ width: "72px" }}>
        {leftButtons}
      </div>
      <div className="bg-white dark:bg-slate-700 p-2 w-full border-gray-100 border-t border-l border-r rounded-t-md">
        {showNav && (
          <div
            className="md:flex"
            // style={{opacity: showNav? "1": "0",
            // visibility: showNav? "visible":"hidden",
            // transition: "opacity 1000ms, visibility 1000ms"}}
          >
            <ul
              className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0 pr-2"
              style={{ maxHeight: "250px", overflowY: "auto" }}
            >
              {tabs}
            </ul>
            {showSubTabs && (
              <ul
                className="flex-none md:w-52 space-y space-y-2 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-2 mb-2 md:mb-0 pr-2"
                style={{ maxHeight: "250px", overflowY: "auto" }}
              >
                {subTabs}
              </ul>
            )}
            <div className="p-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
              {welcomeMsg}
            </div>
          </div>
        )}

        {RecipeUI && showRecipeUI && (
          <div
          // onMouseOver={()=>{setShowNav(false)}}
          >
            {showNav && <hr className="p-1 m-2" />}
            <div className="bg-white dark:bg-slate-800 p-2 rounded-md">
              <RecipeUI
                setCode={setCode}
                setPackages={setPackages}
                variablesStatus={variablesStatus}
                variables={variables}
              />
            </div>
          </div>
        )}
        {installPackages.length > 0 && (
          <div>
            <hr className="m-2" />
            <div className="p-3 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
              <h3 className="text-lg text-gray-900 dark:text-white mb-2">
                <PackageIcon className="inline pb-1" /> Install packages
              </h3>
              <p className="text-base text-gray-900 dark:text-white pb-1">
                Please install below packages to use this code recipe.
              </p>

              {installPackagesElement}
            </div>
          </div>
        )}

        {executionSteps.length > 0 && (
          <RunStatus
            steps={executionSteps}
            errorName={previousErrorName}
            errorValue={previousErroValue}
            addCell={addCell}
          />
        )}
      </div>
    </div>
  );
};

export default SelectRecipe;
