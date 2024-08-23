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
    let src = `# set input and output paths:\n`;
    src += `input_image = r"${image}"\n`;
    src += `output_image = os.path.join(r"${filePath}", "${outImage}")\n\n`;
    src += `# remove background from image:\n`;
    src += `with open(input_image, "rb") as i:\n`;
    src += `    with open(output_image, "wb") as o:\n`;
    src += `        input = i.read()\n`;
    src += `        output = remove(input)\n`;
    src += `        o.write(output)\n`;

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
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
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
  name: "Remove background from single image",
  longName: "Remove the background from your local image using Python",
  parentName: "Images Operations",
  description:
    "Learn to remove an image background using Python. This recipe explains how to set input and output paths, read the image file, process it to remove the background and save the cleaned image. Ideal for automating background removal in your images for a cleaner, more professional look.",
  shortDescription:
    "Learn how to remove the background from an image using Python. This recipe covers setting input and output paths, reading the image, processing it to remove the background, and saving the result.",
  codeExplanation: `
  1. Set input and output images paths.
  2. Remove the background from the input image and save it as a new image.`,
  ui: SingleImage,
  Icon: ImageIcon,
  requiredPackages: [
    { importName: "rembg", installationName: "rembg", version: ">=2.0.57" },
  ],
  docsUrl: DOCS_URL,
};

export default SingleImageRecipe;
