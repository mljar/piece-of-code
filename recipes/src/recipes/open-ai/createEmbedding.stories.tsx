import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import EmbeddingRecipe, { Embedding } from "./createEmbedding";

const meta: Meta<typeof Embedding> = {
  component: Embedding,
  title: "CodePieces/open-ai/createEmbedding",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Embedding>;

export const EmbeddingForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <Embedding {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
EmbeddingForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: EmbeddingRecipe.defaultVariables,
  variablesStatus: "loaded",
};