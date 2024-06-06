import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";
import { BorderHorizontalIcon } from "../../icons/BorderHorizontal";
import { Toggle } from "../../components/Toggle";
import { Numeric } from "../../components/Numeric";

const DOCS_URL = "sklearn-train-test-split";

export const SplitData: React.FC<IRecipeProps> = ({
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
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [train, setTrain] = useState("train");
  const [test, setTest] = useState("test");
  const [trainRatio, setTrainRatio] = useState(0.75);

  const [advanced, setAdvanced] = useState(false);
  const [seed, setSeed] = useState(42);
  const [shuffle, setShuffle] = useState(true);
  const [stratify, setStratify] = useState(false);

  const [allCols, setAllCols] = useState([] as string[]);
  const [yCol, setYCol] = useState("");

  useEffect(() => {
    if (df === "") {
      setYCol("");
    } else {
      const colList = variables
        .filter((v) => v.varName === df)
        .map((v) => v.varColumns);
      if (colList.length) {
        const cols = colList[0];
        setAllCols(cols);
        setYCol(cols[cols.length - 1]);
      }
    }
  }, [df]);

  useEffect(() => {
    let src = `# split data\n`;
    src += `${train}, ${test} = train_test_split(${df}, train_size=${trainRatio}`;
    if (!shuffle) {
      src += `, shuffle=False`;
    } else {
      src += `, shuffle=True`;
    }
    if (stratify && yCol !== "") {
      src += `, stratify=${df}["${yCol}"]`;
    }
    if (seed > 0) {
      src += `, random_state=${seed}`;
    }
    src += `)\n`;
    src += `# display data shapes\n`;
    src += `print(f"All data shape {${df}.shape}")\n`;
    src += `print(f"Train shape {${train}.shape}")\n`;
    src += `print(f"Test shape {${test}.shape}")\n`;
    setCode(src);
    setPackages(["from sklearn.model_selection import train_test_split"]);
    if (setMetadata) {
      setMetadata({
        df,
        train,
        test,
        trainRatio,
        seed,
        shuffle,
        stratify,
        yCol,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, train, test, trainRatio, seed, shuffle, stratify, yCol]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["train"]) setTrain(metadata["train"]);
      if (metadata["test"]) setTest(metadata["test"]);
      if (metadata["trainRatio"]) setTrainRatio(metadata["trainRatio"]);
      if (metadata["seed"]) setSeed(metadata["seed"]);
      if (metadata["shuffle"]) setShuffle(metadata["shuffle"]);
      if (metadata["straify"]) setStratify(metadata["stratify"]);
      if (metadata["yCol"]) setYCol(metadata["yCol"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={BorderHorizontalIcon}
        label={"Split to train/test"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"DataFrame to split"}
              option={df}
              options={dataFrames.map((d) => [d, d])}
              setOption={setDf}
            />
            <Numeric
              label="Train ratio"
              name={trainRatio}
              setName={setTrainRatio}
              step={0.01}
              minValue={0.01}
              maxValue={0.99}
            />
          </div>
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Variable
              label={"Train DataFrame"}
              name={train}
              setName={setTrain}
            />
            <Variable label={"Test DataFrame"} name={test} setName={setTest} />
          </div>
          {advanced && (
            <>
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Toggle
                  label="Shuffle data"
                  value={shuffle}
                  setValue={setShuffle}
                  tooltip={
                    "Select it if you want to randomly shuffle data before split"
                  }
                />
                <Numeric
                  label="Random seed"
                  name={seed}
                  setName={setSeed}
                  tooltip={"Set random seed to have reproducible split"}
                />
              </div>
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Toggle
                  label="Stratify data"
                  value={stratify}
                  setValue={setStratify}
                  tooltip={
                    "Select it if you want to stratify data in the split, please select the column that will be used for stratification"
                  }
                />
                {stratify && (
                  <Select
                    label={"Select stratify column"}
                    option={yCol}
                    options={allCols.map((c) => [c, c])}
                    setOption={setYCol}
                    tooltip={
                      "Select column that will be used to stratify data in the split"
                    }
                  />
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export const SplitDataRecipe: IRecipe = {
  name: "Split to train/test",
  longName: "Split data into train and test subsets",
  parentName: "Data wrangling",
  description: `Split data into train and test subsets. Please specify the train size ratio. Typical values for train size is in range 0.6 to 0.9, but your might vary. The rest of data samples are used for testing. You have option to control data shuffle and stratification in **Advanced** options. You can specify the random seed to control reproducibility.`,
  shortDescription: "Split data into train and test subsets",
  codeExplanation: `
1. Split data into train and test subsets.  
2. Display shapes of new data sets.
`,
  ui: SplitData,
  Icon: BorderHorizontalIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["ml", "machine-learning", "split"],
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "df_2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2", "feature3", "feature4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default SplitDataRecipe;
