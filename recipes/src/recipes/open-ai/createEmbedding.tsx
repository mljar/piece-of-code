import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { Variable } from "../../components/Variable";
import { CodeIcon } from "../../icons/Code";

const DOCS_URL = "openai-embedding";

export const Embedding: React.FC<IRecipeProps> = ({
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

  const [text, setText] = useState("");
  const [model, setModel] = useState("text-embedding-3-small");
  const modelOptions = [
    ["text-embedding-3-small", "text-embedding-3-small"],
    ["text-embedding-3-large", "text-embedding-3-large"],
    ["ada v2", "text-embedding-ada-002"],
  ] as [string, string][];
  const [show, setShow] = useState(false);

  useEffect(() => {
    let src = `# create embedding\n`;
    src += `embedding = client.embeddings.create(\n`;
    src += `    input = "${text}",\n`;
    src += `    model = "${model}"\n`;
    src += `)`;
    if (show) {
      src += `\n\n# print embedding\n`;
      src += `print(embedding.data[0].embedding)`;
    }

    setCode(src);
    setPackages(["from openai import OpenAI"]);
    if (setMetadata) {
      setMetadata({
        text,
        model,
        show,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [text, model, show]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["text"] !== undefined) setText(metadata["text"]);
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["show"] !== undefined) setShow(metadata["show"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CodeIcon}
        label={"Embeddings"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Enter the text"}
        name={text}
        setName={setText}
        tooltip="This is the text that you want to convert into a vector."
      />
      <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-2">
        <Select
          label={"Choose model"}
          option={model}
          options={modelOptions}
          setOption={setModel}
          tooltip={
            "Choose the OpenAI model that you want to use. Remember that each model has individual pricing."
          }
        />
        <Toggle label={"Print the embedding"} value={show} setValue={setShow} />
      </div>
    </div>
  );
};

export const EmbeddingRecipe: IRecipe = {
  name: "Embeddings",
  longName: "Generate text embeddings using OpenAI API in Python",
  parentName: "OpenAI",
  description:
    "Learn how to create text embeddings using OpenAI's API in this guide. Learn to generate embeddings by specifying input and models, and see how to use them in your Python applications for better text analysis. Ideal for developers who want to add advanced text features to their projects.",
  shortDescription:
    "Learn how to create text embeddings using OpenAI's API. This recipe walks you through generating embeddings with specified models, helping you integrate powerful text analysis into your Python applications.",
  codeExplanation: `
  1. Create the embedding.
  2. Access and print the embedding.`,
  ui: Embedding,
  Icon: CodeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
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

export default EmbeddingRecipe;
