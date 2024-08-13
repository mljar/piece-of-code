import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { AppendRowRecipe, AppendRow } from "./appendRow";

const meta: Meta<typeof AppendRow> = {
  component: AppendRow,
  title: "CodePieces/google-sheets/appendRow",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof AppendRow>;

export const AppendRowForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <AppendRow {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
AppendRowForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variables: AppendRowRecipe.defaultVariables,
  variablesStatus: "loaded",
};