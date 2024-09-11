import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import ImageGenRecipe, { ImageGen } from "./imageGen";

const meta: Meta<typeof ImageGen> = {
  component: ImageGen,
  title: "CodePieces/open-ai/imageGen",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ImageGen>;

export const ImageGenForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ImageGen {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ImageGenForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: ImageGenRecipe.defaultVariables,
  variablesStatus: "loaded",
};