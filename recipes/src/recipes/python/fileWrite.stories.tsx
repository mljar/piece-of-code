import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import FileWriteRecipe, { FileWrite } from "./fileWrite";

const meta: Meta<typeof FileWrite> = {
  component: FileWrite,
  title: "CodePieces/Python/fileWrite",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof FileWrite>;

export const FileWriteForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <FileWrite {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
FileWriteForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: FileWriteRecipe.defaultVariables,
};
