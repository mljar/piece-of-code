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
    ["SVG", "*.svg"],
  ] as [string, string][];
  const [outExtension, setOutExtension] = useState(".png");
  const outExtensionOptions = [
    ["PNG", ".png"],
    ["JPG", ".jpg"],
    ["JPEG", ".jpeg"],
    ["SVG", ".svg"],
  ] as [string, string][];

  useEffect(() => {
    let src = `session = new_session()\n\n`;
    src += `for file in Path(r"${directory}").glob("${extension}"):\n`;
    src += `\tinput_path = str(file)\n`;
    src += `\toutput_path = str(file.parent / (file.stem + ".out${outExtension}"))\n`;
    src += `\twith open(input_path, 'rb') as i:\n`;
    src += `\t\twith open(output_path, 'wb') as o:\n`;
    src += `\t\t\tinput = i.read()\n`;
    src += `\t\t\toutput = remove(input, session=session)\n`;
    src += `\t\t\to.write(output)`;
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
      if (metadata["directory"] !== undefined) setDirectory(metadata["directory"]);
      if (metadata["extension"] !== undefined) setExtension(metadata["extension"]);
      if (metadata["outExtension"] !== undefined) setOutExtension(metadata["outExtension"]);
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
  name: "Multi Images",
  longName: "Remove background from images",
  parentName: "Python",
  description:
    "Remove the background from all images with the chosen extension in the given directory in seconds! Save edited images with the same or different extension in the files' parent directory.",
  shortDescription:
    "Remove the background from all images with the chosen extension in the given directory in seconds! Save edited images with the same or different extension in the files' parent directory.",
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
