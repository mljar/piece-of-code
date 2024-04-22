import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadExcel } from "./readExcel";

const meta: Meta<typeof ReadExcel> = {
  component: ReadExcel,
  title: "CodePieces/readData/ReadExcel",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadExcel>;

export const ReadExcelForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadExcel {...args} />
  </>
);
ReadExcelForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
