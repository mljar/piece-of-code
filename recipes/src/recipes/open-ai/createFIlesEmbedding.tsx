import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { CodeIcon } from "../../icons/Code";

const DOCS_URL = "embeddings-files-python";

export const FilesEmbedding: React.FC<IRecipeProps> = ({
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

  const [filePath, setFilePath] = useState("");
  const [model, setModel] = useState("text-embedding-3-small");
  const modelOptions = [
    ["text-embedding-3-small", "text-embedding-3-small"],
    ["text-embedding-3-large", "text-embedding-3-large"],
    ["ada v2", "text-embedding-ada-002"],
  ] as [string, string][];
  const [choice, setChoice] = useState("pdf");
  const choiceOptions = [
    ["PDF", "pdf"],
    ["DOCX", "docx"]
  ] as [string,string][];

  useEffect(() => {
    let src = `# set file path\n`;
    src += `filePath=r"${filePath}"\n\n`;
    src += `# read file\n`;
    if (choice == "docx") {
      src += `doc = Document(filePath)\n\n`;
    } 
    if (choice == "pdf") {
      src += `reader = PdfReader(filePath)\n\n`;
    }
    src += `# declare lists\n`;
    src += `chunks = []\n`;
    src += `embeddings = []\n\n`;
    src += `# text division\n`;
    if (choice == "docx") {
      src += `for i in range(0, len(doc.paragraphs)):\n`;
      src += `    chunk = doc.paragraphs[i].text\n`;
    } 
    if (choice == "pdf") {
      src += `for i in range(0, len(reader.pages)):\n`;
      src += `    chunk = reader.pages[i].extract_text()\n`;
    }
    src += `    chunks.append(chunk)\n\n`;
    src += `# create embeddings\n`;
    src += `for i in range(0, len(chunks)):\n`;
    src += `    embedding = client.embeddings.create(\n`;
    src += `        input = chunks[i],\n`;
    src += `        model = "${model}"\n`;
    src += `    )\n`;
    src += `    embeddings.append(embedding.data[0].embedding)`;

    setCode(src);
    if (choice == "docx") {
      setPackages(["from openai import OpenAI", "from docx import Document"]);
    }
    if (choice == "pdf") {
      setPackages(["from openai import OpenAI", "from pypdf import PdfReader"]);
    }
    if (setMetadata) {
      setMetadata({
        filePath,
        model,
        choice,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath, model, choice]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["choice"] !== undefined) setChoice(metadata["choice"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CodeIcon}
        label={"Files embeddings"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
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
        <Select
          label={"Choose the extension"}
          option={choice}
          setOption={setChoice}
          options={choiceOptions}
          tooltip={
            "Choose the extension of the file from which you want to create embeddings (PDF or DOCX)."
          }
        />
      </div>
      <SelectPath
        label={"Select file"}
        defaultPath={filePath}
        setPath={setFilePath}
        tooltip={"Choose the file from which you want to create embeddings."}
      />
    </div>
  );
};

export const FilesEmbeddingRecipe: IRecipe = {
  name: "Files embeddings",
  longName: "Generate PDF and DOCX file embeddings using OpenAI in Python",
  parentName: "OpenAI",
  description:
    "Learn to extract text from PDF or DOCX files and create embeddings with OpenAI's API. This recipe explains how to set file paths, read and split text into chunks, generate embeddings for each chunk, and store them. It is ideal for developers wanting to improve text analysis in Python projects.",
  shortDescription:
    "Learn how to extract text from PDF or DOCX files and create embeddings with OpenAI's API. This recipe covers reading files, splitting text into chunks, generating embeddings, and storing them for text analysis in Python.",
  codeExplanation: `1. Set the file path.
  2. Read the file.
  3. Split text from the file into chunks.
  4. Generate embeddings for each chunk.`,
  ui: FilesEmbedding,
  Icon: CodeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
    { importName: "pypdf", installationName: "pypdf", version: ">=4.1.0" },
    { importName: "docx", installationName: "python-docx", version: ">=1.1.2" },
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

export default FilesEmbeddingRecipe;
