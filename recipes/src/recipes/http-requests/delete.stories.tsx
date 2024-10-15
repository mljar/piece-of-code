import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { DeleteRequest } from "./delete";

const meta: Meta<typeof DeleteRequest> = {
  component: DeleteRequest,
  title: "CodePieces/http-requests/Delete",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DeleteRequest>;

export const DeleteRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <DeleteRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
DeleteRequestForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
