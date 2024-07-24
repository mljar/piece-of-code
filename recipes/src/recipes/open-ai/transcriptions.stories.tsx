import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { Transcriptions } from "./transcriptions";

const meta: Meta<typeof Transcriptions> = {
  component: Transcriptions,
  title: "CodePieces/open-ai/transcriptions",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Transcriptions>;

export const TranscriptionsForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <Transcriptions {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
TranscriptionsForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};