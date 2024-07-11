import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { SelectQuerry } from "./selectQuerry";

const meta: Meta<typeof SelectQuerry> = {
    component: SelectQuerry,
    title: "CodePieces/sql/querries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SelectQuerry>;

export const SelectQuerryForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <SelectQuerry {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
SelectQuerryForm.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [
        {
            varName: "conn",
            varType: "connection",
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "",
            isMatrix: false,
            isWidget: false,
        },
    ],
};

export const SelectQuerryEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <SelectQuerry {...args} />
    </>
);
SelectQuerryEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
