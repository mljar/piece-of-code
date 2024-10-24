import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { InsertQuery } from "./insertQuery";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof InsertQuery> = {
    component: InsertQuery,
    title: "CodePieces/postgresql/queries",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof InsertQuery>;

export const InsertQueryForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <InsertQuery {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
InsertQueryForm.args = {
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
    ],
};

export const InsertQueryEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <InsertQuery {...args} />
    </>
);
InsertQueryEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
