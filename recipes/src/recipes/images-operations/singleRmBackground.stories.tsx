import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { SingleImage } from "./singleRmBackground";

const meta: Meta<typeof SingleImage> = {
  component: SingleImage,
  title: "CodePieces/images-operations/singleRmBackground",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SingleImage>;

export const RembgForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <SingleImage {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
RembgForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
