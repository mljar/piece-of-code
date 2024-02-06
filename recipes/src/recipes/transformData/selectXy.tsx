import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";

export const SelectXy: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  dataFramesColumns,
}) => {
  if (!dataFramesColumns) {
    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const dataFrames = Object.keys(dataFramesColumns);
  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [xCols, setXCols] = useState([] as string[]);
  const [yCol, setYCol] = useState("");

  useEffect(() => {
    console.log("set x cols empty");
    if (df === "") {
      setXCols([]);
      setYCol("");
    } else {
      if (df in dataFramesColumns) {
        const cols = dataFramesColumns[df];
        if (cols) {
          setXCols(cols.slice(0, cols.length - 1));
          setYCol(cols[cols.length - 1]);
        }
      }
    }
  }, [df]);

  useEffect(() => {
    if (!xCols) {
      return;
    }
    let src = "";
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [xCols, yCol]);

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
      <Title Icon={XyIcon} title={"Select X,y"} />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Select DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          <MultiSelect
            label={"Select X columns"}
            option={xCols.map((x) => ({ value: x, label: x }))}
            options={dataFramesColumns[df].map((c) => ({ value: c, label: c }))}
            setOption={setXCols}
          />
          <Select
            label={"Select y column"}
            option={yCol}
            options={dataFramesColumns[df].map((c) => [c, c])}
            setOption={setYCol}
          />
        </>
      )}
    </div>
  );
};

export const SelectXyRecipe: IRecipe = {
  name: "Select X,y",
  description:
    "Select X,y for Machine Learning model training. The `X` matrix is used as model input, whereas `y` vector is used as model target.",
  ui: SelectXy,
  Icon: XyIcon,
};

export default SelectXyRecipe;
