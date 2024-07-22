import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { DefineNewConnection } from "./defineNewConnection";

const meta: Meta<typeof DefineNewConnection> = {
    component: DefineNewConnection,
    title: "CodePieces/postgresql/connect",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof DefineNewConnection>;

export const DefineNewConnectionForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <DefineNewConnection {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
DefineNewConnectionForm.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
};
