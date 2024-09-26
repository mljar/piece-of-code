import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { GetRequest } from "./get";

const meta: Meta<typeof GetRequest> = {
  component: GetRequest,
  title: "CodePieces/http-requests/Get",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof GetRequest>;

export const GetRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <GetRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
GetRequestForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [],
};
