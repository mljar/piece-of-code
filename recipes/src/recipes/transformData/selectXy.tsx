import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";

export const SelectXy: React.FC<IRecipeProps> = ({ dataFramesColumns }) => {
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
  
  useEffect(() => {
    setXCols([]);
  }, [df]);
  
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
            option={xCols}
            options={dataFramesColumns[df].map((c) => [c, c])}
            setOption={setXCols}
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
