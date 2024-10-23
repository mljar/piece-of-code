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
  const allRecipeSets: Record<string, IRecipeSet> = allRecipes;

  const [selectedRecipeSet, setSelectedRecipeSet] = useState("");
  const [selectedRecipe, setSelectedRecipe] = useState("");
  const [previewRecipeSet, setPreviewRecipeSet] = useState("");
  const [previewRecipe, setPreviewRecipe] = useState("");

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

  const TabClass =
    " poc-block poc-items-center poc-justify-center poc-text-center poc-px-4 poc-py-2 poc-rounded-lg poc-bg-blue-50 poc-border-blue-300 dark:poc-border-slate-600 poc-border poc-text-gray-900 hover:poc-bg-blue-100 hover:poc-bg-blue-100 poc-w-full dark:poc-bg-gray-800 dark:hover:poc-bg-gray-800 dark:poc-text-gray-200 dark:hover:poc-text-white";

  const tabs = Object.entries(allRecipeSets).map(([name, recipeSet]) => (
    <div key={`select-recipe-set-${recipeSet.name}`}>
      <a
        className={TabClass}
        onClick={() => {
          setSelectedRecipeSet(name);
          setSelectedRecipe("");
          setCode("");
        }}
        onMouseEnter={() => {
          setPreviewRecipeSet(name);
          setPreviewRecipe("");
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
            className={TabClass}
            onClick={() => {
              setSelectedRecipe(recipe.name);
            }}
            onMouseEnter={() => {
              setPreviewRecipe(recipe.name);
              setCode("");
            }}
          >
            {recipe.Icon && <recipe.Icon className="poc-p-1 poc-mx-auto" />}{" "}
            {recipe.name}
          </a>
        </div>
      )
    );
    if (
      Object.entries(allRecipeSets[selectedRecipeSet].recipes).length > 0 &&
      selectedRecipe !== ""
    ) {
      showSubTabs = true;
    }
  }

  let welcomeMsg = (
    <Welcome
      title={"Select your next step"}
      Icon={WalkIcon}
      description={
        "What is your next step? Please select your code recipe or use AI assistant."
      }
    />
  );
  if (previewRecipeSet !== "" && selectedRecipe == "") {
    const recipeSet = allRecipeSets[previewRecipeSet];
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
  if (selectedRecipeSet !== "" && previewRecipe !== "") {
    const recipe = allRecipeSets[selectedRecipeSet].recipes[previewRecipe];
    welcomeMsg = (
      <Welcome
        title={recipe.name}
        Icon={recipe.Icon}
        description={recipe.description}
        docsLink={`https://mljar.com/docs/${recipe.docsUrl}/`}
      />
    );
    RecipeUI = recipe.ui;

    recipe.requiredPackages?.forEach((p: IPackage) => {
      if (
        checkPackage &&
        checkedPackages &&
        !(p.importName in checkedPackages)
      ) {
        checkPackage(p.installationName, p.importName);
      }
    });

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

  return (
    <div className="poc-flex" style={{ overflowY: "auto" }}>
      <div className="poc-w-full">
        <div
          className="poc-bg-white dark:poc-bg-slate-700 poc-w-full 
         dark:poc-border-slate-600"
        >
          <div className="poc-p-2">
            <div className="">
              {/* <div className="poc-max-w-full poc-mx-auto">
                <div className="poc-relative poc-mb-2 ">
                  <input
                    className="poc-block poc-w-full poc-p-2 poc-text-sm poc-text-gray-900 poc-border poc-border-gray-300 poc-rounded-lg poc-bg-gray-50 focus:poc-ring-blue-600 focus:poc-border-blue-600 dark:poc-bg-gray-700 dark:poc-border-gray-600 dark:poc-placeholder-gray-400 dark:poc-text-white dark:focus:poc-ring-blue-600 dark:focus:poc-border-blue-500 poc-outline-none"
                    placeholder="Search Code Recipes ..."
                  /> 
                </div>
              </div> */}
              {selectedRecipeSet !== "" && (
                <div
                  className="hover:poc-text-blue-600 hover:poc-cursor-pointer"
                  onClick={() => {
                    setSelectedRecipeSet("");
                    setSelectedRecipe("");
                    setPreviewRecipeSet("");
                    setPreviewRecipe("");
                    setCode("");
                  }}
                >
                  ↩ Back to cookbooks
                </div>
              )}
              {selectedRecipeSet === "" && (
                <div
                  className="poc-text-sm poc-grid poc-grid-cols-1 sm:poc-grid-cols-2 poc-gap-2"
                  style={{ maxHeight: "800px", overflowY: "auto" }}
                >
                  {tabs}
                </div>
              )}
              {selectedRecipeSet !== "" && selectedRecipe === "" && (
                <div
                  className="poc-text-sm poc-grid poc-grid-cols-1 sm:poc-grid-cols-2 poc-gap-2"
                  style={{ maxHeight: "800px", overflowY: "auto" }}
                >
                  {subTabs}
                </div>
              )}
            </div>

            <div
              className="poc-pt-4 poc-text-medium poc-text-gray-900 dark:poc-text-gray-400  poc-rounded-lg poc-w-full"
              style={{
                maxHeight: selectedRecipeSet === "Markdown" ? "100%" : "300px",
                overflowY: "auto",
              }}
            >
              {welcomeMsg}
            </div>
          </div>

          {RecipeUI && showRecipeUI && (
            <div>
              <div className="poc-p-2 poc-py-4 poc-pt-0 poc-border poc-border-gray-100 dark:poc-border-slate-600 poc-rounded-md poc-mx-2">
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
                  hideTitle={true}
                />
              </div>
            </div>
          )}
          {installPackages.length > 0 && (
            <div className="poc-px-2 poc-pb-2">
              <hr className="poc-mb-2" />
              <div className="poc-p-3 poc-bg-gray-50 text-medium poc-text-gray-500 dark:poc-text-gray-400 dark:poc-bg-gray-800 poc-rounded-lg poc-w-full poc-border ">
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
