import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { SavePickle } from "./savePickle";

const meta: Meta<typeof SavePickle> = {
  component: SavePickle,
  title: "CodePieces/writeData/SavePickle",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SavePickle>;

export const SavePickleForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <SavePickle {...args} />
  </>
);
SavePickleForm.args = {
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
