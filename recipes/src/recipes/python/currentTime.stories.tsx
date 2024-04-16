import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { CurrentTime } from "./currentTime";

const meta: Meta<typeof CurrentTime> = {
  component: CurrentTime,
  title: "CodePieces/Python/currentTime",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof CurrentTime>;

export const CurrentTimeForm: Story = (
  args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
  <>
    <CurrentTime {...args} />
  </>
);
CurrentTimeForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
