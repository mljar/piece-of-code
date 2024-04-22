import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ReadHtml } from "./readHtml";

const meta: Meta<typeof ReadHtml> = {
  component: ReadHtml,
  title: "CodePieces/readData/ReadHtml",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadHtml>;

export const ReadHtmlForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadHtml {...args} />
  </>
);
ReadHtmlForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
