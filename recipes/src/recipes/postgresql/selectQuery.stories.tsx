import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { SelectQuery } from "./selectQuery";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof SelectQuery> = {
    component: SelectQuery,
    title: "CodePieces/postgresql/queries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof SelectQuery>;

export const SelectQueryForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <SelectQuery {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
SelectQueryForm.args = {
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

export const SelectQueryEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <SelectQuery {...args} />
    </>
);
SelectQueryEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
