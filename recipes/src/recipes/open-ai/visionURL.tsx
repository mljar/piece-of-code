import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Numeric } from "../../components/Numeric";
import { Variable } from "../../components/Variable";
import { aiEyeIcon } from "../../icons/aiEye";

const DOCS_URL = "openai-vision-url-image";

export const VisionURL: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [model, setModel] = useState("gpt-4o");
  const modelOptions = [
    ["GTP-4o", "gpt-4o"],
    ["GPT-4o mini", "gpt-4o-mini"],
    ["GPT-4 Turbo", "gpt-4-turbo"],
  ] as [string, string][];
  const [maxTokens, setMaxTokens] = useState(300);
  const [URL, setURL] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  useEffect(() => {
    let src = `# create api request\n`;
    src += `response = client.chat.completions.create(\n`;
    src += `  model="${model}",\n`;
    src += `  messages=[\n`;
    src += `    {\n`;
    src += `      "role": "user",\n`;
    src += `      "content": [\n`;
    src += `        {"type": "text", "text": "${userPrompt}"},\n`;
    src += `        {\n`;
    src += `          "type": "image_url",\n`;
    src += `          "image_url": {"url": "${URL}"}\n`;
    src += `        }\n`;
    src += `      ]\n`;
    src += `    }\n`;
    src += `  ],\n`;
    src += `  max_tokens=${maxTokens}\n`;
    src += `)\n\n`;
    src += `# print response\n`;
    src += `print(response.choices[0].message.content)`;

    setCode(src);
    setPackages(["import openai"]);
    if (setMetadata) {
      setMetadata({
        model,
        maxTokens,
        URL,
        userPrompt,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, maxTokens, URL, userPrompt]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["maxTokens"] !== undefined) setMaxTokens(metadata["maxTokens"]);
      if (metadata["URL"] !== undefined) setURL(metadata["URL"]);
      if (metadata["userPrompt"] !== undefined) setUserPrompt(metadata["userPrompt"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={aiEyeIcon}
        label={"OpenAI Vision"}
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
      <Variable
        label={"Enter image URL"}
        name={URL}
        setName={setURL}
        tooltip="An image URL pointing to the image you want analyzed."
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

export const VisionURLRecipe: IRecipe = {
  name: "OpenAI Vision with URL images",
  longName: "OpenAI Vision with URL images",
  parentName: "OpenAI",
  description: "Learn how to use OpenAI API to create chat completions with text and images given from URLs in Python. This guide covers crafting API requests with user messages, setting a token limit, and printing the response content. You'll learn how to integrate both text and image data into your requests, ensuring effective and dynamic interactions with the OpenAI API.",
  shortDescription: "Learn how to use OpenAI API to create chat completions with text and images given from URL in Python. This guide covers crafting API requests with user messages, setting a token limit, and printing the response content.",
  codeExplanation: `
  1. Create the API request.
  2. Print the response.`,
  ui: VisionURL,
  Icon: aiEyeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default VisionURLRecipe;
