import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { MultiImages } from "./multiRmBackground";

const meta: Meta<typeof MultiImages> = {
  component: MultiImages,
  title: "CodePieces/images-operations/multiRmBackground",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MultiImages>;

export const MultiImagesForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <MultiImages  {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
MultiImagesForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
