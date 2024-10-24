import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { MessagesIcon } from "../../icons/Messages";

const DOCS_URL = "ollama-chat-in-python";

export const ChatOllama: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("llama3.2");
  const modelOptions = [
    ["Llama 3.2", "llama3.2"],
    ["Llama 3.1", "llama3.1"],
    ["Llama 3", "llama3"],
  ] as [string, string][];
  const [display, setDisplay] = useState("default");
  const displayOptions = [
    ["Default", "default"],
    ["Stream", "stream"],
  ] as [string, string][];
  const [userMessage, setUserMessage] = useState("");
  const [userMessageType, setUserMessageType] = useState("str");
  const [systemMessage, setSystemMessage] = useState("");
  const [systemMessageType, setSystemMessageType] = useState("str");
  const [assistantMessage, setAssistantMessage] = useState("");
  const [assistantMessageType, setAssistantMessageType] = useState("str");
  const typeOptions = [
    ["Text", "str"],
    ["Variable", "var"],
  ] as [string, string][];

  useEffect(() => {
    let src = ``;
    src += `# create a chat completion\n`;
    src += `response = ollama.chat(\n`;
    src += `    model="${model}",\n`;
    src += `    messages=[\n`;
    if (userMessageType == "str") {
      src += `        {"role": "user", "content": "${userMessage}"},\n`;
    } else {
      src += `        {"role": "user", "content": ${userMessage}},\n`;
    }
    if (advanced) {
      if (systemMessageType == "str") {
        src += `        {"role": "system", "content": "${systemMessage}"},\n`;
      } else {
        src += `        {"role": "system", "content": ${systemMessage}},\n`;
      }
      if (assistantMessageType == "str") {
        src += `        {"role": "assistant", "content": "${assistantMessage}"},\n`;
      } else {
        src += `        {"role": "assistant", "content": ${assistantMessage}},\n`;
      }
    }
    src += `    ],\n`;
    if (display == "stream") {
      src += `    stream=True,\n`;
    }
    src += `)\n\n`;
    src += `# print response\n`;
    if (display == "default") {
      src += `print(response['message']['content'])`;
    } else {
      src += `for chunk in response:\n`;
      src += `     print(chunk['message']['content'], end='', flush=True)`;
    }

    setCode(src);
    setPackages(["import ollama"]);
    if (setMetadata) {
      setMetadata({
        model,
        display,
        userMessage,
        userMessageType,
        systemMessage,
        systemMessageType,
        assistantMessage,
        assistantMessageType,
        docsUrl: DOCS_URL,
      });
    }
  }, [
    advanced,
    model,
    display,
    userMessage,
    userMessageType,
    systemMessage,
    systemMessageType,
    assistantMessage,
    assistantMessageType,
  ]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["display"] !== undefined) setDisplay(metadata["display"]);
      if (metadata["userMessage"] !== undefined)
        setUserMessage(metadata["userMessage"]);
      if (metadata["userMessageType"] !== undefined)
        setUserMessageType(metadata["userMessageType"]);
      if (metadata["systemMessage"] !== undefined)
        setSystemMessage(metadata["systemMessage"]);
      if (metadata["systemMessageType"] !== undefined)
        setSystemMessageType(metadata["systemMessageType"]);
      if (metadata["assistantMessage"] !== undefined)
        setAssistantMessage(metadata["assistantMessage"]);
      if (metadata["assistantMessageType"] !== undefined)
        setAssistantMessageType(metadata["assistantMessageType"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={MessagesIcon}
        label={"Chat completions"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose model"}
          option={model}
          options={modelOptions}
          setOption={setModel}
          tooltip="Choose the Ollama model that you want to use. Remember that you have to download it before using it."
        />
        <Select
          label={"Choose display method"}
          option={display}
          options={displayOptions}
          setOption={setDisplay}
          tooltip="Choose the method that you want to use to display the response."
        />
      </div>
      <div className="poc-grid md:poc-grid-cols-[80%_20%] md:poc-gap-2">
        <Variable
          label={"Enter user message"}
          name={userMessage}
          setName={setUserMessage}
          tooltip="The user messages contain requests or comments for the assistant to reply to."
        />
        <Select
          label={"Choose input method"}
          option={userMessageType}
          options={typeOptions}
          setOption={setUserMessageType}
          tooltip={
            "Pick if you want to type the text or use a variable with the text."
          }
        />
      </div>
      {advanced && (
        <>
          <div className="poc-grid md:poc-grid-cols-[80%_20%] md:poc-gap-2">
            <Variable
              label={"Enter system message"}
              name={systemMessage}
              setName={setSystemMessage}
              tooltip="The system message is optional and can be used to control how the assistant acts."
            />
            <Select
              label={"Choose input method"}
              option={systemMessageType}
              options={typeOptions}
              setOption={setSystemMessageType}
              tooltip={
                "Pick if you want to type the text or use a variable with the text."
              }
            />
          </div>
          <div className="poc-grid md:poc-grid-cols-[80%_20%] md:poc-gap-2">
            <Variable
              label={"Enter assistant message"}
              name={assistantMessage}
              setName={setAssistantMessage}
              tooltip="Assistant messages save the assistant's past replies, but you can also write them to show how you want it to respond"
            />
            <Select
              label={"Choose input method"}
              option={assistantMessageType}
              options={typeOptions}
              setOption={setAssistantMessageType}
              tooltip={
                "Pick if you want to type the text or use a variable with the text."
              }
            />
          </div>
        </>
      )}
    </div>
  );
};

export const ChatOllamaRecipe: IRecipe = {
  name: "Chat completions",
  longName: "Ollama Chat Completions in Python Notebook",
  parentName: "Ollama",
  description: "Learn how to create a chat completion using Llama models in Python. This recipe walks you through setting up messages for the user, system, and assistant, selecting a specific Llama model, and formatting the output for response printing. Ideal for those looking to implement conversational AI efficiently.",
  shortDescription: "Learn how to create a chat completion using Llama models in Python. This recipe covers setting up user, system, and assistant messages, choosing a specific Llama model and format of response printing.",
  codeExplanation: `
  1. Create a chat completion by giving the AI model and messages.
  2. Print the response.`,
  ui: ChatOllama,
  Icon: MessagesIcon,
  requiredPackages: [
    { importName: "ollama", installationName: "ollama", version: ">=0.3.3" },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [],
};

export default ChatOllamaRecipe;
