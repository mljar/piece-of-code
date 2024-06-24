import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { ColumnRemoveIcon } from "../../icons/ColumnRemove";

const DOCS_URL = "pandas-delete-column";

export const DeleteColumn: React.FC<IRecipeProps> = ({
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
          There are no data objects in your notebook. Please create data by
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

  useEffect(() => {
    if (df === "") {
      setXCols([]);
    } else {
      try {
        const variable = variables.filter((v) => v.varName === df)[0];
        setAllCols(variable.varColumns);
        setXCols([variable.varColumns[variable.varColumns.length - 1]]);
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    let src = `# drop columns in DataFrame\n`;

    const xColsStr = '"' + xCols.join('", "') + '"';
    src += `${df}.drop(columns=[${xColsStr}], axis=1, inplace=True)`;
    setCode(src);
    if (setMetadata) {
      setMetadata({
        df,
        xCols,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, xCols]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["xCols"]) setXCols(metadata["xCols"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ColumnRemoveIcon}
        label={"Delete columns in DataFrame"}
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
          <Select
            label={"Select DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />

          <MultiSelect
            label={"Select columns to delete"}
            selection={xCols}
            allOptions={allCols}
            setSelection={setXCols}
          />
        </>
      )}
    </div>
  );
};

export const DeleteColumnRecipe: IRecipe = {
  name: "Delete Column",
  longName: "Delete Column in Pandas DataFrame",
  parentName: "Data wrangling",
  description: `Use \`drop()\` function from Pandas package to delete column in DataFrame. You can drop single column or multiple columns at once. The drop operation is performed inplace.`,
  shortDescription: `Use \`drop()\` function from Pandas package to delete column in DataFrame. You can drop single column or multiple columns at once. The drop operation is performed inplace.`,
  codeExplanation:
    "Select column or list of columns and delete them from the DataFrame.",
  ui: DeleteColumn,
  Icon: ColumnRemoveIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["delete-column", "pandas"],
  defaultVariables: [
    {
      varName: "df",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3", "col4"],
      varColumnTypes: ["int", "int", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default DeleteColumnRecipe;
