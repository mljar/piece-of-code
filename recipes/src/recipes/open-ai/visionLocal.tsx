import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
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
  variablesStatus,
  variables,
  setMetadata,
  hideTitle,
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

  const [model, setModel] = useState("gpt-4o");
  const modelOptions = [
    ["GPT-4o", "gpt-4o"],
    ["GPT-4o mini", "gpt-4o-mini"],
    ["GPT-4 Turbo", "gpt-4-turbo"],
  ] as [string, string][];
  const [maxTokens, setMaxTokens] = useState(300);
  const [imagePath, setImagePath] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    let src = ``;
    src += `# set image path\n`;
    src += `image_path = r"${imagePath}"\n\n`;
    src += `# create image encode function\n`;
    src += `def encode_image(image_path):\n`;
    src += `  with open(image_path, "rb") as image_file:\n`;
    src += `    return base64.b64encode(image_file.read()).decode('utf-8')\n\n`;
    src += `base64_image = encode_image(image_path)\n\n`;
    src += `# set headers\n`;
    src += `headers = {\n`;
    src += `  "Content-Type": "application/json",\n`;
    src += `  "Authorization": f"Bearer {api_key}"\n`;
    src += `}\n\n`;
    src += `# create payload\n`;
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
    src += `print(response.json()["choices"][0]["message"]["content"])`;

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
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, maxTokens, imagePath, userPrompt]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["maxTokens"] !== undefined)
        setMaxTokens(metadata["maxTokens"]);
      if (metadata["imagePath"] !== undefined)
        setImagePath(metadata["imagePath"]);
      if (metadata["userPrompt"] !== undefined)
        setUserPrompt(metadata["userPrompt"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={aiEyeIcon}
        label={"Vision with local images"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose model"}
          option={model}
          options={modelOptions}
          setOption={setModel}
          tooltip="Choose the OpenAI model that you want to use. Remember that each model has individual pricing."
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
  name: "Vision with local images",
  longName: "Chat with the OpenAI model about your local images in Python",
  parentName: "OpenAI",
  description:
    "Learn how to use local images with OpenAI's Chat Completions API in Python. This recipe covers encoding images, crafting a payload with both text and image data, making the API request, and printing the response. Follow these steps to integrate local images into your chat completions seamlessly.",
  shortDescription:
    "Learn how to use local images in OpenAI Chat Completions API using Python. This recipe covers encoding images, creating a payload with text and image data, making the API request, and printing the response.",
  codeExplanation: `
  1. Choose the image and set its path.
  2. Create the image encode function and call it.
  3. Defines the headers for the HTTP request. 
  4. Constructs the JSON payload for the request.
  5. Make the API request and print the response.`,
  ui: VisionLocal,
  Icon: aiEyeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
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

export default VisionLocalRecipe;
