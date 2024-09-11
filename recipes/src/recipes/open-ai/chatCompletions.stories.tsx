import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import ChatComplRecipe, { ChatCompl } from "./chatCompletions";

const meta: Meta<typeof ChatCompl> = {
  component: ChatCompl,
  title: "CodePieces/open-ai/chatCompletions",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ChatCompl>;

export const ChatComplForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ChatCompl {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ChatComplForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: ChatComplRecipe.defaultVariables,
  variablesStatus: "loaded",
};