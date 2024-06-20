import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IChatProps, Chat } from "./Chat";

const meta: Meta<typeof Chat> = {
  component: Chat,
  title: "CodePieces/Chat",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Chat>;

export const ChatForm: Story = (
  args: React.JSX.IntrinsicAttributes & IChatProps
) => (
  <>
    <Chat {...args} />
  </>
);

ChatForm.args = {
  variablesStatus: "loaded",
  variables: [
    {
      varName: "my_classifier",
      varType: "DecisionTreeClassifier",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "my_regressor",
      varType: "DecisionTreeRegressor",
      varColumns: [],
      varColumnTypes: [],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: false,
      isWidget: false,
    },
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2-object", "col3-object", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "X2",
      varType: "DataFrame",
      varColumns: [
        "col1",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
        "col2-object",
        "col3-object",
        "col4",
      ],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "10x10",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: ["target"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
  setCode: (src: string) => {}, 
};
