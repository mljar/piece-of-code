import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";
import { FileSmileIcon } from "../../icons/FileSmile";

export const ExampleData: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
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

    src += ")";
    setCode(src);
    setPackages(["import pandas as pd"]);
  }, [name, dataset]);

  return (
    <div>
      <Title Icon={FileSmileIcon} title={"Example Data"} />
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
  name: "Example Data",
  description:
    "Read example dataset to pandas DataFrame. Datasets are loaded from https://github.com/pplonski/datasets-for-start, you need internet connection to load them.",
  ui: ExampleData,
  Icon: FileSmileIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsLink: "http://mljar.com",
};

export default ExampleData;
