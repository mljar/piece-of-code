import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { AffiliateIcon } from "../../icons/Affiliate";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";
import { MultiSelect } from "../../components/MultiSelect";

export const FillMissing: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
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
  const [allCols, setAllCols] = useState([] as string[]);
  const [xCols, setXCols] = useState([] as string[]);

  const [varType, setVarType] = useState("numeric");
  const [varDict, setVarDict] = useState({} as Record<string, string>);

  const allImputers = [
    "mean - replace missing values using the mean along each column",
    "median - replace missing values using the median along each column",
    "most_frequent - replace missing values using the most frequent value along each column",
    "constant - replace missing values with constant",
    "Impute with k-Nearest Neighbors algorithm",
  ];
  const [availableImputers, setAvailableImputers] = useState(allImputers);
  const [imputer, setImputer] = useState("");
  const [constant, setConstant] = useState("0");
  const [kNN, setKNN] = useState(5);
  const [name, setName] = useState("my_imputer");

  useEffect(() => {
    if (df === "") {
      setXCols([]);
    } else {
      try {
        const variable = variables.filter((v) => v.varName === df)[0];
        setAllCols(variable.varColumns);
        setXCols(variable.varColumns);
        setVarDict(
          Object.fromEntries(
            variable.varColumns.map((k, i) => [k, variable.varColumnTypes[i]])
          )
        );
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    if (xCols.length > 0) {
      const varTypes = xCols
        .map((c) => varDict[c])
        .filter((t) => t === "object");
      const newType = varTypes.length > 0 ? "object" : "numeric";
      setVarType(newType);
      if (newType === "object") {
        setAvailableImputers([allImputers[2], allImputers[3]]);
        setImputer(allImputers[2]);
      } else {
        setAvailableImputers(allImputers);
        setImputer(allImputers[0]);
      }
    }
  }, [xCols, varDict]);

  useEffect(() => {
    let src = `# create imputer\n`;
    if (imputer === allImputers[4]) {
      src += `${name} = KNNImputer(n_neighbors=${kNN})\n`;
      setPackages(["from sklearn.impute import KNNImputer"]);
    } else {
      let strategy = "mean";
      if (imputer === allImputers[1]) {
        strategy = "median";
      } else if (imputer === allImputers[2]) {
        strategy = "most_frequent";
      } else if (imputer === allImputers[3]) {
        strategy = "constant";
      }
      src += `${name} = SimpleImputer(strategy="${strategy}"`;
      if (imputer === allImputers[3]) {
        if (varType === "object") {
          src += `, fill_value="${constant}"`;
        } else {
          src += `, fill_value=${constant}`;
        }
      }
      src += `)\n`;
      setPackages(["from sklearn.impute import SimpleImputer"]);
    }
    src += `# fit imputer and fill missing data\n`;
    const xColsStr = '"' + xCols.join('", "') + '"';
    const d = `${df}[[${xColsStr}]]`;
    src += `${d} = ${name}.fit_transform(${d})\n`;
    src += `# display column that was filled\n`;
    src += `print("Filled columns")\n`;
    src += `${d}`;
    setCode(src);
  }, [name, df, xCols, varType, imputer, constant, kNN]);

  return (
    <div>
      <Title Icon={AffiliateIcon} label={"Fill missing values"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Variable
            label={"Assign imputer to variable"}
            name={name}
            setName={setName}
            tooltip="Imputer object will be assigned to variable and can be later reused on new dataset and saved"
          />
          <Select
            label={"DataFrame to fill missing values"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />

          <MultiSelect
            label={"Select columns for filling"}
            selection={xCols}
            allOptions={allCols}
            setSelection={setXCols}
          />

          <Select
            label={"Imputation method"}
            option={imputer}
            setOption={setImputer}
            options={availableImputers.map((a) => [a, a])}
          />
          {imputer === allImputers[3] && (
            <>
              <Variable
                label={"Constant to fill missing values"}
                name={constant}
                setName={setConstant}
              />
            </>
          )}
          {imputer === allImputers[4] && (
            <>
              <Numeric
                label={"Number of neighboring samples to use for imputation"}
                name={kNN}
                setName={setKNN}
                minValue={1}
                maxValue={100}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export const FillMissingRecipe: IRecipe = {
  name: "Fill missing values",
  longName: "Fill missing values in Pandas DataFrame",
  parentName: "Data wrangling",
  description: `
Fill missing values in Pandas DataFrame.`,
  shortDescription: "Fill missing values in Pandas DataFrame.",
  codeExplanation: "",
  ui: FillMissing,
  Icon: AffiliateIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.0.0",
    },
  ],
  docsUrl: "imputer-fill-missing-values",
  tags: ["pandas", "missing-values"],
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
      varColumns: ["feature1", "feature2-object", "feature3", "feature4"],
      varColumnTypes: ["int", "object", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default FillMissingRecipe;
