import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import ImportanceRecipe, { Importance } from "./importance";

const meta: Meta<typeof Importance> = {
  component: Importance,
  title: "CodePieces/Scikit-learn/Importance",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Importance>;

export const ImportanceStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Importance {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <Importance {...args} />
      </div>
    </div>
  </>
);

ImportanceStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: ImportanceRecipe.defaultVariables
};

export const ImportanceEmptyDfStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <Importance {...args} />
  </>
);
ImportanceEmptyDfStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
