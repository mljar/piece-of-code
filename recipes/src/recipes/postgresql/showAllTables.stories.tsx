import React, { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";

import { IRecipeProps } from "../base";
import { ShowAllTables } from "./showAllTables";
import { CONNECITON_PSYCOPG_TYPE } from "./utils";

const meta: Meta<typeof ShowAllTables> = {
    component: ShowAllTables,
    title: "CodePieces/postgresql/tables",
    argTypes: {},
};
export default meta;

type Story = StoryObj<typeof ShowAllTables>;

export const ShowAllTablesForm: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => {
    const [code, setCode] = useState("");
    return (
        <>
            <ShowAllTables {...args} setCode={setCode} />
            <pre>{code}</pre>
        </>
    )
};
ShowAllTablesForm.args = {
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

export const ShowAllTablesEmptyConnStory: Story = (
    args: React.JSX.IntrinsicAttributes & IRecipeProps
) => (
    <>
        <ShowAllTables {...args} />
    </>
);
ShowAllTablesEmptyConnStory.args = {
    setCode: (src: string) => console.log(src),
    setPackages: (packages: string[]) => console.log(packages),
    variablesStatus: "loaded",
    variables: [],
};
