import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadParquet } from "./readParquet";

const meta: Meta<typeof ReadParquet> = {
  component: ReadParquet,
  title: "CodePieces/readData/ReadParquet",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadParquet>;

export const ReadParquetForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadParquet {...args} />
  </>
);

ReadParquetForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
