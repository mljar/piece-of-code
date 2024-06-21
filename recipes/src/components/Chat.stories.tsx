import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IChatProps, Chat } from "./Chat";
import ExecutionStatus from "./ExecutionStatus";

const meta: Meta<typeof Chat> = {
  component: Chat,
  title: "CodePieces/Chat",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Chat>;

export const ChatForm: Story = (
  args: React.JSX.IntrinsicAttributes & IChatProps
) => {
  const [code, setCode] = useState("");
  return (
    <>
      <Chat {...args} setCode={setCode} />
      <pre>{code}</pre>
    </>
  );
};

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
  runCell: () => {},
  executionSteps: [
    // ["Wait for installation", ExecutionStatus.Wait],
    ["Install packages", ExecutionStatus.Success],
    // ["Run code", ExecutionStatus.Success],
    ["Load data", ExecutionStatus.Error],
    // ["Train ML model", ExecutionStatus.Warning],
  ],
  errorName: "Bad error",
  errorValue: "Very bad error",
  currentCode: "",
  getCellCode: () => "",
  clearExecutionSteps: () => {},
  addCell: () => {},
};
