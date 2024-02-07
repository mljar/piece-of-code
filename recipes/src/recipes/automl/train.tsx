import React, { useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { EngineIcon } from "../../icons/Engine";
import { Variable } from "../../components/Variable";
import { FileUpload } from "../../components/FileUpload";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";

export const Train: React.FC<IRecipeProps> = ({ variables }) => {
  const [name, setName] = useState("automl");
  const [resultsPath, setResultsPath] = useState("auto");
  let matrices = [] as string[];
  let vectors = [] as string[];

  if (variables) {
    matrices = Object.entries(variables)
      .filter((e) => e[1] === "pd.DataFrame")
      .map((e) => e[0]);
    vectors = Object.entries(variables)
      .filter((e) => e[1] === "pd.Series")
      .map((e) => e[0]);
  }
  const [X, setX] = useState(matrices.length ? matrices[0] : "");
  const [y, setY] = useState(vectors.length ? vectors[0] : "");
  const modeOptions = [
    ["Explain - initial data exploration", "explain"],
    ["Performance - production ready ML", "performance"],
    ["Compete - highly tuned ML", "compete"],
  ] as [string, string][];
  const [mode, setMode] = useState("explain");
  const [trainingTime, setTrainingTime] = useState(300);

  return (
    <div>
      <Title Icon={EngineIcon} title={"Train AutoML"} />
      <div className="grid md:grid-cols-2 md:gap-4">
        <Variable
          label={"AutoML variable name"}
          name={name}
          setName={setName}
        />
        <Variable
          label={"Where to save results?"}
          name={resultsPath}
          setName={setResultsPath}
        />
      </div>
      <div className="grid md:grid-cols-2 md:gap-4">
        <div>
          <Select
            label={"X training matrix (pandas.DataFrame)"}
            option={X}
            options={matrices.map((m) => [m, m])}
            setOption={setX}
          />
          <Select
            label={"y training vector (pandas.Series)"}
            option={y}
            options={vectors.map((m) => [m, m])}
            setOption={setY}
          />
        </div>
        <div>
          <Select
            label={"Training mode"}
            option={mode}
            options={modeOptions}
            setOption={setMode}
          />
          <Numeric
            label={"Training time [in seconds]"}
            name={trainingTime}
            setName={setTrainingTime}
          />
        </div>
      </div>
    </div>
  );
};

export const TrainRecipe: IRecipe = {
  name: "Train AutoML",
  description: "Train AutoML.",
  ui: Train,
  Icon: EngineIcon,
  requiredPackages: [["mljar-supervised", ">=1.1.2"]],
};
