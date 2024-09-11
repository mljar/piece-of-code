import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import VisionLocalRecipe, { VisionLocal } from "./visionLocal";

const meta: Meta<typeof VisionLocal> = {
  component: VisionLocal,
  title: "CodePieces/open-ai/visionLocal",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof VisionLocal>;

export const VisionLocalForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <VisionLocal {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
VisionLocalForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: VisionLocalRecipe.defaultVariables,
  variablesStatus: "loaded",
};