import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Numeric } from "../../components/Numeric";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { MessagesIcon } from "../../icons/Messages";

const DOCS_URL = "python-chatgpt-completions";

export const ChatCompl: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [model, setModel] = useState("gpt-4o");
  const modelOptions = [
    ["GPT-4o", "gpt-4o"],
    ["GPT-4o mini", "gpt-4o-mini"],
    ["GPT-4 Turbo", "gpt-4-turbo"],
    ["GPT-4", "gpt-4"],
    ["GPT-3.5 Turbo", "gpt-3.5-turbo"],
  ] as [string, string][];
  const [maxTokens, setMaxTokens] = useState(300);
  const [systemPrompt, setSystemPrompt] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [assistantPrompt, setAssistantPrompt] = useState("");
  const [advanced, setAdvanced] = useState(false);

  useEffect(() => {
    let src = `# create a chat completion\n`;
    src += `response = client.chat.completions.create(\n`;
    src += `    model="${model}",\n`;
    src += `    messages=[\n`;
    if (advanced) {
      src += `        {"role": "system", "content": "${systemPrompt}"},\n`;
      src += `        {"role": "assistant", "content": "${assistantPrompt}"},\n`;
    }
    src += `        {"role": "user", "content": "${userPrompt}"},\n`;
    src += `    ],\n`;
    src += `    max_tokens=${maxTokens}\n`;
    src += `)\n\n`;
    src += `# get and print response\n`;
    src += `print(response.choices[0].message.content)\n`;
    
    setCode(src);
    setPackages(["from openai import OpenAI"]);
    if (setMetadata) {
      setMetadata({
        model,
        maxTokens,
        systemPrompt,
        userPrompt,
        assistantPrompt,
        advanced,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, maxTokens, systemPrompt, userPrompt, assistantPrompt, advanced]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["maxTokens"] !== undefined)
        setMaxTokens(metadata["maxTokens"]);
      if (metadata["systemPrompt"] !== undefined)
        setSystemPrompt(metadata["systemPrompt"]);
      if (metadata["userPrompt"] !== undefined)
        setUserPrompt(metadata["userPrompt"]);
      if (metadata["assistantPrompt"] !== undefined)
        setAssistantPrompt(metadata["assistantPrompt"]);
      if (metadata["advanced"] !== undefined) setAdvanced(metadata["advanced"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={MessagesIcon}
        label={"Chat Completion"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
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
      <Variable
        label={"Enter user message"}
        name={userPrompt}
        setName={setUserPrompt}
        tooltip="The user messages provide requests or comments for the assistant to respond to."
      />
      {advanced && (
        <>
          <Variable
            label={"Enter system message"}
            name={systemPrompt}
            setName={setSystemPrompt}
            tooltip="The system message is optional and can be used to set the behavior of the assistant."
          />
          <Variable
            label={"Enter assistant message"}
            name={assistantPrompt}
            setName={setAssistantPrompt}
            tooltip="Assistant messages store previous assistant responses, but can also be written by you to give examples of desired behavior"
          />
        </>
      )}
    </div>
  );
};

export const ChatComplRecipe: IRecipe = {
  name: "Chat Completion",
  longName: "Python OpenAI Chat Completion",
  parentName: "OpenAI",
  description:
    "Learn how to create chat completions using OpenAI models in Python. This guide covers setting up a client, sending user and system role messages, specifying a token limit, handling the API call, and printing the response content for seamless integration.",
  shortDescription:
    "Learn how to create chat completions using OpenAI models in Python. This guide covers sending a user prompt and system role message, setting a token limit, and printing the response content.",
  codeExplanation: `
  1. Create chat completion.
  2. Get response and print it.`,
  ui: ChatCompl,
  Icon: MessagesIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default ChatComplRecipe;
