import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { AdjustmentsIcon } from "../../icons/Adjustments";

const DOCS_URL = "scikit-learn-hyper-parameters-search";

export const Tune: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  if (variablesStatus === "loaded" && !variables.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create data object
          by reading data from file, url or database.
        </p>
      </div>
    );
  }

  const classifierMetricsFuncs = {
    Accuracy: "accuracy",
    "ROC AUC": "roc_auc",
    F1: "f1",
    Precision: "average_precision",
    Recall: "recall",
    LogLoss: "log_loss",
  } as Record<string, string>;
  const regressorMetricsFuncs = {
    MSE: "neg_mean_squared_error",
    RMSE: "neg_root_mean_squared_error",
    MAE: "neg_mean_absolute_error",
    R2: "r2",
  } as Record<string, string>;

  const [metricsFuncs, setMetricsFuncs] = useState(classifierMetricsFuncs);

  const [advanced, setAdvanced] = useState(false);
  const [metric, setMetric] = useState(Object.keys(metricsFuncs)[0]);
  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const models = variables
    .filter(
      (v) => v.varType.includes("Classifier") || v.varType.includes("Regressor")
    )
    .map((v) => v.varName);
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataObjects.length ? dataObjects[0] : "");
  const [target, setTarget] = useState(
    dataObjects.length ? dataObjects[dataObjects.length - 1] : ""
  );
  const [sampleWeight, setSampleWeight] = useState("None");
  const RANDOMIZED_SEARCH = "Randomized Search";
  const GRID_SEARCH = "Grid Search";
  const searchTypes = [RANDOMIZED_SEARCH, GRID_SEARCH];
  const [searchType, setSearchType] = useState(searchTypes[0]);
  const [iterations, setIterations] = useState(10);
  const CROSS_VALIDATION = "Cross Validation";
  const TIMESERIES_SPLIT = "TimeSeries Split";
  const validations = [CROSS_VALIDATION, TIMESERIES_SPLIT];
  const [validation, setValidation] = useState(validations[0]);
  const [kFolds, setKFolds] = useState(5);
  const [shuffle, setShuffle] = useState(true);
  const [stratify, setStratify] = useState("None");
  const [gap, setGap] = useState(0);
  const [seed, setSeed] = useState(42);
  const [verbose, setVerbose] = useState(true);

  const isClassifier = () => {
    const selectedModel = variables.filter((v) => v.varName === model)[0];
    return selectedModel.varType.includes("Classifier");
  };

  const selectedModelType = () => {
    const selectedModel = variables.filter((v) => v.varName === model)[0];
    return selectedModel.varType;
  };

  useEffect(() => {
    if (isClassifier()) {
      setMetricsFuncs(classifierMetricsFuncs);
      setMetric(Object.keys(classifierMetricsFuncs)[0]);
    } else {
      setMetricsFuncs(regressorMetricsFuncs);
      setMetric(Object.keys(regressorMetricsFuncs)[0]);
      setStratify("None");
    }
  }, [model]);

  useEffect(() => {
    let packages = [];
    let src = `# create validation strategy\n`;
    if (validation === CROSS_VALIDATION) {
      if (stratify != "None") {
        src += `vs = StratifiedKFold(n_splits=${kFolds}, shuffle=${shuffle ? "True" : "False"}`;
        if (shuffle) {
          src += `, random_state=${seed}`;
        }
        src += `)\n`;
        packages.push("from sklearn.model_selection import StratifiedKFold");
      } else {
        src += `vs = KFold(n_splits=${kFolds}, shuffle=${shuffle ? "True" : "False"}, random_state=${seed})\n`;
        packages.push("from sklearn.model_selection import KFold");
      }
    } else {
      src += `vs = TimeSeriesSplit(n_splits=${kFolds}`;
      if (gap !== 0) {
        src += `, gap=${gap}`;
      }
      src += `)\n`;
      packages.push("from sklearn.model_selection import TimeSeriesSplit");
    }

    src += `# parameters grid for search\n`;
    if (selectedModelType() === "DecisionTreeClassifier") {
      src += `params_grid = {\n    "criterion": ["gini", "entropy", "log_loss"],\n    "max_depth": [2, 3, 4, 5, 6, 7, 8]\n}\n`;
    } else if (selectedModelType() === "DecisionTreeRegressor") {
      src += `params_grid = {\n    "criterion": ["squared_error", "friedman_mse", "absolute_error", "poisson"],\n    "max_depth": [2, 3, 4, 5, 6, 7, 8]\n}\n`;
    } else if (selectedModelType() === "RandomForestClassifier") {
      src += `params_grid = {\n    "n_estimators": [10, 20, 50, 100, 200, 500],\n    "criterion": ["gini", "entropy", "log_loss"],\n    "max_depth": [None, 2, 5, 10],\n    "max_features": ["sqrt", "log2", None, 0.1, 0.2, 0.5, 0.8, 1.0]}\n`;
    } else if (selectedModelType() === "RandomForestRegressor") {
      src += `params_grid = {\n    "n_estimators": [10, 20, 50, 100, 200, 500],\n    "criterion": ["squared_error", "friedman_mse", "absolute_error", "poisson"],\n    "max_depth": [None, 2, 5, 10],\n    "max_features": ["sqrt", "log2", None, 0.1, 0.2, 0.5, 0.8, 1.0]}\n`;
    } else if (
      selectedModelType() === "KNeighborsClassifier" ||
      selectedModelType() === "KNeighborsRegressor"
    ) {
      src += `params_grid = {\n    "n_neighbors": [1, 2, 5, 10, 15, 20],\n    "weights": ["uniform", "distance"],\n    "metric": ["euclidean", "manhattan", "cosine", "haversine"]}\n`;
    } else {
      src += `# please define yours params grid\nparams_grid = {}\n`;
    }

    let metricName = { ...classifierMetricsFuncs, ...regressorMetricsFuncs }[
      metric
    ] as string;
    src += `# create search strategy\n`;
    if (searchType === RANDOMIZED_SEARCH) {
      src += `cv_search = RandomizedSearchCV(${model}, params_grid, \n    n_iter=${iterations}, scoring="${metricName}", cv=vs, random_state=${seed}`;
      if (verbose) {
        src += `, verbose=${verbose ? "4" : "0"}`;
      }
      src += `)\n`;
      packages.push("from sklearn.model_selection import RandomizedSearchCV");
    } else {
      src += `cv_search = GridSearchCV(${model}, params_grid, \n    scoring="${metricName}", cv=vs`;
      if (verbose) {
        src += `, verbose=${verbose ? "4" : "0"}`;
      }
      src += `)\n`;
      packages.push("from sklearn.model_selection import GridSearchCV");
    }
    src += `# run search strategy\n`;
    src += `cv_search.fit(${df}, ${target}`;
    if (sampleWeight !== "None") {
      src += `, sample_weight=${sampleWeight}`;
    }
    src += `)\n`;

    src += `# display best parameters\n`;
    src += `print(f"Best score {cv_search.best_score_}")\n`;
    src += `print(f"Best params {cv_search.best_params_}")`;

    setCode(src);
    setPackages(packages);

    if (setMetadata) {
      setMetadata({
        searchType,
        iterations,
        model,
        df,
        target,
        sampleWeight,
        metric,
        validation,
        kFolds,
        shuffle,
        stratify,
        gap,
        seed,
        verbose,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    searchType,
    iterations,
    model,
    df,
    target,
    sampleWeight,
    metric,
    validation,
    kFolds,
    shuffle,
    stratify,
    gap,
    seed,
    verbose,
    metricsFuncs,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["searchType"] !== undefined) setSearchType(metadata["searchType"]);
      if (metadata["iterations"] !== undefined) setIterations(metadata["iterations"]);
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      if (metadata["sampleWeight"] !== undefined) setSampleWeight(metadata["sampleWeight"]);
      if (metadata["metric"] !== undefined) setMetric(metadata["metric"]);
      if (metadata["validation"] !== undefined) setValidation(metadata["validation"]);
      if (metadata["kFolds"] !== undefined) setKFolds(metadata["kFolds"]);
      if (metadata["shuffle"] !== undefined) setShuffle(metadata["shuffle"]);
      if (metadata["stratify"] !== undefined) setStratify(metadata["stratify"]);
      if (metadata["gap"] !== undefined) setGap(metadata["gap"]);
      if (metadata["seed"] !== undefined) setSeed(metadata["seed"]);
      if (metadata["verbose"] !== undefined) setVerbose(metadata["verbose"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={AdjustmentsIcon}
        label={"Hyper Parameters Search"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      {(df === "" || target === "") && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create data by
          reading data from file, url or database.
        </p>
      )}
      {models.length === 0 && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no models objects in your notebook. Please create ML model.
        </p>
      )}

      {!(df === "" || target === "" || models.length === 0) && (
        <>
          <Select
            label={"Select search strategy"}
            option={searchType}
            options={searchTypes.map((d) => [d, d])}
            setOption={setSearchType}
          />
          {searchType === searchTypes[0] && (
            <Numeric
              label="Number of iterations"
              setName={setIterations}
              name={iterations}
              minValue={2}
            />
          )}

          <Select
            label={"Select model object for tuning"}
            option={model}
            options={models.map((d) => [d, d])}
            setOption={setModel}
          />

          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Select X (input data)"}
              option={df}
              options={dataObjects.map((d) => [d, d])}
              setOption={setDf}
            />
            <Select
              label={"Select y (target)"}
              option={target}
              options={dataObjects.map((c) => [c, c])}
              setOption={setTarget}
            />
          </div>

          <Select
            label={"Select metric"}
            option={metric}
            options={Object.keys(metricsFuncs).map((d) => [d, d])}
            setOption={setMetric}
          />

          {advanced && (
            <>
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Select
                  label={"Validation strategy"}
                  option={validation}
                  options={validations.map((d) => [d, d])}
                  setOption={setValidation}
                />
                <Numeric
                  label={"Number of folds"}
                  name={kFolds}
                  setName={setKFolds}
                  minValue={2}
                />
              </div>
              {validation === validations[0] && (
                <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                  <Toggle
                    label="Shuffle samples"
                    setValue={setShuffle}
                    value={shuffle}
                  />

                  {!isClassifier() && (
                    <Select
                      label={"Stratify"}
                      option={stratify}
                      options={["None"].concat(dataObjects).map((d) => [d, d])}
                      setOption={setStratify}
                    />
                  )}
                </div>
              )}
              {validation === validations[1] && (
                <Numeric
                  label={
                    "Number of samples to exclude from the end of training set"
                  }
                  name={kFolds}
                  setName={setKFolds}
                  minValue={2}
                />
              )}
              <Select
                label={"Sample weight"}
                option={sampleWeight}
                options={
                  (dataObjects.push("None"), dataObjects.map((c) => [c, c]))
                }
                setOption={setSampleWeight}
              />
              {(shuffle || validation === RANDOMIZED_SEARCH) && (
                <Numeric
                  label={"Random number generator seed"}
                  name={seed}
                  setName={setSeed}
                  minValue={42}
                />
              )}
              <Toggle label="Verbose" setValue={setVerbose} value={verbose} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export const TuneRecipe: IRecipe = {
  name: "Hyper Parameters Search",
  longName: "Hyper Parameters Search",
  parentName: "Scikit-learn",
  description: `Search for the best hyper parameters for your model and data. There are available two approached for search. The **Randomized Search** that will draw combination of parameters and evaluate them. The **Grid Search** that will check **each** combination of parameters. The Randomized Search is faster because it is not checking all possible combinations of parameters. 
  
  Please select the model that you would like to tune and recipe will propose set of hyper parameters to tune. You can set cross validation strategy and evaluation metric. If verbose output is selected, each iteration will be printed. You can use best hyper parameters to train a model on full dataset.`,
  shortDescription: `Search for the best hyper parameters for your model. There are available two approached for tunning Radomized Search and Grid Search. You can set cross validation strategy and evaluation metric.`,
  codeExplanation: `
1. Create validation strategy.
2. Setup grid with parameters that will be checked.
3. Create search strategy object. 
4. Run hyper parameters search by fitting to the data.
5. Display best performing score and parameters.

Please aware that this step might be time consuming because for each hyper parameters combination a model is fitted. What is more, model is fitted with cross validation, so the fit is called for each iteration of cross validation as well.`,
  ui: Tune,
  Icon: AdjustmentsIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["metric", "accuracy"],
  defaultVariables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: ["target"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "tree_classifier",
      varType: "DecisionTreeClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "tree_regressor",
      varType: "DecisionTreeRegressor",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "forest_classifier",
      varType: "RandomForestClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "forest_regressor",
      varType: "RandomForestRegressor",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "knn_classifier",
      varType: "KNeighborsClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "knn_regressor",
      varType: "KNeighborsRegressor",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export default TuneRecipe;
