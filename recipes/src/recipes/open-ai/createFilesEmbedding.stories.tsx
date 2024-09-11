import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import FilesEmbeddingRecipe, { FilesEmbedding } from "./createFIlesEmbedding";

const meta: Meta<typeof FilesEmbedding> = {
  component: FilesEmbedding,
  title: "CodePieces/open-ai/createFilesEmbedding",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FilesEmbedding>;

export const FilesEmbeddingForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <FilesEmbedding {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
FilesEmbeddingForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: FilesEmbeddingRecipe.defaultVariables,
  variablesStatus: "loaded",
};