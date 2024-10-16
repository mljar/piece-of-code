import React, { useEffect, useState } from "react";
import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { FileCsvIcon } from "../../icons/FileCsv";
import { Select } from "../../components/Select";
import { FileSmileIcon } from "../../icons/FileSmile";

const DOCS_URL = "python-load-example-dataset";

export const ExampleData: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [name, setName] = useState("df");
  const datasetOptions: [string, string][] = [
    ["Adult - 15 columns, 32,561 samples, binary target 'income'", "adult"],
    [
      "Breast cancer - 32 columns, 569 samples, binary target 'diagnosis'",
      "breast",
    ],
    [
      "Credit scoring - 12 columns, 150,000 samples, binary target 'SeriousDlqin2yrs'",
      "credit",
    ],
    [
      "Employee Attrition train - 35 columns, 1,200 samples, binary target 'Attrition'",
      "employee-train",
    ],

    [
      "Employee Attrition test - 35 columns, 270 samples, binary target 'Attrition'",
      "employee-test",
    ],
    ["Housing - 15 columns, 506 samples, contionuous target 'MEDV'", "housing"],
    [
      "House prices - 81 columns, 1,460 samples, contionuous target 'SalePrice'",
      "house-prices",
    ],
    ["Iris - 5 columns, 150 samples, multiclass target 'class'", "iris"],
    [
      "Pima Indians Diabetes - 9 columns, 768 samples, binary target 'Outcome'",
      "diabetes",
    ],
    [
      "SPECT train - 23 columns, 80 samples, binary target 'diagnosis'",
      "spect-train",
    ],
    [
      "SPECT test - 23 columns, 187 samples, binary target 'diagnosis'",
      "spect-test",
    ],
    [
      "Titanic train - 12 columns, 891 samples, binary target 'Survived'",
      "titanic-train",
    ],
    [
      "Titanic test - 12 columns, 418 samples, binary target 'Survived' included",
      "titanic-test",
    ],
    ["Wine - 14 columns, 178 samples, multiclass target 'class'", "wine"],
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
    } else if (dataset === "titanic-train") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/Titanic/train.csv";
    } else if (dataset === "titanic-test") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/Titanic/test_with_Survived.csv";
    } else if (dataset === "wine") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/wine/data.csv";
    } else if (dataset === "credit") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/credit/data.csv";
    } else if (dataset === "breast") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/breast_cancer_wisconsin/data.csv";
    } else if (dataset === "diabetes") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/diabetes/data.csv";
    } else if (dataset === "employee-train") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/employee_attrition/HR-Employee-Attrition-train.csv";
    } else if (dataset === "employee-test") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/employee_attrition/HR-Employee-Attrition-test.csv";
    } else if (dataset === "spect-train") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/spect/train.csv";
    } else if (dataset === "spect-test") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/spect/test.csv";
    } else if (dataset === "house-prices") {
      url =
        "https://raw.githubusercontent.com/pplonski/datasets-for-start/master/house_prices/data.csv";
    }

    let src = `# load example dataset\n`;
    src += `${name} = pd.read_csv("${url}"`;

    if (dataset === "iris" || dataset === "adult") {
      src += `, skipinitialspace=True`;
    }
    if (dataset === "diabetes") {
      src += `, index_col=False`;
    }
    src += ")\n";
    src += `# display DataFrame shape\n`;
    src += `print(f"Loaded data shape {${name}.shape}")\n`;
    src += `# display first rows\n`;
    src += `${name}.head()`;
    setCode(src);
    setPackages(["import pandas as pd"]);
    if (setMetadata) {
      setMetadata({
        name,
        dataset,
        docsUrl: DOCS_URL,
      });
    }
  }, [name, dataset]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["name"] !== undefined) setName(metadata["name"]);
      if (metadata["dataset"] !== undefined) setDataset(metadata["dataset"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={FileSmileIcon}
        label={"Sample datasets"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
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

Binary classification datasets:
- Adult dataset - predict whether an individual's income exceeds $50K/year based on census data,
- Breast Cancer dataset - predict the presence of breast cancer based on various medical attributes.
- Credit Scoring dataset - predict the likelihood of a customer defaulting on a loan.
- Employee Attrition dataset - predict whether an employee will leave the company based on various factors.
- Pima Indians Diabetes - predict the onset of diabetes based on diagnostic measurements.
- SPECT dataset - predict heart disease based on SPECT imaging data.
- Titanic dataset - predict the survival of passengers based on various features such as age, gender, and class.

Multiclass classification datasets:
- Iris dataset - classify iris flowers into three different species based on their physical attributes,
- Wine dataset - classify wines into different categories based on their chemical properties.

Regression datasets:
- Housing dataset - predict housing prices based on various features of the houses,
- House prices dataset - predict the final price of homes based on various features and attributes.

 
 `,
  shortDescription: `
  This code snippet demonstrates how to load example datasets into a pandas DataFrame from the [datasets-for-start](https://github.com/pplonski/datasets-for-start) GitHub repository. The datasets include binary classification tasks (Adult, Breast Cancer, Credit Scoring, Employee Attrition, Pima Indians Diabetes, SPECT, Titanic), multiclass classification tasks (Iris, Wine), and regression tasks (Housing, House Prices). An internet connection is required to fetch the data.`,
  codeExplanation: `
1. We are using Pandas package and \`read_csv()\` function. It is reading CSV files from URL. All datasets are available in the GitHub repository [datasets-for-start](https://github.com/pplonski/datasets-for-start).
2. After DataFrame is loaded, we display shape of data, number of rows and number of columns.
3. We display first rows from DataFrame.
  `,
  ui: ExampleData,
  Icon: FileSmileIcon,
  requiredPackages: [
    { importName: "pandas", installationName: "pandas", version: ">=1.0.0" },
  ],
  docsUrl: DOCS_URL,
  tags: ["sample", "example", "dataset", "pandas"],
};

export default ExampleDataRecipe;
