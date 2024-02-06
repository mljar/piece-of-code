import React from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { EngineIcon } from "../../icons/Engine";


export const Train: React.FC<IRecipeProps> = ({}) => {

    return (
      <div className="bg-white dark:bg-slate-800 p-4 rounded-md">
        <Title Icon={EngineIcon} title={"Train AutoML"} />  
      </div>  
      );
};

export const TrainRecipe: IRecipe = {
  name: "Train AutoML",
  description: "Train AutoML.",
  ui: Train,
  Icon: EngineIcon,
  requiredPackages: [["mljar-supervised", ">=1.1.2"]]
};

