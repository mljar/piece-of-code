import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";
import { CategoryIcon } from "../../icons/Category";
import { TreeIcon } from "../../icons/Tree";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { RulerMeasureIcon } from "../../icons/RulerMeasure";
import { AdjustmentsIcon } from "../../icons/Adjustments";

const DOCS_URL = "scikit-learn-hyper-parameters-search";

export const Tune: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
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
      src += `params_grid = {\n    "criterion": ["gini", "entropy"],\n    "max_depth": [2, 3, 4, 5, 6, 7, 8]\n}\n`;
    } else if (selectedModelType() === "DecisionTreeRegressor") {
      src += `params_grid = {\n    "criterion": ["squared_error", "friedman_mse"],\n "max_depth": [2, 3, 4, 5, 6, 7, 8]\n}\n`;
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
      src += `cv_search = GridSearchCV(${model}, params_grid, \n    scoring="${metricName}", cv=vs, random_state=${seed}`;
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
      if (metadata["searchType"]) setSearchType(metadata["searchType"]);
      if (metadata["iterations"]) setIterations(metadata["iterations"]);
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["target"]) setTarget(metadata["target"]);
      if (metadata["sampleWeight"]) setSampleWeight(metadata["sampleWeight"]);
      if (metadata["metric"]) setMetric(metadata["metric"]);
      if (metadata["validation"]) setValidation(metadata["validation"]);
      if (metadata["kFolds"]) setKFolds(metadata["kFolds"]);
      if (metadata["shuffle"]) setShuffle(metadata["shuffle"]);
      if (metadata["stratify"]) setStratify(metadata["stratify"]);
      if (metadata["gap"]) setGap(metadata["gap"]);
      if (metadata["seed"]) setSeed(metadata["seed"]);
      if (metadata["verbose"]) setVerbose(metadata["verbose"]);
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
  description: ``,
  shortDescription: ``,
  codeExplanation: ``,
  ui: Tune,
  Icon: AdjustmentsIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
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
      varName: "my_classifier",
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
      varName: "my_regressor",
      varType: "DecisionTreeRegressor",
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
