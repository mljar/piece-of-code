import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import MyComponent, { MyComponentProps } from "./MyComponent";

const meta: Meta<typeof MyComponent> = {
  component: MyComponent,
  title: "CodePieces/MyComponent",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof MyComponent>;

export const Primary: Story = (args: React.JSX.IntrinsicAttributes & MyComponentProps) => (
  <>
    <MyComponent data-testId="InputField-id" {...args} />
  </>
);
Primary.args = {
  text: "Primary texts abecadło",
};
