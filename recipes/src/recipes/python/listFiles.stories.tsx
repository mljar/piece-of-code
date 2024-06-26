import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ListFiles } from "./listFiles";
import { IRecipeProps } from "../base";

const meta: Meta<typeof ListFiles> = {
  component: ListFiles,
  title: "CodePieces/Python/listFiles",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ListFiles>;

export const ListFilesForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <ListFiles {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};
ListFilesForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
