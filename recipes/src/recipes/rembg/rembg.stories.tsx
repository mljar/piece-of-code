import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { Rembg } from "./rembg";

const meta: Meta<typeof Rembg> = {
  component: Rembg,
  title: "CodePieces/rembg/rembg",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Rembg>;

export const RembgForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <Rembg {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
RembgForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
