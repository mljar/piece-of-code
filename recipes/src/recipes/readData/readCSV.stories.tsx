import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ReadCSV } from "./readCSV";
import { IRecipeProps } from "../base";

const meta: Meta<typeof ReadCSV> = {
  component: ReadCSV,
  title: "CodePieces/readData/readCSV",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadCSV>;

export const ReadCSVForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadCSV data-testId="InputField-id" {...args} />
  </>
);
ReadCSVForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
