import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { ReadCSV } from "./readCSV";
import { IRecipeProps } from "../base";

const meta: Meta<typeof ReadCSV> = {
  component: ReadCSV,
  title: "CodePieces/readData/readCSV",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ReadCSV>;

export const ReadCSVForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("")
    return(
        <>
            <ReadCSV {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    );
};
ReadCSVForm.args = {
  setCode: (src: string) => console.log(src),
  setPackages: (packages: string[]) => console.log(packages),
};
