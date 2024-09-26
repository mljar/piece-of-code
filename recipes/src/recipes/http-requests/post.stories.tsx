import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { PostRequest } from "./post";

const meta: Meta<typeof PostRequest> = {
  component: PostRequest,
  title: "CodePieces/http-requests/Post",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PostRequest>;

export const PostRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <PostRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
PostRequestForm.args = {
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
