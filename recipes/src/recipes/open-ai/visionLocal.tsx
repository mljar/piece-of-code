import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { Numeric } from "../../components/Numeric";
import { aiEyeIcon } from "../../icons/aiEye";

const DOCS_URL = "openai-vision-local-image";

export const VisionLocal: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [model, setModel] = useState("gpt-4o");
  const modelOptions = [
    ["GPT-4o", "gpt-4o"],
    ["GPT-4o mini", "gpt-4o-mini"],
    ["GPT-4 Turbo", "gpt-4-turbo"]
  ] as [string, string][];
  const [maxTokens, setMaxTokens] = useState(300);
  const [imagePath, setImagePath] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    let src = `# create image encode function\n`;
    src += `def encode_image(image_path):\n`;
    src += `  with open(image_path, "rb") as image_file:\n`;
    src += `    return base64.b64encode(image_file.read()).decode('utf-8')\n\n`;
    src += `image_path = r"${imagePath}"\n`;
    src += `base64_image = encode_image(image_path)\n\n`;
    src += `# set headers\n`;
    src += `headers = {\n`;
    src += `  "Content-Type": "application/json",\n`;
    src += `  "Authorization": f"Bearer {api_key}"\n`;
    src += `}\n\n`;
    src += `# create payload\n`
    src += `payload = {\n`;
    src += `  "model": "${model}",\n`;
    src += `  "messages": [\n`;
    src += `    {\n`;
    src += `      "role": "user",\n`;
    src += `      "content": [\n`;
    src += `        {\n`;
    src += `          "type": "text",\n`;
    src += `          "text": "${userPrompt}"\n`;
    src += `        },\n`;
    src += `        {\n`;
    src += `          "type": "image_url",\n`;
    src += `          "image_url": { "url": f"data:image/jpeg;base64,{base64_image}"}\n`;
    src += `        }\n`;
    src += `      ]\n`;
    src += `    }\n`;
    src += `  ],\n`;
    src += `  "max_tokens": ${maxTokens}\n`;
    src += `}\n\n`;
    src += `# make api request\n`;
    src += `response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=payload)\n\n`;
    src += `# print response\n`;
    src += `print(response.json()["choices"][0]["message"]["content"])`

    setCode(src);
    setPackages([
      "from openai import OpenAI",
      "import base64",
      "import requests",
    ]);
    if (setMetadata) {
      setMetadata({
        model,
        maxTokens,
        imagePath,
        userPrompt,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, maxTokens, imagePath, userPrompt]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["maxTokens"] !== undefined) setMaxTokens(metadata["maxTokens"]);
      if (metadata["imagePath"] !== undefined) setImagePath(metadata["imagePath"]);
      if (metadata["userPrompt"] !== undefined) setUserPrompt(metadata["userPrompt"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={aiEyeIcon}
        label={"OpenAI Vision with local image"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Choose model"}
              option={model}
              options={modelOptions}
              setOption={setModel}
              tooltip="Choose the chat model that you want to use. Remember that each model has individual pricing."
            />
            <Numeric
            label={"Max Tokens"}
            name={maxTokens}
            setName={setMaxTokens}
            tooltip="By setting a limit on the number of tokens, you can control the length of the response and manage the cost and performance of your API calls."
          />
      </div>
      <SelectPath
          label={"Choose image"}
          setPath={setImagePath}
          defaultPath={imagePath}
          tooltip="Choose the image you want to ask a question about."
        />
        <Variable
        label={"Enter user message"}
        name={userPrompt}
        setName={setUserPrompt}
        tooltip="The user messages provide requests or comments for the assistant to respond to."
      />
    </div>
  );
};

export const VisionLocalRecipe: IRecipe = {
  name: "OpenAI Vision with local image",
  longName: "OpenAI Vision with local image",
  parentName: "OpenAI",
  description: "Learn how to encode images to base64 in Python and use them in OpenAI's Chat Completions API. This guide covers creating an image encoding function, setting headers, and crafting a payload with text and image content. You'll learn how to make an API request and print the response content, integrating text and image data seamlessly into your OpenAI interactions.",
  shortDescription: "Learn how to encode images to base64 in Python and use them in OpenAI's Chat Completions API. This guide covers setting headers, creating a payload with text and image content, making the API request, and printing the response content.",
  codeExplanation: `
  1. Create the image encode function.
  2. Choose the image and encode it.
  3. Defines the headers for the HTTP request. 
  4. Constructs the JSON payload for the request.
  5. Make the API request and print the response.`,
  ui: VisionLocal,
  Icon: aiEyeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default VisionLocalRecipe;