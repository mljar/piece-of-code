import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { VisionURL } from "./visionURL";

const meta: Meta<typeof VisionURL> = {
  component: VisionURL,
  title: "CodePieces/open-ai/visionURL",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof VisionURL>;

export const VisionURLForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <VisionURL {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
VisionURLForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};