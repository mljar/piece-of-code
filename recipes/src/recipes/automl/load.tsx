import React from "react";

import { IRecipe, IRecipeProps } from "../base";
import { TargetArrowIcon } from "../../icons/TargetArrow";
import { FolderOpenIcon } from "../../icons/FolderOpen";
// import { IconCrystalBall } from "@tabler/icons-react";

export const LoadAutoML: React.FC<IRecipeProps> = ({}) => {
  return (
    <div>
      {/* <IconCrystalBall /> */}
      Load AutoML
    </div>
  );
};

export const LoadAutoMLRecipe: IRecipe = {
  name: "Load AutoML",
  description: "Load AutoML from folder",
  ui: LoadAutoML,
  Icon: FolderOpenIcon,
};
