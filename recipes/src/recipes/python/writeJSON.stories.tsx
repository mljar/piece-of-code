import React from "react";
import { Meta, StoryObj } from "@storybook/react"; 
import { IRecipeProps } from "../base";
import { WriteJSON } from "./writeJSON";



const meta: Meta<typeof WriteJSON> = {
  component: WriteJSON,
  title: "CodePieces/Python/WriteJSON",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof WriteJSON>;

export const WriteJSONStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <WriteJSON {...args} />
  </>
);

WriteJSONStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "my_automl",
      varType: "dict",
      varColumns: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "automl2",
      varType: "AutoML",
      varColumns: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "df",
      varType: "DataFrame",
      varColumns: ["col1", "col2"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export const WriteJSONEmptyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <WriteJSON {...args} />
  </>
);

WriteJSONEmptyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
