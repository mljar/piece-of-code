import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { ReadJSON } from "./readJSON";


const meta: Meta<typeof ReadJSON> = {
  component: ReadJSON,
  title: "CodePieces/Python/ReadJSON",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadJSON>;

export const ReadJSONStory: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <ReadJSON {...args} />
  </>
);

ReadJSONStory.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
