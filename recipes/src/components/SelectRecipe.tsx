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

import "../style.css";
import BuyLicense from "./BuyLicense";
import { EnterLicense } from "./EnterLicense";
import { QuestionIcon } from "../icons/Question";
import { PythonIcon } from "../icons/Python";
import { MessagesIcon } from "../icons/Messages";
import { Chat } from "./Chat";
import { CakeIcon } from "../icons/Cake";

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
  clearExecutionSteps: () => void;
  metadata: any;
  setMetadata: (m: any) => void;
  changeCellToMarkdown: () => void;
  changeCellToCode: () => void;
  cellType: string;
}

declare global {
  interface Window {
    electronAPI: any;
  }
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
  clearExecutionSteps,
  metadata,
  setMetadata,
  changeCellToMarkdown,
  changeCellToCode,
  cellType,
}: ISelectRecipeProps) => {
  let isElectron = false;
  if (typeof window !== "undefined") {
    if (window.electronAPI !== undefined && window.electronAPI !== null) {
      isElectron = true;
    }
  }

  const [overwriteExistingCode, setOverwriteExistingCode] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const allRecipeSets: Record<string, IRecipeSet> = allRecipes;
  const [selectedRecipeSet, setSelectedRecipeSet] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [executed, setExecuted] = useState(previousExecutionCount !== 0);
  const [license, setLicense] = useState("");
  const [showBuyLicense, setShowBuyLicense] = useState(false);
  const [showEnterLicense, setShowEnterLicense] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);

  useEffect(() => {
    async function getLicense() {
      if (isElectron) {
        const savedLicense = await window.electronAPI.getLicense();
        if (savedLicense !== "") {
          setLicense(savedLicense);
          setShowBuyLicense(false);
        } else {
          if (Math.random() < 0.1) {
            setShowBuyLicense(true);
          }
        }
      }
    }
    getLicense();
  }, [isElectron]);

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

  if (showEnterLicense) {
    return (
      <div className="poc-flex">
        <div className="poc-flex-none" style={{ width: "72px" }}></div>
        <div className="poc-w-full">
          <EnterLicense setShowEnterLicense={setShowEnterLicense} />
        </div>
      </div>
    );
  }

  const topButtons = (
    <TopButtons
      letsOverwrite={() => {
        setOverwriteExistingCode(true);
        clearExecutionSteps();
        setShowNav(true);
        setPythonOnly(false);
      }}
      runCell={() => {
        runCell();
        setExecuted(true);
      }}
      addCell={addCell}
      deleteCell={deleteCell}
      markdown={false}
    />
  );
  const topButtonsMarkdown = (
    <TopButtons
      letsOverwrite={() => {
        setOverwriteExistingCode(true);
        clearExecutionSteps();
        setShowNav(true);
        setPythonOnly(false);
      }}
      runCell={() => {
        runCell();
        setExecuted(true);
      }}
      addCell={addCell}
      deleteCell={deleteCell}
      markdown={true}
    />
  );
  const [showChat, setShowChat] = useState(false);
  const [pythonOnly, setPythonOnly] = useState(false);

  if (pythonOnly) {
    return (
      <div className="poc-flex">
        <div className="poc-flex-none" style={{ width: "72px" }}></div>
        <div className="poc-w-full">{topButtons}</div>
      </div>
    );
  }
  if (cellType === "markdown") {
    return (
      <div className="poc-flex">
        <div className="poc-flex-none" style={{ width: "72px" }}></div>
        <div className="poc-w-full">{topButtonsMarkdown}</div>
      </div>
    );
  }

  if (
    !keepOpen &&
    executed &&
    previousCode !== "" &&
    //previousErrorName === "" &&
    !overwriteExistingCode
  ) {
    if (executionSteps.length === 0) {
      return (
        <div className="poc-flex">
          <div className="poc-flex-none" style={{ width: "72px" }}></div>
          <div className="poc-w-full">{topButtons}</div>
        </div>
      );
    } else {
      return (
        <div className="poc-flex">
          <div className="poc-flex-none" style={{ width: "72px" }}></div>
          <div className="poc-w-full">
            {topButtons}
            <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2 poc-w-full poc-border-gray-100 poc-border-t poc-border-l poc-border-r poc-rounded-t-md">
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
        </div>
      );
    }
  }

  const ActiveTabClass =
    "poc-inline-flex poc-items-center poc-px-4 poc-py-2 poc-text-white poc-bg-blue-500 poc-rounded-lg poc-w-full dark:poc-bg-blue-600";
  const TabClass =
    "poc-inline-flex poc-items-center poc-px-4 poc-py-2 poc-rounded-lg poc-bg-gray-50 hover:poc-text-gray-900 hover:poc-bg-blue-100 poc-w-full dark:poc-bg-gray-800 dark:hover:poc-bg-gray-800 dark:poc-text-gray-200 dark:hover:poc-text-white";
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
        {recipeSet.Icon && <recipeSet.Icon className="poc-p-1" />}{" "}
        {recipeSet.name}
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
            {recipe.Icon && <recipe.Icon className="poc-p-1" />} {recipe.name}
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
      setShowEnterLicense={
        isElectron && license === "" ? setShowEnterLicense : undefined
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
        tags={recipeSet.tags}
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
        docsLink={`https://mljar.com/docs/${recipe.docsUrl}/`}
        checkPackage={checkPackage}
        checkedPackages={checkedPackages}
        installPackage={installPackage}
        tags={recipe.tags}
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
  if (keepOpen) {
    showRecipeUI = true;
  }

  const leftButtons = (
    <div className="poc-h-full poc-grid poc-grid-cols-1 poc-content-end">
      <Tooltip
        id="left-buttons-tooltip"
        place="right"
        positionStrategy="fixed"
        offset={0}
        style={{ zIndex: "10001" }}
        className="poc-text-base"
      />

      {!showChat && (
        <div>
          <button
            data-tooltip-id="left-buttons-tooltip"
            data-tooltip-content="AI Assistant"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-blue-400 
            poc-to-blue-500 hover:poc-bg-gradient-to-bl 
            focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 
            dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg 
            poc-text-sm poc-px-5 poc-py-1.5 poc-text-center me-2 poc-mb-2 poc-ml-4"
            onClick={() => setShowChat(true)}
          >
            {<MessagesIcon className="poc-inline poc-p-0.5" />}
          </button>
        </div>
      )}

      {showChat && (
        <div>
          <button
            data-tooltip-id="left-buttons-tooltip"
            data-tooltip-content="Piece of Code"
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-blue-400 
            poc-to-blue-500 hover:poc-bg-gradient-to-bl 
            focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 
            dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg 
            poc-text-sm poc-px-5 poc-py-1.5 poc-text-center me-2 poc-mb-2 poc-ml-4"
            onClick={() => setShowChat(false)}
          >
            {<CakeIcon className="poc-inline poc-p-0.5" />}
          </button>
        </div>
      )}

      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Python only, hide Piece of Code"
          type="button"
          className="poc-text-white poc-bg-gradient-to-r poc-from-yellow-400 
            poc-to-yellow-500 hover:poc-bg-gradient-to-bl 
            focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 
            dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg 
            poc-text-sm poc-px-5 poc-py-1.5 poc-text-center me-2 poc-mb-2 poc-ml-4"
          onClick={() => setPythonOnly(true)}
        >
          {<PythonIcon className="poc-inline poc-p-0.5" />}
        </button>
      </div>

      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Delete cell"
          type="button"
          className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-me-2 poc-mb-2 poc-ml-4"
          onClick={() => deleteCell()}
        >
          {<TrashIcon className="poc-inline poc-p-0.5" />}
        </button>
      </div>

      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Add cell"
          type="button"
          className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg
           poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-me-2 poc-mb-2 poc-ml-4"
          onClick={() => addCell()}
        >
          <PlusIcon className="poc-inline poc-pb-1" />
        </button>
      </div>
      <div>
        <button
          data-tooltip-id="left-buttons-tooltip"
          data-tooltip-content="Run cell"
          type="button"
          className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-5 poc-py-1.5 poc-text-center poc-me-2  poc-mb-2 poc-ml-4"
          onClick={() => {
            console.log(selectedRecipeSet, cellType);
            if (selectedRecipeSet === "Markdown") {
              changeCellToMarkdown();
            }
            runCell();
            setExecuted(true);
          }}
        >
          {<PlayIcon className="poc-inline" />}
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
        <Tooltip id="package-icon-tooltip-recipe" className="poc-text-base" />
        <div
          data-tooltip-id="package-icon-tooltip-recipe"
          data-tooltip-content={tooltipMsg}
          className="poc-inline"
        >
          {status === "available" && (
            <SuccessIcon className="poc-inline poc-pt-1" />
          )}
          {status === "error" && <ErrorIcon className="poc-inline poc-p-1" />}
          {status === "unknown" && (
            <QuestionIcon className="poc-inline poc-pt-0.5" />
          )}
          {status === "install" && (
            <SpinnerIcon className="poc-inline poc-p-1" />
          )}

          <label className="poc-text-gray-900 dark:poc-text-gray-300">
            {p.installationName}
            {p.version}
          </label>
        </div>
        {status === "error" && (
          <button
            type="button"
            className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-500 poc-to-blue-500 hover:poc-bg-gradient-to-bl focus:poc-ring-4 focus:poc-outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-mx-2"
            onClick={() => {
              if (installPackage)
                installPackage(p.installationName, p.importName);
            }}
          >
            Install package
          </button>
        )}
        {status === "install" && (
          <label className="poc-text-gray-900 dark:poc-text-gray-300">
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

  if (showChat) {
    return (
      <div className="poc-flex">
        <div className="poc-flex-none" style={{ width: "72px" }}>
          {leftButtons}
        </div>
        <div className="poc-w-full">
          <div className="poc-bg-white dark:poc-bg-slate-700 poc-w-full poc-border-gray-100 poc-border-t poc-border-l poc-border-r poc-rounded-t-md">
            <Chat />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="poc-flex">
      <div className="poc-flex-none" style={{ width: "72px" }}>
        {(executionSteps.length === 0 || keepOpen) && leftButtons}
      </div>
      <div className="poc-w-full">
        {executionSteps.length > 0 && !keepOpen && topButtons}
        <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2 poc-w-full poc-border-gray-100 poc-border-t poc-border-l poc-border-r poc-rounded-t-md">
          {showNav && (
            <>
              {showBuyLicense && (
                <BuyLicense
                  setShowBuyLicense={setShowBuyLicense}
                  setShowEnterLicense={setShowEnterLicense}
                />
              )}
              <div
                className="md:poc-flex"
                // style={{opacity: showNav? "1": "0",
                // visibility: showNav? "poc-visible":"poc-hidden",
                // poc-transition: "opacity 1000ms, visibility 1000ms"}}
              >
                <ul
                  className="poc-flex-none md:poc-w-52 poc-space-y poc-space-y-2 poc-text-sm poc-font-medium poc-text-gray-500 dark:poc-text-gray-400 md:poc-me-2 poc-mb-2 md:poc-mb-0"
                  style={{ maxHeight: "250px", overflowY: "auto" }}
                >
                  {tabs}
                </ul>
                {showSubTabs && (
                  <ul
                    className="poc-flex-none poc-w-64 poc-space-y poc-space-y-2 poc-text-sm poc-font-medium poc-text-gray-500 dark:poc-text-gray-400 md:poc-me-2 poc-mb-2 md:poc-mb-0"
                    style={{ maxHeight: "250px", overflowY: "auto" }}
                  >
                    {subTabs}
                  </ul>
                )}
                <div
                  className="poc-p-3 poc-bg-gray-50 poc-text-medium poc-text-gray-500 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full"
                  style={{ maxHeight: "250px", overflowY: "auto" }}
                >
                  {welcomeMsg}
                </div>
              </div>
            </>
          )}

          {RecipeUI && showRecipeUI && (
            <div
            // onMouseOver={()=>{setShowNav(false)}}
            >
              {showNav && <hr className="poc-p-1 poc-m-2" />}
              <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-2 poc-rounded-md">
                <RecipeUI
                  setCode={setCode}
                  setPackages={setPackages}
                  variablesStatus={variablesStatus}
                  variables={variables}
                  runCell={() => {
                    runCell();
                    setExecuted(false);
                  }}
                  setKeepOpen={setKeepOpen}
                  metadata={metadata}
                  setMetadata={setMetadata}
                />
              </div>
            </div>
          )}
          {installPackages.length > 0 && (
            <div>
              <hr className="poc-m-2" />
              <div className="poc-p-3 poc-bg-gray-50 text-medium poc-text-gray-500 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full">
                <h3 className="poc-text-lg poc-text-gray-900 dark:poc-text-white poc-mb-2 poc-font-medium">
                  <PackageIcon className="poc-inline poc-pb-1" /> Install
                  packages
                </h3>
                <p className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-pb-1">
                  Please install below packages to use this code recipe.
                </p>

                {installPackagesElement}
              </div>
            </div>
          )}

          {!keepOpen && executionSteps.length > 0 && (
            <RunStatus
              steps={executionSteps}
              errorName={previousErrorName}
              errorValue={previousErroValue}
              addCell={addCell}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectRecipe;
