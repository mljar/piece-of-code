import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { UpdateSelected } from "./updateSelected";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof UpdateSelected> = {
    component: UpdateSelected,
    title: "CodePieces/postgresql/queries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof UpdateSelected>;

export const UpdateSelectedForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <UpdateSelected {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
UpdateSelectedForm.args = {
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
        {
            varName: "values",
            varType: "list",
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "[val1, val2, val3, val4, val5]",
            isMatrix: false,
            isWidget: false,
        },
        {
            varName: "values2",
            varType: "list",
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "[val1, val2]",
            isMatrix: false,
            isWidget: false,
        },
        {
            varName: "ids",
            varType: "list",
            varColumns: [""],
            varColumnTypes: [""],
            varSize: "",
            varShape: "",
            varContent: "[1, 2, 3, 4, 5]",
            isMatrix: false,
            isWidget: false,
        },
    ],
};

export const UpdateSelectedEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <UpdateSelected {...args} />
    </>
);
UpdateSelectedEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};

