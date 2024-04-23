import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { PrettyPrintJSON } from "./prettyPrintJSON";


const meta: Meta<typeof PrettyPrintJSON> = {
  component: PrettyPrintJSON,
  title: "CodePieces/Python/PrettyPrintJSON",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PrettyPrintJSON>;

export const PrettyPrintJSONStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <PrettyPrintJSON {...args} />
  </>
);

PrettyPrintJSONStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "my_automl",
      varType: "dict",
      varColumns: [],
      varColumnTypes: [],
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
      varColumnTypes: [],
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
      varColumnTypes: ["int", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
  ],
};

export const PrettyPrintJSONEmptyStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <PrettyPrintJSON {...args} />
  </>
);

PrettyPrintJSONEmptyStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
