import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Select } from "../../components/Select";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { SelectPath } from "../../components/SelectPath";
import { imageAIIcon } from "../../icons/imageAI";

const DOCS_URL = "python-generate-image";

export const ImageGen: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  variablesStatus,
  variables,
  setMetadata,
}) => {
  const vars = variables.filter((v) => v.varType.includes(CLIENT_OPENAI));

  if (variablesStatus === "loaded" && !vars.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There is no declared OpenAI client connection in your notebook. Please
          create a connection. You can use the Client connection recipe.
        </p>
      </div>
    );
  }
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
    let src = `# create request\n`;
    src += `response = client.images.generate(\n`;
    src += `  model="dall-e-3",\n`;
    src += `  prompt="${prompt}",\n`;
    src += `  size="${resolution}",\n`;
    src += `  quality="${quality}",\n`;
    src += `  n=1\n`;
    src += `)\n\n`;
    src += `# save response\n`;
    src += `res = requests.get(response.data[0].url, stream=True)\n\n`;
    src += `# set image path\n`;
    src += `image = os.path.join(r"${directory}", "${imageName}.png")\n\n`;
    src += `# save and display image\n`;
    src += `if res.status_code == 200:\n`;
    src += `    with open(image, "wb") as file:\n`;
    src += `        for chunk in res.iter_content(1024):\n`;
    src += `            file.write(chunk)\n`;
    src += `    with Image.open(image) as i:\n`;
    src += `        display(i)\n`;
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
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [resolution, quality, prompt, imageName, directory]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["resolution"] !== undefined)
        setResolution(metadata["resolution"]);
      if (metadata["quality"] !== undefined) setQuality(metadata["quality"]);
      if (metadata["prompt"] !== undefined) setPrompt(metadata["prompt"]);
      if (metadata["imageName"] !== undefined)
        setImageName(metadata["imageName"]);
      if (metadata["directory"] !== undefined)
        setDirectory(metadata["directory"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={imageAIIcon}
        label={"AI images generator"}
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
          tooltip={
            "Choose the directory in which you want to save the generated image."
          }
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
  name: "AI image generator",
  longName: "Generate images using OpenAI API in Python",
  parentName: "OpenAI",
  description:
    "Learn how to create and save images with OpenAI's DALL-E 3. This recipe explains crafting user prompts, selecting image size and quality, downloading the image, saving it to a file, and managing errors if the image retrieval doesn’t succeed. Get started with generating stunning visuals!",
  shortDescription:
    "Learn how to generate and save images using OpenAI's DALL-E 3. This recipe covers specifying the model, prompt, size, and quality, downloading the image, saving it as a file, and handling errors if retrieval fails.",
  codeExplanation: `
  1. Create the image generation request.
  2. Save the response as a variable.
  3. Define the image path.
  4. Save and dispay the image.`,
  ui: ImageGen,
  Icon: imageAIIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
    { importName: "PIL", installationName: "pillow", version: ">=10.2.0" },
    {
      importName: "requests",
      installationName: "requests",
      version: ">=2.31.0",
    },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "client",
      varType: CLIENT_OPENAI,
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

export default ImageGenRecipe;
