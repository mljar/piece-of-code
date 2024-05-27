import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ExampleData } from "./exampleData";
import { IRecipeProps } from "../base";

const meta: Meta<typeof ExampleData> = {
  component: ExampleData,
  title: "CodePieces/readData/ExampleData",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ExampleData>;

export const ExampleDataForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ExampleData {...args} />
    <div className="poc-dark">
      <div className="poc-bg-white dark:poc-bg-slate-700 poc-p-2">
        <ExampleData {...args} />
      </div>
    </div>
  </>
);
ExampleDataForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  metadata: {},
};
