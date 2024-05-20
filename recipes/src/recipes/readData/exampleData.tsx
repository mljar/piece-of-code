import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { FileSmileIcon } from "../../icons/FileSmile";

export const ExampleData: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  meta,
  setMeta,
}) => {
  const [name, setName] = useState("df");
  const datasetOptions: [string, string][] = [
    ["Iris - 5 attributes, 150 samples, multiclass target 'class'", "iris"],
    ["Adult - 15 attributes, 32,561 samples, binary target 'income'", "adult"],
    [
      "Housing - 15 attributes, 506 samples, contionuous target 'MEDV'",
      "housing",
    ],
  ];
  const [dataset, setDataset] = useState(datasetOptions[0][1]);

  useEffect(() => {
    if (meta) {
      if (meta["name"]) setName(meta["name"]);
      if (meta["dataset"]) setDataset(meta["dataset"]);
    }
  }, [meta]);

  useEffect(() => {
    let url = "";
    if (dataset === "iris") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/iris/data.csv";
    } else if (dataset === "adult") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/adult/data.csv";
    } else if (dataset === "housing") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/housing/data.csv";
    }

    let src = `# load example dataset\n`;
    src += `${name} = pd.read_csv("${url}"`;

    if (dataset === "iris" || dataset === "adult") {
      src += `, skipinitialspace=True`;
    }

    src += ")\n";
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMeta) {
      setMeta({
        name,
        dataset,
      });
    }
  }, [name, dataset]);

  return (
    <div>
      <Title Icon={FileSmileIcon} label={"Example Data"} />
      <Variable
        label={"Allocate DataFrame to variable"}
        name={name}
        setName={setName}
      />
      <Select
        label={"Example datasets"}
        option={dataset}
        setOption={setDataset}
        options={datasetOptions}
      />
    </div>
  );
};

export const ExampleDataRecipe: IRecipe = {
  name: "Sample datasets",
  longName: "Load sample dataset",
  parentName: "Read data",
  description: `Read example dataset to pandas DataFrame. Datasets are loaded from GitHub repository [datasets-for-start](https://github.com/pplonski/datasets-for-start), you need an internet connection to load them. 

You can select from three datasets:
 - Iris dataset - it can be used in multi-class classification tasks, 
 - Adult dataset - it can be used in binary classification tasks,
 - Housing dataset - it can be used in regression tasks.`,
  shortDescription: "Load sample dataset for analysis",
  codeExplanation: "",
  ui: ExampleData,
  Icon: FileSmileIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: "python-load-example-dataset",
  tags: ["sample", "example", "dataset", "pandas"],
};

export default ExampleDataRecipe;
