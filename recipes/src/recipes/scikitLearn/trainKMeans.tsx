import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";

import { Numeric } from "../../components/Numeric";
import { ChartScatter3DIcon } from "../../icons/ChartScatter3D";

const DOCS_URL = "scikit-learn-k-means";

export const TrainKMeans: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [model, setModel] = useState("kmeans");
  const [k, setK] = useState(8);
  const [iters, setIters] = useState(300);
  const [randomState, setRandomState] = useState(123);

  useEffect(() => {
    let src = `# initialize k-means\n`;
    src += `${model} = KMeans(`;
    src += `n_clusters=${k}`;
    src += `, max_iter="${iters}"`;
    src += `, random_state=${randomState}`;
    src += `)\n`;
    src += `# display object information\n`;
    src += `${model}`;
    setCode(src);
    setPackages(["from sklearn.cluster import KMeans"]);
    if (setMetadata) {
      setMetadata({
        k,
        iters,
        randomState,
        docsUrl: DOCS_URL,
      });
    }
  }, [k, iters, randomState]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["k"] !== undefined) setK(metadata["k"]);
      if (metadata["iters"] !== undefined) setIters(metadata["iters"]);
      if (metadata["randomState"] !== undefined)
        setRandomState(metadata["randomState"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ChartScatter3DIcon}
        label={"k-Means"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />

      <>
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Variable
            label={"Assign k-Means model to variable"}
            name={model}
            setName={setModel}
            tooltip="K-Means model can be later used for computing predictions on new data."
          />
          <Numeric
            label={"Number of centroids (k)"}
            name={k}
            setName={setK}
            minValue={1}
          />
        </div>
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Numeric
            label={"Number of training iterations"}
            name={iters}
            setName={setIters}
            minValue={0}
          />
          <Numeric
            label={"Seed value"}
            name={randomState}
            setName={setRandomState}
            minValue={0}
          />
        </div>
      </>
    </div>
  );
};

export const TrainKMeansRecipe: IRecipe = {
  name: "k-Means",
  longName: "Scikit-learn k-Means",
  parentName: "Scikit-learn",
  description: `Create K-Means clustering model for unsupervised learning. This algorithm partitions the data into a predefined number of clusters (k), where each data point belongs to the cluster with the nearest mean (centroid). The performance of the K-Means model depends on the number of clusters 
  k and the initialization of the centroids. After model creation, please fit it with the data.`,
  shortDescription: `Create a K-Means model for clustering, which partitions data into k clusters. Performance depends on the number of clusters and centroid initialization. Fit the model with the data afterward.`,
  codeExplanation: `Create a K-Means model for clustering, which partitions data into k clusters. Fit the model with the data afterward.`,
  ui: TrainKMeans,
  Icon: ChartScatter3DIcon,
  requiredPackages: [
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.0",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["k-means"],
};

export default TrainKMeansRecipe;
