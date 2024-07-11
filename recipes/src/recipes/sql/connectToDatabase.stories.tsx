import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ConnectToDatabase } from "./connectToDatabase";

const meta: Meta<typeof ConnectToDatabase> = {
  component: ConnectToDatabase,
  title: "CodePieces/sql/connect",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ConnectToDatabase>;

export const ConnectToDatabaseForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
  <>
    <ConnectToDatabase {...args} setCode={setCode}/>
    <pre>{code}</pre>
  </>
  )
};
ConnectToDatabaseForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
