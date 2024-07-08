import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { ImageIcon } from "../../icons/Image";

const DOCS_URL = "python-remove-background";

export const Rembg: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [image, setImage] = useState("myImage.png");
  const [outImage, setOutImage] = useState("outputImage.png");
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    let src = `# variables:\n`;
    src += `input_image = "${image}"\n`;
    src += `output_image = os.path.join(r"${filePath}", "${outImage}")\n\n`;
    src += `# code:\n`;
    src += `with open(input_image, "rb") as i:\n`;
    src += `\twith open(output_image, "wb") as o:\n`;
    src += `\t\tinput = i.read()\n`;
    src += `\t\toutput = remove(input)\n`;
    src += `\t\to.write(output)\n`;

    setCode(src);
    setPackages(["import os", "from rembg import remove"]);
    if (setMetadata) {
      setMetadata({
        image,
        filePath,
        outImage,
        docsUrl: DOCS_URL,
      });
    }
  }, [image, filePath, outImage]);

  return (
    <div>
      <Title
        Icon={ImageIcon}
        label={"Remove single image background"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select input image"}
        defaultPath={image}
        setPath={setImage}
        tooltip={"You can upload *.png, *.jpg, *.jpeg"}
      />
      <SelectPath
        label={"Select directory, leave empty to save in the current directory"}
        setPath={setFilePath}
        selectFolder={true}
        defaultPath={filePath}
      />
      <Variable
        label={"Output image name"}
        name={outImage}
        setName={setOutImage}
        tooltip={"You can set '.png', '.jpg', '.jpeg' extansions."}
      />
    </div>
  );
};

export const RembgRecipe: IRecipe = {
  name: "Single Image",
  longName: "Remove background from single image",
  parentName: "Python",
  description: "Remove background from your image(PNG, JPG, JPEG) using simple Python code. Save it as a new image with the same or different extension in the directory of your choice.",
  shortDescription: "Remove background from your image(PNG, JPG, JPEG) in Python",
  codeExplanation: ``,
  ui: Rembg,
  Icon: ImageIcon,
  requiredPackages: [
    { importName: "rembg", installationName: "rembg", version: ">=2.0.57" },
  ],
  docsUrl: DOCS_URL,
};

export default RembgRecipe;
