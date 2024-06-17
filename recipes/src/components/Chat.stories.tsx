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
  
};