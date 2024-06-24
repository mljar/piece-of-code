import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { WriteParquet } from "./writeParquet";

const meta: Meta<typeof WriteParquet> = {
  component: WriteParquet,
  title: "CodePieces/writeData/WriteParquet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof WriteParquet>;

export const WriteParquetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <WriteParquet {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
WriteParquetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3-object", "col4"],
      varColumnTypes: ["int", "int", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "X2",
      varType: "DataFrame",
      varColumns: ["feature1", "feature2-object", "feature3", "feature4"],
      varColumnTypes: ["int", "object", "int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};
