import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { ImageIcon } from "../../icons/Image";

const DOCS_URL = "remove-image-background";

export const SingleImage: React.FC<IRecipeProps> = ({
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

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["image"] !== undefined) setImage(metadata["image"]);
      if (metadata["filePath"] !== undefined)
        setFilePath(metadata["filePath"]);
      if (metadata["outImage"] !== undefined) setOutImage(metadata["outImage"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={ImageIcon}
        label={"Remove background from single image"}
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

export const SingleImageRecipe: IRecipe = {
  name: "Single Image",
  longName: "Remove background from image",
  parentName: "Python",
  description: "Use simple Python code to remove the background from a PNG, JPG, JPEG, or SVG image. Save the new image with the same or a different extension in any folder you want.",
  shortDescription: "Use simple Python code to remove the background from a PNG, JPG, JPEG, or SVG image. Save the new image with the same or a different extension in any folder you want.",
  codeExplanation: `
  1. Set input and output images paths.
  2. Open both files(images).
  3. Edit the input image and save the result as an output image.`,
  ui: SingleImage,
  Icon: ImageIcon,
  requiredPackages: [
    { importName: "rembg", installationName: "rembg", version: ">=2.0.57" },
  ],
  docsUrl: DOCS_URL,
};

export default SingleImageRecipe;
