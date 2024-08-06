import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { UpdateColumn } from "./updateColumn";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof UpdateColumn> = {
    component: UpdateColumn,
    title: "CodePieces/postgresql/queries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UpdateColumn>;

export const UpdateColumnForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <UpdateColumn {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
UpdateColumnForm.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [
        {
            varName: "conn",
            varType: CONNECITON_PSYCOPG_TYPE,
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

export const UpdateColumnEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <UpdateColumn {...args} />
    </>
);
UpdateColumnEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
