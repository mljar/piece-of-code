import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import TextToSpeechRecipe, { TextToSpeech } from "./textToSpeech";

const meta: Meta<typeof TextToSpeech> = {
  component: TextToSpeech,
  title: "CodePieces/open-ai/textToSpeech",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof TextToSpeech>;

export const TextToSpeechForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <TextToSpeech {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
TextToSpeechForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: TextToSpeechRecipe.defaultVariables,
  variablesStatus: "loaded",
};