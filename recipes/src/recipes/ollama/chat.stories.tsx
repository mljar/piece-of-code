import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import ChatOllamaRecipe, { ChatOllama } from "./chat";

const meta: Meta<typeof ChatOllama> = {
  component: ChatOllama,
  title: "CodePieces/ollama/chat",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ChatOllama>;

export const ChatOllamaForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ChatOllama {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ChatOllamaForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: ChatOllamaRecipe.defaultVariables,
  variablesStatus: "loaded",
};