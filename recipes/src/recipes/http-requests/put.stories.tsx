import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { PutRequest } from "./put";

const meta: Meta<typeof PutRequest> = {
  component: PutRequest,
  title: "CodePieces/http-requests/Put",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PutRequest>;

export const PutRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <PutRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
PutRequestForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
  variablesStatus: "loaded",
  variables: [
    {
      varName: "json1",
      varType: "dict",
      varColumns: [""],
      varColumnTypes: [""],
      varSize: "",
      varShape: "",
      varContent: '{"abc": "abc"}',
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "json2",
      varType: "dict",
      varColumns: [""],
      varColumnTypes: [""],
      varSize: "",
      varShape: "",
      varContent: '{"abcdfgh": "abcdfgh"}',
      isMatrix: false,
      isWidget: false,
    },
  ],
};
