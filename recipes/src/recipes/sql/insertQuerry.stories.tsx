import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { InsertQuerry } from "./insertQuerry";

const meta: Meta<typeof InsertQuerry> = {
    component: InsertQuerry,
    title: "CodePieces/sql/querries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof InsertQuerry>;

export const InsertQuerryForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <InsertQuerry {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
InsertQuerryForm.args = {
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

export const InsertQuerryEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <InsertQuerry {...args} />
    </>
);
InsertQuerryEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
