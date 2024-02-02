// MyComponent.tsx
import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
// import { IconFileTypeCsv, IconInfoCircle } from "@tabler/icons-react";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";

export const ReadCSV: React.FC<IRecipeProps> = ({}) => {
  const [name, setName] = useState("df");

  useEffect(() => {
    console.log(name);
  }, [name]);
  return (
    <div className="bg-gray-50 dark:bg-slate-700 p-2">
      <Title Icon={FileCsvIcon} title={"Read CSV file"} />
      <Variable
        description={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />

      {/* <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Upload file
        </label>
        <input
          className="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-0.5 text-md"
          id="file_input"
          type="file"
        ></input>
        <p
          className="mt-1 text-sm text-gray-500 dark:text-gray-300"
          id="file_input_help"
        >
          Upload *.csv file
        </p>
      </div> */}
      <code>
        import pandas as pd
        <br />
        {name} = pd.read_csv("filename")
      </code>

      {/* <div className="mt-2">
        <label className="block text-sm font-medium text-gray-900 dark:text-white">
          Delimiter
        </label>
        <select
          id="delimiter"
          className="border rounded-md block w-full p-1.5 
          bg-gray-50 
          border-gray-300 
          text-gray-900
          active:ring-blue-500 
          active:border-blue-500 
          focus:ring-blue-500 
          focus:border-blue-500 
          dark:bg-gray-700 
          dark:border-gray-600 
          dark:placeholder-gray-400 
          dark:text-white 
          "
        >
          <option value="," selected>,</option>
          <option value=";">;</option>
        </select>
        
      </div> */}
    </div>
  );
};

// export default ReadCSV;

export const ReadCSVRecipe: IRecipe = {
  name: "Read CSV",
  description: "Load CSV file into dataframe.",
  ui: ReadCSV,
  // icon: IconFileTypeCsv,
};

export default ReadCSV;
