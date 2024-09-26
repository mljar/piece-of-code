import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { PatchRequest } from "./patch";

const meta: Meta<typeof PatchRequest> = {
  component: PatchRequest,
  title: "CodePieces/http-requests/Patch",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PatchRequest>;

export const PatchRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <PatchRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
PatchRequestForm.args = {
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
