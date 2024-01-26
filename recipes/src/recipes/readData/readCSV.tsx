// MyComponent.tsx
import React from "react";
// import './MyComponent.css'; // Import the CSS file

import { IRecipe, IRecipeSet, IProps } from "../base";
import { IconFileTypeCsv } from '@tabler/icons-react';

export interface ReadCSVProps extends IProps {
  text: string;
}

export const ReadCSV: React.FC<IProps> = ({ }) => {
  return <div className="my-component"><IconFileTypeCsv/>Read file</div>;
};

// export default ReadCSV;

export const readDataRecipe: IRecipeSet = {
  name: "Read data",
  description: "Read data",
  icon: IconFileTypeCsv
};

export const readCSVRecipe: IRecipe = {
  parent: readDataRecipe,
  name: "Read CSV",
  description: "Load CSV file into dataframe.",
  ui: ReadCSV,
};

export default readCSVRecipe;