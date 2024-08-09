import React from "react";
import { Meta, StoryObj } from "@storybook/react";

import { Welcome, IWelcomeProps } from "./Welcome";

const meta: Meta<typeof Welcome> = {
  component: Welcome,
  title: "CodePieces/Welcome",
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Welcome>;

export const WelcomeInstallPkgs: Story = (
  args: React.JSX.IntrinsicAttributes & IWelcomeProps
) => (
  <>
    <Welcome {...args} />
  </>
);

WelcomeInstallPkgs.args = {
  title: "Hello",
  description: "Some desc",
  packages: [
    {
      importName: "pandas",
      installationName: "pandas",
      version: ">1.1.0",
    },
    {
      importName: "numpy",
      installationName: "numpy",
      version: ">1.1.0",
    },
    {
      importName: "supervised",
      installationName: "mljar-supervised",
      version: ">1.1.0",
    },
    {
      importName: "catboost",
      installationName: "catboost",
      version: ">1.1.0",
    },
  ],
  checkedPackages: {
    pandas: "2.2.0",
    numpy: "install",
    ["mljar-supervised"]: "error",
  },
  checkPackage: (pkgInstallName: string, pkgImportName: string) => {},
};
