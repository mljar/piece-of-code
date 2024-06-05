import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";

import { Numeric } from "../../components/Numeric";
import { TopologyStarIcon } from "../../icons/TopologyStar";

const DOCS_URL = "scikit-learn-k-nearest-neighbors";

export const TrainKNN: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("knn");
  const CLASSIFICATION = "Classification";
  const REGRESSION = "Regression";
  const mlTasks = [CLASSIFICATION, REGRESSION];
  const [mlTask, setMlTask] = useState(mlTasks[0]);
  const [k, setK] = useState(5);

  const weights = ["uniform", "distance"];
  const [weight, setWeight] = useState(weights[0]);

  const metrics = ["euclidean", "manhattan", "cosine", "haversine"];
  const [metric, setMetric] = useState(metrics[0]);

  const [nJobs, setNJobs] = useState(-1);

  useEffect(() => {
    let src = `# initialize k-Nearest Neighbors\n`;
    if (mlTask === mlTasks[0]) {
      src += `${model} = KNeighborsClassifier(`;
      setPackages(["from sklearn.neighbors import KNeighborsClassifier"]);
    } else {
      src += `${model} = KNeighborsRegressor(`;
      setPackages(["from sklearn.neighbors import KNeighborsRegressor"]);
    }
    src += `n_neighbors=${k}`;

    if (weight !== "uniform") {
      src += `, weights="${weight}"`;
    }
    src += `, metric="${metric}"`;
    src += `, n_jobs=${nJobs}`;

    src += `)\n`;
    src += `# display model card\n`;
    src += `${model}`;

    setCode(src);
    if (setMetadata) {
      setMetadata({
        model,
        mlTask,
        k,
        weight,
        metric,
        nJobs,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, mlTask, k, weight, metric, nJobs]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"]) setModel(metadata["model"]);
      if (metadata["mlTask"]) setMlTask(metadata["mlTask"]);
      if (metadata["k"]) setK(metadata["k"]);
      if (metadata["weight"]) setWeight(metadata["weight"]);
      if (metadata["metric"]) setMetric(metadata["metric"]);
      if (metadata["nJobs"]) setNJobs(metadata["nJobs"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TopologyStarIcon}
        label={"k-Nearest Neighbors"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />

      <>
        <Variable
          label={"Assign Random Forest model to variable"}
          name={model}
          setName={setModel}
          tooltip="Decision Tree model can be later reused for computing predictions on new data."
        />
        <Select
          label={"Machine Learning task"}
          option={mlTask}
          options={mlTasks.map((d) => [d, d])}
          setOption={setMlTask}
        />

        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Numeric
            label={"Number of neighbors"}
            name={k}
            setName={setK}
            minValue={1}
          />
          <Numeric
            label={"Number of CPUs to use"}
            name={nJobs}
            setName={setNJobs}
            minValue={-1}
            tooltip="To use all CPUs for training please set -1"
          />
        </div>

        {advanced && (
          <>
            <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
              <Select
                label="Weight function used in prediction"
                options={weights.map((w) => [w, w])}
                option={weight}
                setOption={setWeight}
                tooltip={
                  "Weight function used in prediction, 'uniform' means all points in each neighborhood are weighted equally, 'distance' means weight points by the inverse of their distance"
                }
              />
              <Select
                label="Distance metric"
                options={metrics.map((w) => [w, w])}
                option={metric}
                setOption={setMetric}
                tooltip={
                  "Metric to use for distance computation between neighbors."
                }
              />
            </div>
          </>
        )}
      </>
    </div>
  );
};

export const TrainKNNRecipe: IRecipe = {
  name: "k-Nearest Neighbors",
  longName: "Scikit-learn k-Nearest Neighbors",
  parentName: "Scikit-learn",
  description: `Create k-Nearest Neighbors (k-NN) model for classification or regression. The performance of this model mainly depends on number of neighbors and metric used to compute distance. After model creation please fit it with data.`,
  shortDescription: `Create k-Nearest Neighbors (k-NN) model for classification or regression.`,
  codeExplanation: `
  Create model for training with k-Nearest Neighbors algorithm. The speed of training greatly depends on data size, both on rows and columns number.
`,
  ui: TrainKNN,
  Icon: TopologyStarIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["nearest-neighbors", "classification", "regression"],
};

export default TrainKNNRecipe;
