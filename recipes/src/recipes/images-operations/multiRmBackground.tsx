import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { MultiImagesIcon } from "../../icons/MultiImages";

const DOCS_URL = "remove-images-background";

export const MultiImages: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [directory, setDirectory] = useState("");
  const [extension, setExtension] = useState("*.png");
  const extensionOptions = [
    ["PNG", "*.png"],
    ["JPG", "*.jpg"],
    ["JPEG", "*.jpeg"],
  ] as [string, string][];
  const [outExtension, setOutExtension] = useState(".png");
  const outExtensionOptions = [
    ["PNG", ".png"],
    ["JPG", ".jpg"],
    ["JPEG", ".jpeg"],
  ] as [string, string][];

  useEffect(() => {
    let src = ``;
    src += `# declare new session\n`
    src += `session = new_session()\n\n`;
    src += `# create a loop\n`
    src += `for file in Path(r"${directory}").glob("${extension}"):\n`;
    src += `  # set input and output images paths\n`;
    src += `    input_path = str(file)\n`;
    src += `    output_path = str(file.parent / (file.stem + ".out${outExtension}"))\n`;
    src += `  # open input and output files\n`;
    src += `    with open(input_path, 'rb') as i:\n`;
    src += `        with open(output_path, 'wb') as o:\n`;
    src += `          # remove background and save result\n`;
    src += `            input = i.read()\n`;
    src += `            output = remove(input, session=session)\n`;
    src += `            o.write(output)`;
    setCode(src);
    setPackages([
      "from pathlib import Path",
      "from rembg import remove, new_session",
    ]);
    if (setMetadata) {
      setMetadata({
        directory,
        extension,
        outExtension,
        docsUrl: DOCS_URL,
      });
    }
  }, [directory, extension, outExtension]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["directory"] !== undefined)
        setDirectory(metadata["directory"]);
      if (metadata["extension"] !== undefined)
        setExtension(metadata["extension"]);
      if (metadata["outExtension"] !== undefined)
        setOutExtension(metadata["outExtension"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={MultiImagesIcon}
        label={"Remove background from many images"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select the directory"}
        defaultPath={directory}
        setPath={setDirectory}
        selectFolder={true}
        tooltip={
          "Choose the directory in which you want to perform the operation."
        }
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose input images extension"}
          option={extension}
          options={extensionOptions}
          setOption={setExtension}
        />
        <Select
          label={"Choose output images extension"}
          option={outExtension}
          options={outExtensionOptions}
          setOption={setOutExtension}
        />
      </div>
    </div>
  );
};

export const MultiImagesRecipe: IRecipe = {
  name: "Remove background from multiple images",
  longName: "Remove background from multiple  images",
  parentName: "Images Operations",
  description:
    "Learn to remove image backgrounds in bulk using Python. This recipe explains how to create a session, loop through PNG files, set input and output paths, remove backgrounds, and save the processed images. Ideal for automating and streamlining background removal for multiple images efficiently.",
  shortDescription:
    "Learn how to remove image backgrounds in bulk using Python. This recipe covers creating a session, looping through PNG files, setting input/output paths, removing backgrounds, and saving results.",
  codeExplanation: `
  1. Choose the directory and images extension.
  2. Create a loop which allows to iterate through files in the chosen directory.
  3. Take images with the chosen extension, remove their background and save then with the chosen extension.`,
  ui: MultiImages,
  Icon: MultiImagesIcon,
  requiredPackages: [
    { importName: "rembg", installationName: "rembg", version: ">=2.0.57" },
  ],
  docsUrl: DOCS_URL,
};

export default MultiImagesRecipe;
