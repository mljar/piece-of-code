import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";
import { CategoryIcon } from "../../icons/Category";

const DOCS_URL = "python-convert-categorical-to-integer";

export const CategoricalToInt: React.FC<IRecipeProps> = ({
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
  const [encoder, setEncoder] = useState("my_encoder");
  const [allCols, setAllCols] = useState([] as string[]);
  const [xCols, setXCols] = useState([] as string[]);
  const allHandleUnknowns = [
    "use_encoded_value - assign constant to new unseen values",
    "error - raise error for unseen values",
  ];
  const [handleUnknown, setHandleUnknown] = useState(allHandleUnknowns[0]);
  const [encodedMissingValue, setEncodedMissingValue] = useState("-1");

  useEffect(() => {
    if (df !== "") {
      try {
        const variable = variables.filter((v) => v.varName === df)[0];
        let cols: string[] = [];
        for (let i = 0; i < variable.varColumns.length; i++) {
          if (variable.varColumnTypes[i] === "object") {
            cols.push(variable.varColumns[i]);
          }
        }
        setAllCols(cols);
        setXCols(cols);
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    if (!xCols) {
      return;
    }
    let src = `# initialize encoder\n`;
    src += `${encoder} = OridnalEncoder(`;
    if (handleUnknown === allHandleUnknowns[0]) {
      src += `handle_unknown="use_encoded_value"`;
      src += `, encoded_missing_value=${encodedMissingValue}`;
    } else {
      src += `handle_unknown="error"`;
    }
    src += `)\n`;
    src += `# fit and convert selected columns\n`;
    const xColsStr = '"' + xCols.join('", "') + '"';
    const d = `${df}[[${xColsStr}]]`;
    src += `${d} = ${encoder}.fit_transform(${d})\n`;
    src += `# display values after conversion\n`;
    src += `print("Columns after conversion categoricals to integers")\n`;
    src += `${d}`;
    setCode(src);
    setPackages(["from sklearn.preprocessing import OrdinalEncoder"]);

    if (setMetadata) {
      setMetadata({
        df,
        xCols,
        encoder,
        handleUnknown,
        encodedMissingValue,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, xCols, encoder, handleUnknown, encodedMissingValue]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"]) setDf(metadata["df"]);
      if (metadata["xCols"]) setXCols(metadata["xCols"]);
      if (metadata["encoder"]) setEncoder(metadata["encoder"]);
      if (metadata["handleUnknown"])
        setHandleUnknown(metadata["handleUnknown"]);
      if (metadata["encodedMissingValue"])
        setEncodedMissingValue(metadata["encodedMissingValue"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CategoryIcon}
        label={"Categorical to integer"}
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
          <Variable
            label={"Encoder name"}
            name={encoder}
            setName={setEncoder}
            tooltip="Assign encoder object to variable for later use on new data"
          />
          <Select
            label={"Select DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          {allCols.length === 0 && (
            <p className="text-base text-gray-800 dark:text-white">
              All columns has numeric values in the selected DataFrame. Nothing
              to convert :-)
            </p>
          )}
          {allCols.length > 0 && (
            <>
              <MultiSelect
                label={"Select columns for conversion"}
                selection={xCols}
                allOptions={allCols}
                setSelection={setXCols}
              />

              <Select
                label={"How to handle unknow values (unseen during fit)"}
                option={handleUnknown}
                options={allHandleUnknowns.map((c) => [c, c])}
                setOption={setHandleUnknown}
              />
              {handleUnknown === allHandleUnknowns[0] && (
                <Variable
                  label={"Value to assign to unknown values"}
                  name={encodedMissingValue}
                  setName={setEncodedMissingValue}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export const CategoricalToIntRecipe: IRecipe = {
  name: "Categorical to integer",
  longName: "Convert categorical features to integer",
  parentName: "Data wrangling",
  description: `Convert features with non-numeric values (categoricals) to integers. Values are converted to integers from range 0 to n_categories-1. 
There are two options to handle unknown values during transformation:
  
- raise error when new unknown value is present during transofmration,
- assign contant value for unknown values, for example -1.

The object that is used for preprocessing is called encoder. In this recipe, we are using [OrdinalEncoder from scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.OrdinalEncoder.html).

You can use encoder object on new dataset. Please check **Save to pickle** recipe to save the object for later use.
    `,
  shortDescription:
    "Convert features with non-numeric values (categoricals) to integers",
  codeExplanation: "",
  ui: CategoricalToInt,
  Icon: CategoryIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
    { importName: "sklearn", installationName: "sklearn", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["pandas", "categorical"],
  defaultVariables: [
    {
      varName: "df_1",
      varType: "DataFrame",
      varColumns: ["col1", "col2-object", "col3-object", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
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

export default CategoricalToIntRecipe;
