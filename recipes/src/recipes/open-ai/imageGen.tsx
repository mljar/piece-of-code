import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Select } from "../../components/Select";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { imageAIIcon } from "../../icons/imageAI";

const DOCS_URL = "generate-image";

export const ImageGen: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [resolution, setResolution] = useState("1024x1024");
  const resolutionOptions = [
    ["1024x1024", "1024x1024"],
    ["1024x1792", "1024x1792"],
    ["1792x1024", "1792x1024"],
  ] as [string, string][];
  const [quality, setQuality] = useState("standard");
  const qualityOptions = [
    ["Standard", "standard"],
    ["HD", "hd"],
  ] as [string, string][];
  const [prompt, setPrompt] = useState("");
  const [imageName, setImageName] = useState("ai-image");
  const [directory, setDirectory] = useState("");

  useEffect(() => {
    let src = `response = client.images.generate(\n`;
    src += `  model="dall-e-3",\n`;
    src += `  prompt="${prompt}",\n`;
    src += `  size="${resolution}",\n`;
    src += `  quality="${quality}",\n`;
    src += `  n=1\n`;
    src += `)\n\n`;
    src += `res = requests.get(response.data[0].url, stream=True)\n`;
    src += `image = os.path.join(r"${directory}", "${imageName}.png")\n\n`;
    src += `if res.status_code == 200:\n`;
    src += `    with open(image, "wb") as file:\n`;
    src += `        for chunk in res.iter_content(1024):\n`;
    src += `            file.write(chunk)\n`;
    src += `    with Image.open(image) as i:\n`;
    src += `        display(i)\n`
    src += `else:\n`;
    src += `    print("Failed to retrieve the image. Status code:", response.status_code)`;

    setCode(src);
    setPackages([
      "import os",
      "from openai import OpenAI",
      "import requests",
      "from PIL import Image",
    ]);
    if (setMetadata) {
      setMetadata({
        resolution,
        quality,
        prompt,
        imageName,
        directory,
        docsUrl: DOCS_URL,
      });
    }
  }, [resolution, quality, prompt, imageName, directory]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["resolution"] !== undefined) setResolution(metadata["resolution"]);
      if (metadata["quality"] !== undefined) setQuality(metadata["quality"]);
      if (metadata["prompt"] !== undefined) setPrompt(metadata["prompt"]);
      if (metadata["imageName"] !== undefined) setImageName(metadata["imageName"]);
      if (metadata["directory"] !== undefined) setDirectory(metadata["directory"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={imageAIIcon}
        label={"AI Images Generator"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose resolution"}
          option={resolution}
          options={resolutionOptions}
          setOption={setResolution}
          tooltip={"Resolution in which an image will generate."}
        />
        <Select
          label={"Choose quality"}
          option={quality}
          options={qualityOptions}
          setOption={setQuality}
          tooltip={"Quality in which an image will generate."}
        />
      </div>
      <Variable
        label={"Enter prompt"}
        name={prompt}
        setName={setPrompt}
        tooltip={"Description of the image you want to generate."}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
      <SelectPath
        label={"Select the output directory"}
        defaultPath={directory}
        setPath={setDirectory}
        selectFolder={true}
        tooltip={"Choose the directory in which you want to save the generated image."}
      />
      <Variable
        label={"Set image name"}
        name={imageName}
        setName={setImageName}
        tooltip={"Set name of the generated image."}
      />
      </div>
    </div>
  );
};

export const ImageGenRecipe: IRecipe = {
  name: "AI Image Generator",
  longName: "Generate images using AI",
  parentName: "OpenAI",
  description: "Discover how to generate images using OpenAI's DALL-E 3 model in Python with this comprehensive guide. We'll walk you through generating an image with specific parameters, such as model type, prompt, size, quality, and number of images. Then, you'll learn how to retrieve the generated image from a URL, save it locally as PNG image, and display it using the PIL library. This tutorial ensures you handle responses correctly and manage potential errors while working with the OpenAI API and image processing.",
  shortDescription: "Discover how to generate images using OpenAI's DALL-E 3 model in Python. This guide covers generating an image with specific parameters, retrieving the image from a URL, saving it locally, and displaying it using the PIL library.",
  codeExplanation: `
  1. Create a query.
  2. Save url as a variable.
  3. Set the output image name and path.
  4. Decode the image, save it as PNG file and display it.`,
  ui: ImageGen,
  Icon: imageAIIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default ImageGenRecipe;
