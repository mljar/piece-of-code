import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { IRecipeProps } from "../base";
import { PostFileRequest } from "./post-file";

const meta: Meta<typeof PostFileRequest> = {
  component: PostFileRequest,
  title: "CodePieces/http-requests/PostFile",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof PostFileRequest>;

export const PostFileRequestForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <PostFileRequest {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  )
};
PostFileRequestForm.args = {
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
