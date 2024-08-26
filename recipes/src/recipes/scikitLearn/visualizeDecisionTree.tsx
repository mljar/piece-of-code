import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { BinaryTreeIcon } from "../../icons/BinaryTree";

const DOCS_URL = "visualize-decision-tree-supertree";

export const VisualizeDecisionTree: React.FC<IRecipeProps> = ({
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

  // ill add advanced with max depth choosing when tomek adds it to the supertree library
  // const [advanced, setAdvanced] = useState(false);

  const dataObjects = variables.filter((v) => v.isMatrix).map((v) => v.varName);
  const models = variables
    .filter(
      (v) =>
        v.varType.includes("DecisionTreeClassifier") ||
        v.varType.includes("DecisionTreeRegressor")
    )
    .map((v) => v.varName);
  const [model, setModel] = useState(models.length > 0 ? models[0] : "");
  const [df, setDf] = useState(dataObjects.length ? dataObjects[0] : "");

  const [target, setTarget] = useState(
    dataObjects.length > 1 ? dataObjects[1] : ""
  );
  // ill add advanced with max depth choosing when tomek adds it to the supertree library
  // const [depth, setDepth] = useState(5);

  useEffect(() => {
    if (model === "" || df === "") {
      return;
    }
    let src = `# plot tree\n`;
    src += `_ = SuperTree(\n`;
    src += `    model=${model},\n`;
    src += `    feature_data=${df},\n`;
    src += `    target_data=${target},\n`;
    // feature_names=df.feature_names, target_names=df.target_names
    src += `).show_tree()`;

    setCode(src);
    setPackages([
      // "import matplotlib.pyplot as plt",
      // "from sklearn.tree import plot_tree",
      // "import numpy as np",
      "from supertree import SuperTree"
    ]);
    if (setMetadata) {
      setMetadata({
        model,
        df,
        target,
        // ill add advanced with max depth choosing when tomek adds it to the supertree library
        // depth,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
    // ill add advanced with max depth choosing when tomek adds it to the supertree library
  }, [model, df, target, /* depth */]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      // ill add advanced with max depth choosing when tomek adds it to the supertree library
      // if (metadata["depth"] !== undefined) setDepth(metadata["depth"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={BinaryTreeIcon}
        label={"Visualize Decision Tree"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      {/*
      // ill add advanced with max depth choosing when tomek adds it to the supertree library
      advanced={advanced}
      setAdvanced={setAdvanced}
      */}
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no data objects in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {models.length === 0 && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no model objects available, please construct the model. For
          example, create Decision Tree model.
        </p>
      )}
      {df !== "" && models.length > 0 && (
        <>
          <Select
            label={"Select Decision Tree model"}
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
          {/*
          // ill add advanced with max depth choosing when tomek adds it to the supertree library
          {advanced && (
            <>
              <Numeric
                label={"Max depth of visualization"}
                minValue={1}
                maxValue={12}
                name={depth}
                setName={setDepth}
              />
            </>
          )}
          */}
        </>
      )}
    </div>
  );
};

export const VisualizeDecisionTreeRecipe: IRecipe = {
  name: "Visualize Decision Tree",
  longName: "Visualize Decision Tree",
  parentName: "Scikit-learn",
  description: `Please select your Decision Tree and visualize it. Visualization works for classifier and regressor trees. Powered by Super Tree, developed in house by MLJAR`,
  // `You can set max depth of visualization in **Advanced** options.`
  // `Please be aware that tree deeper than 5 levels are not readable. For better visualization, please train shallow tree or limit max depth during visualization.`,
  shortDescription:
    "Visualize selected Decision Tree. Both classifier and regressor can be visualized.",
  codeExplanation: `Creates matplotlib figure with Decision Tree visualization.`,
  ui: VisualizeDecisionTree,
  Icon: BinaryTreeIcon,
  requiredPackages: [
    {
      importName: "supertree",
      installationName: "supertree",
      version: ">=0.0.4",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["decision-tree", "supertree"],
  defaultVariables: [
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
    {
      varName: "X",
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
  ],
};

export default VisualizeDecisionTreeRecipe;
