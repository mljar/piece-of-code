import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";

export const SelectXy: React.FC<IRecipeProps> = ({
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
  const [x, setX] = useState("X");
  const [y, setY] = useState("y");
  const [allCols, setAllCols] = useState([] as string[]);
  const [xCols, setXCols] = useState([] as string[]);
  const [yCol, setYCol] = useState("");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (df === "") {
      setXCols([]);
      setYCol("");
    } else {
      const colList = variables
        .filter((v) => v.varName === df)
        .map((v) => v.varColumns);
      if (colList.length) {
        const cols = colList[0];
        setAllCols(cols);
        setXCols(cols.slice(0, cols.length - 1));
        setYCol(cols[cols.length - 1]);
      }
    }
  }, [df]);

  useEffect(() => {
    if (!xCols || yCol === "") {
      return;
    }
    const xColsStr = '"' + xCols.join('", "') + '"';
    let src = `# create X columns list and set y column\n`;
    src += `x_cols = [${xColsStr}]\n`;
    src += `y_col = \"${yCol}\"\n`;
    src += "# set input matrix\n";
    src += `${x} = ${df}[x_cols]\n`;
    src += "# set target vector\n";
    src += `${y} = ${df}[y_col]\n`;
    src += `# display data shapes\n`;
    src += `print(f"${x} shape is {${x}.shape}")\n`;
    src += `print(f"${y} shape is {${y}.shape}")\n`;

    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [df, xCols, yCol, x, y]);

  return (
    <div>
      <Title Icon={XyIcon} label={"Select X,y"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"From which DataFrame we will select columns?"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          <Variable
            label={"Input matrix variable name"}
            name={x}
            setName={setX}
          />
          <MultiSelect
            label={"Select X columns"}
            selection={xCols}
            allOptions={allCols}
            setSelection={setXCols}
          />
          <Variable
            label={"Target vector variable name"}
            name={y}
            setName={setY}
          />
          <Select
            label={"Select y column"}
            option={yCol}
            options={allCols.map((c) => [c, c])}
            setOption={setYCol}
          />
        </>
      )}
    </div>
  );
};

export const SelectXyRecipe: IRecipe = {
  name: "Select X,y",
  longName: "Select training attributes and target",
  parentName: "Data wrangling",
  description:
    "Select X,y for Machine Learning model training. The `X` matrix is used as model input, whereas `y` vector is used as model target.",
  shortDescription:
    "Select training attributes and target for Machine Learning model training.",
  codeExplanation: "",
  ui: SelectXy,
  Icon: XyIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: "python-select-training-attributes-for-machine-learning",
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
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
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default SelectXyRecipe;
