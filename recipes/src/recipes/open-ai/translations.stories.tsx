import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { Translations } from "./translations";

const meta: Meta<typeof Translations> = {
  component: Translations,
  title: "CodePieces/open-ai/translations",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Translations>;

export const TranslationsForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <Translations {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
TranslationsForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};