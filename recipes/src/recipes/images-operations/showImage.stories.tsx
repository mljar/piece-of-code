import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ShowImage } from "./showImage";

const meta: Meta<typeof ShowImage> = {
  component: ShowImage,
  title: "CodePieces/images-operations/showImage",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ShowImage>;

export const ShowImageForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ShowImage  {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ShowImageForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
