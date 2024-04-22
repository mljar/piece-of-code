import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadXml } from "./readXml";

const meta: Meta<typeof ReadXml> = {
  component: ReadXml,
  title: "CodePieces/readData/ReadXml",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadXml>;

export const ReadXmlForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadXml {...args} />
  </>
);
ReadXmlForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
