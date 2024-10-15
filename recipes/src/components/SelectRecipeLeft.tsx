import React, { useEffect, useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import { WalkIcon } from "../icons/Walk";
import { Welcome } from "./Welcome";
import { allRecipes } from "../recipes";
import { PlayIcon } from "../icons/Play";
import { TrashIcon } from "../icons/Trash";
import RunStatus from "./RunStatus";
import TopButtons from "./TopButtons";

import { PlusIcon } from "../icons/Plus";
import IVariable from "./IVariable";
import ExecutionStatus from "./ExecutionStatus";
import { PackageIcon } from "../icons/Package";
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

export interface ISelectRecipeLeftProps {
  previousCode: string;
  previousErrorName: string;
  previousErrorValue: string;
  previousExecutionCount: number;
  setCode: (src: string) => void;
  runCell: () => void;
  setPackages: (packages: string[]) => void;
  executionSteps: [string, ExecutionStatus][];
  deleteCell: () => void;
  addCell: () => void;
  variablesStatus: "loading" | "loaded" | "error" | "unknown";
  variables: IVariable[];
  checkPackage: (pkgInstallName: string, pkgImportName: string) => void;
  checkedPackages: Record<string, string>;
  installPackage: (installationName: string, importName: string) => void;
  installLog: string;
  clearExecutionSteps: () => void;
  metadata: any;
  setMetadata: (m: any) => void;
  changeCellToMarkdown: () => void;
  changeCellToCode: () => void;
  cellType: string;
  getCellCode: () => string;
  setEnv: (envVariables: [string, string][]) => void;
}

declare global {
  interface Window {
    electronAPI: any;
  }
}

export const SelectRecipeLeft: React.FC<ISelectRecipeLeftProps> = ({
  previousCode,
  previousErrorName,
  previousErrorValue,
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
  installLog,
  clearExecutionSteps,
  metadata,
  setMetadata,
  changeCellToMarkdown,
  changeCellToCode,
  cellType,
  getCellCode,
  setEnv,
}: ISelectRecipeLeftProps) => {
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
  const [currentCode, setCurrentCode] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [pythonOnly, setPythonOnly] = useState(false);
  const [installProgress, setInstallProgress] = useState(0.0);
  const [installFullLog, setInstallFullLog] = useState("");
  const [showRecipes, setShowRecipes] = useState(true);

  const setCodeWithCopy = (src: string) => {
    setCurrentCode(src);
    setCode(src);
  };

  useEffect(() => {
    if (installLog === undefined) return;
    if (installLog === "") {
      setInstallProgress(0.0);
      if (
        !(installFullLog.includes("error") || installFullLog.includes("Error"))
      ) {
        setInstallFullLog("");
      }
    } else {
      if (installProgress === 0) {
        setInstallFullLog("");
      } else {
        setInstallFullLog(installFullLog + installLog.replace("\b\b", ""));
      }
      if (installProgress < 25) {
        setInstallProgress(installProgress + 1);
      } else if (installProgress < 50) {
        setInstallProgress(installProgress * 1.01);
      } else if (installProgress < 75) {
        setInstallProgress(installProgress * 1.005);
      } else if (installProgress < 95) {
        setInstallProgress(installProgress * 1.0025);
      } else if (installProgress < 99) {
        // do nothing, wait ...
      }
    }
  }, [installLog]);

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
            if (selectedRecipeSet === "Markdown") {
              changeCellToMarkdown();
            }
            runCell();
            setExecuted(true);
            //setShowChat(false);
          }}
        >
          {<PlayIcon className="poc-inline" />}
        </button>
      </div>
    </div>
  );

  if (showChat && !pythonOnly) {
    return (
      <div className="poc-flex">
        <div className="poc-flex-none" style={{ width: "72px" }}>
          {leftButtons}
        </div>
        <div className="poc-w-full">
          <div className="poc-bg-white dark:poc-bg-slate-700 poc-w-full poc-border-gray-100 dark:poc-border-slate-600 poc-border-t poc-border-l poc-border-r poc-rounded-t-md">
            <Chat
              variablesStatus={variablesStatus}
              variables={variables}
              setCode={setCodeWithCopy}
              metadata={metadata}
              setMetadata={setMetadata}
              isStatic={false}
              runCell={() => {
                runCell();
              }}
              executionSteps={executionSteps}
              errorName={previousErrorName}
              errorValue={previousErrorValue}
              currentCode={currentCode}
              getCellCode={getCellCode}
              clearExecutionSteps={clearExecutionSteps}
              addCell={addCell}
            />
          </div>
        </div>
      </div>
    );
  }

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
            <div>
              {/* <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2 poc-w-full poc-border-gray-100 dark:poc-border-slate-600 poc-border-t poc-border-l poc-border-r poc-rounded-t-md">
               */}
              {executionSteps.length > 0 && (
                <RunStatus
                  steps={executionSteps}
                  errorName={previousErrorName}
                  errorValue={previousErrorValue}
                  addCell={addCell}
                  showBorder={true}
                  setShowChat={(show: boolean) => setShowChat(show)}
                />
              )}
            </div>
          </div>
        </div>
      );
    }
  }

  const ActiveTabClass =
    " poc-block poc-items-center  poc-justify-center poc-text-center poc-px-4 poc-py-2 poc-text-white poc-bg-blue-500 poc-rounded-lg poc-w-full dark:poc-bg-blue-600";
  const TabClass =
    " poc-block poc-items-center poc-justify-center poc-text-center poc-px-4 poc-py-2 poc-rounded-lg poc-bg-blue-50 poc-border-blue-300 dark:poc-border-slate-600 poc-border poc-text-gray-900 hover:poc-bg-blue-100 hover:poc-bg-blue-100 poc-w-full dark:poc-bg-gray-800 dark:hover:poc-bg-gray-800 dark:poc-text-gray-200 dark:hover:poc-text-white";

  const tabs = Object.entries(allRecipeSets).map(([name, recipeSet]) => (
    <div key={`select-recipe-set-${recipeSet.name}`}>
      <a
        className={
          //recipeSet.name === selectedRecipeSet ? ActiveTabClass : TabClass
          TabClass
        }
        onClick={() => {
          setSelectedRecipeSet(name);
          setSelectedRecipe("");
          setShowRecipes(true);
          setCode("");
        }}
      >
        {recipeSet.Icon && (
          <recipeSet.Icon size={24} className="poc-p-1 poc-mx-auto" />
        )}
        {recipeSet.name}
      </a>
    </div>
  ));

  let showSubTabs = false;
  let subTabs = undefined;
  if (selectedRecipeSet !== "") {
    subTabs = Object.entries(allRecipeSets[selectedRecipeSet].recipes).map(
      ([_, recipe]) => (
        <div key={`select-recipe-${recipe.name}`}>
          <a
            className={
              selectedRecipe === recipe.name ? ActiveTabClass : TabClass
            }
            onClick={() => {
              setSelectedRecipe(recipe.name);
              setShowRecipes(false);
            }}
            onMouseEnter={() => {
              setSelectedRecipe(recipe.name);
              setCode("");
            }}
          >
            {recipe.Icon && <recipe.Icon className="poc-p-1 poc-mx-auto" />}{" "}
            {recipe.name}
          </a>
        </div>
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
        "What is your next step? Please select code recipe from the left sidebar or use AI assistant."
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

  return (
    <div className="poc-flex" style={{ overflowY: "auto" }}>
      {/* <div className="poc-flex-none" style={{ width: "72px" }}>
        {(executionSteps.length === 0 || keepOpen) && leftButtons}
      </div> */}
      <div className="poc-w-full">
        {executionSteps.length > 0 && !keepOpen && topButtons}
        <div
          className="poc-bg-white dark:poc-bg-slate-700 poc-w-full 
         dark:poc-border-slate-600"
        >
          {showNav && (
            <div className="poc-p-2">
              {/* {showBuyLicense && (
                <BuyLicense
                  setShowBuyLicense={setShowBuyLicense}
                  setShowEnterLicense={setShowEnterLicense}
                />
              )} */}
              <div
                className=""
                // style={{opacity: showNav? "1": "0",
                // visibility: showNav? "poc-visible":"poc-hidden",
                // poc-transition: "opacity 1000ms, visibility 1000ms"}}
              >
                <div className="poc-max-w-full poc-mx-auto">
                  {/* <label className="poc-mb-2 poc-text-sm poc-font-medium poc-text-gray-900 poc-sr-only dark:poc-text-white">
                    Search
                  </label> */}
                  <div className="poc-relative poc-mb-2 ">
                    {/* <div className="poc-absolute poc-inset-y-0  poc-inset-x-2 poc-flex poc-items-center">
                      <svg
                        className="poc-w-4 poc-h-4  poc-text-gray-500 dark:poc-text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div> */}
                    <input
                      className="poc-block poc-w-full poc-p-2 poc-text-sm poc-text-gray-900 poc-border poc-border-gray-300 poc-rounded-lg poc-bg-gray-50 focus:poc-ring-blue-500 focus:poc-border-blue-500 dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 dark:poc-text-white dark:focus:poc-ring-blue-500 dark:focus:poc-border-blue-500"
                      placeholder="&#x1F50D; Search Code Recipes ..."
                      // type="search"
                      // value={"sdfgstest"}
                      // onChange={(e) => {}}
                    />
                    {/* <button 
                      className="poc-text-white poc-absolute end-2.5 poc-bottom-2.5 poc-bg-blue-700 hover:poc-bg-blue-800 focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-blue-300 poc-font-medium poc-rounded-lg poc-text-sm poc-px-4 poc-py-2 dark:poc-bg-blue-600 dark:hover:poc-bg-blue-700 dark:focus:poc-ring-blue-800"
                    >
                      Search
                    </button>  */}
                  </div>
                </div>
                {showSubTabs && (
                  <div
                    className="hover:poc-text-blue-600 hover:poc-cursor-pointer"
                    onClick={() => {
                      setSelectedRecipeSet("");
                      setSelectedRecipe("");
                      setShowRecipes(true);
                      setCode("");
                    }}
                  >
                    ↩ Back to cookbooks
                  </div>
                )}
                {!showSubTabs && (
                  <div
                    // className="poc-text-sm poc-flex poc-flex-wrap"
                    className="poc-text-sm poc-grid poc-grid-cols-1 sm:poc-grid-cols-2 md:poc-grid-cols-3 lg:poc-grid-cols-4 poc-gap-2"
                    style={{ maxHeight: "650px", overflowY: "auto" }}
                  >
                    {tabs}
                  </div>
                )} 
                {showSubTabs && showRecipes && (
                  <div
                    className="poc-text-sm poc-grid poc-grid-cols-1 sm:poc-grid-cols-2 md:poc-grid-cols-3 lg:poc-grid-cols-4 poc-gap-2"
                    style={{ maxHeight: "650px", overflowY: "auto" }}
                  >
                    {subTabs}
                  </div>
                )}
              </div>

              <div
                // className="poc-p-3 poc-bg-gray-50 poc-text-medium poc-text-gray-500 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full"
                className="poc-pt-4 poc-text-medium poc-text-gray-900 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full"
                style={{ maxHeight: "400px", overflowY: "auto" }}
              >
                {welcomeMsg}
              </div>
            </div>
          )}

          {RecipeUI && showRecipeUI && (
            <div
            // onMouseOver={()=>{setShowNav(false)}}
            >
              {showNav && <hr className="poc-p-1 poc-m-1" />}
              {/* <div className="poc-bg-white dark:poc-bg-slate-800 poc-p-2 poc-pt-0 poc-rounded-md"> */}
              <div className="poc-p-2 poc-pt-0 ">
                <RecipeUI
                  setCode={setCodeWithCopy}
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
                  setEnv={setEnv}
                />
              </div>
            </div>
          )}
          {installPackages.length > 0 && (
            <div className="poc-px-2 poc-pb-2">
              <hr className="poc-mb-2" />
              <div className="poc-p-3 poc-bg-gray-50 text-medium poc-text-gray-500 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full">
                <h3 className="poc-text-lg poc-text-gray-900 dark:poc-text-white poc-mb-2 poc-font-medium">
                  <PackageIcon className="poc-inline poc-pb-1" /> Install
                  packages
                </h3>
                <p className="poc-text-base poc-text-gray-900 dark:poc-text-white poc-pb-1">
                  Please install below packages to use this code recipe.
                </p>

                {installPackagesElement}
                {installProgress === 0 && installFullLog !== "" && (
                  <pre className="poc-text-sm">{installFullLog}</pre>
                )}

                {installProgress > 0 && (
                  <div className="poc-py-2">
                    <div className="poc-w-full poc-bg-gray-200 poc-rounded-full dark:poc-bg-gray-700">
                      <div
                        className="poc-bg-blue-600 poc-text-xs poc-font-medium poc-text-blue-100 poc-text-center poc-py-0.5 poc-leading-none poc-rounded-full"
                        style={{ width: `${installProgress}%` }}
                      >
                        {Math.round(installProgress)}%
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {!keepOpen && executionSteps.length > 0 && (
            <RunStatus
              steps={executionSteps}
              errorName={previousErrorName}
              errorValue={previousErrorValue}
              addCell={addCell}
              showBorder={false}
              setShowChat={(show: boolean) => setShowChat(show)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectRecipeLeft;
