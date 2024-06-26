import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { BinaryTreeIcon } from "../../icons/BinaryTree";

const DOCS_URL = "visualize-decision-tree-dtreeviz";

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
  const [advanced, setAdvanced] = useState(false);

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
  const [depth, setDepth] = useState(5);

  useEffect(() => {
    if (model === "" || df === "") {
      return;
    }
    let src = `# create large empty figure\n`;
    src += `fig = plt.figure(figsize=(25,20))\n`;
    src += `# plot tree\n`;
    src += `_ = plot_tree(${model}, 
    feature_names=${df}.columns.tolist(),\n`;

    const isClassifier =
      variables
        .filter((v) => v.varName === model)
        .filter((v) => v.varType.includes("Classifier")).length > 0;
    if (isClassifier) {
      src += `    class_names=np.unique(${target}).tolist(),\n`;
    }
    src += `    max_depth=${depth},
    filled=True)`;

    setCode(src);
    setPackages([
      "import matplotlib.pyplot as plt",
      "from sklearn.tree import plot_tree",
      "import numpy as np"
    ]);
    if (setMetadata) {
      setMetadata({
        model,
        df,
        target,
        depth,
        variables: variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, df, target, depth]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["target"] !== undefined) setTarget(metadata["target"]);
      if (metadata["depth"] !== undefined) setDepth(metadata["depth"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={BinaryTreeIcon}
        label={"Visualize Decision Tree"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
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
        </>
      )}
    </div>
  );
};

export const VisualizeDecisionTreeRecipe: IRecipe = {
  name: "Visualize Decision Tree",
  longName: "Visualize Decision Tree",
  parentName: "Scikit-learn",
  description: `Please select your Decision Tree and visualize it. Visualization works for classifier and regressor trees. You can set max depth of visualization in **Advanced** options. Please be aware that tree deeper than 5 levels are not readable. For better visualization, please train shallow tree or limit max depth during visualization.`,
  shortDescription:
    "Visualize selected Decision Tree. Both classifier and regressor can be visualized.",
  codeExplanation: `Creates matplotlib figure with Decision Tree visualization.`,
  ui: VisualizeDecisionTree,
  Icon: BinaryTreeIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
    {
      importName: "matplotlib",
      installationName: "matplotlib",
      version: ">=3.8.4",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["decision-tree"],
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
