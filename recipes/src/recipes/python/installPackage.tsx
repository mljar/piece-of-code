import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SettingsDownIcon } from "../../icons/SettingsDown";

const DOCS_URL = "install-package-in-python-notebook";

export const InstallPackage: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [installPackage, setInstallPackage] = useState("package-name");

  useEffect(() => {
    let src = `# install new package\n`;

    src += `!conda install --yes --prefix {sys.prefix} -c conda-forge ${installPackage}`;

    setCode(src);
    setPackages(["import sys"]);
    if (setMetadata) {
      setMetadata({
        installPackage,
        docsUrl: DOCS_URL,
      });
    }
  }, [installPackage]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["installPackage"] !== undefined)
        setInstallPackage(metadata["installPackage"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SettingsDownIcon}
        label={"Install new package"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Package name, you can also specify version, for example my_package>=1.0.2"}
        name={installPackage}
        setName={setInstallPackage}
      />
    </div>
  );
};

export const InstallPackageRecipe: IRecipe = {
  name: "Install Package",
  longName: "Install new package in Python notebook",
  parentName: "Python",
  description: `Execute this code recipe to install a new Python package in your currently used environment. This recipe assumes that you are using conda for managing your Python environment. MLJAR Studio uses conda for managing Python environment. 
  
  Please note that MLJAR Studio automatically install and import packages for you when you are using recipes. However, there might be situation that you would like to write a custom Python code and you will need to import a new package. In this situation, please isntall a new package with this recipe.`,
  shortDescription: `Execute this code recipe to install new Python package in your currently used environment. This recipe assumes that you are using conda for managing your Python environment.`,
  codeExplanation: `Install new python package in your current environment using conda. You can specify version of the package after its name.`,
  ui: InstallPackage,
  Icon: SettingsDownIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
  tags: ["install-package"],
};

export default InstallPackageRecipe;
