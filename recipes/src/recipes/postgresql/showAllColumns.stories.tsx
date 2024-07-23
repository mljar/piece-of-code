import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ShowAllColumns } from "./showAllColumns";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof ShowAllColumns> = {
    component: ShowAllColumns,
    title: "CodePieces/postgresql/queries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ShowAllColumns>;

export const ShowAllColumnsForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <ShowAllColumns {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
ShowAllColumnsForm.args = {
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

export const ShowAllColumnsEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <ShowAllColumns {...args} />
    </>
);
ShowAllColumnsEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
