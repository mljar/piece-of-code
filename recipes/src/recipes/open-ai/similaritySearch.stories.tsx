import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { SimilaritySearch } from "./similaritySearch";

const meta: Meta<typeof SimilaritySearch> = {
  component: SimilaritySearch,
  title: "CodePieces/open-ai/similaritySearch",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SimilaritySearch>;

export const SimilaritySearchForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <SimilaritySearch {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
SimilaritySearchForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};