import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { SelectPath } from "../../components/SelectPath";
import { CodeIcon } from "../../icons/Code";

const DOCS_URL = "embeddings-files-python";

export const FilesEmbedding: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
    const [filePath, setFilePath] = useState("");
    const [model, setModel] = useState("text-embedding-3-small");
    const modelOptions = [
    ["text-embedding-3-small", "text-embedding-3-small"],
    ["text-embedding-3-large", "text-embedding-3-large"],
    ["ada v2", "text-embedding-ada-002"],
  ] as [string, string][];
    const [choice, setChoice] = useState(false);


  useEffect(() => {
    let src = `# set file path\n`;
    src  += `filePath=r"${filePath}"\n\n`;
    src += `# read file\n`
    if (choice) {
        src += `doc = Document(filePath)\n\n`;
    } else {
        src += `reader = PdfReader(filePath)\n\n`;
    }
    src += `# declare lists\n`;
    src += `chunks = []\n`;
    src += `embeddings = []\n\n`;
    src += `# text division\n`;
    if (choice) {
        src += `for i in range(0, len(doc.paragraphs)):\n`;
        src += `    chunk = doc.paragraphs[i].text\n`;
    } else {
        src += `for i in range(0, len(reader.pages)):\n`;
        src += `    chunk = reader.pages[i].extract_text()\n`;
    }
    src += `    chunks.append(chunk)\n\n`;
    src += `# create embeddings\n`;
    src += `for i in range(0, len(chunks)):\n`;
    src += `    embedding = client.embeddings.create(\n`;
    src += `        input = chunks[i],\n`;
    src += `        model ="${model}"\n`;
    src += `    )\n`;
    src += `    embeddings.append(np.array(embedding.data[0].embedding).reshape(1,-1))`;
    
    setCode(src);
    if (choice) {
      setPackages(["from openai import OpenAI", "from docx import Document"]);
    } else {
      setPackages(["from openai import OpenAI", "from pypdf import PdfReader"])
    }
    if (setMetadata) {
      setMetadata({
        filePath,
        model,
        choice,
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
      <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-10">
      <Select
        label={"Choose model"}
        option={model}
        options={modelOptions}
        setOption={setModel}
        tooltip={"Choose the OpenAI model that you want to use. Remember that each model has individual pricing."}
      />
      <Toggle 
        label={"PDF or DOCX"} 
        value={choice} 
        setValue={setChoice}
        tooltip={"Choose the extension of the file from which you want to create embeddings (PDF or DOCX)."}
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
  longName: "Create embeddings from PDF and DOCX files using the OpenAI API",
  parentName: "OpenAI",
  description: "Learn how to read PDF and DOCX files, divide their content into chunks, and create embeddings for each chunk using OpenAI's API in Python. This guide covers reading the files, extracting and dividing the text into chunks, and generating embeddings for each text chunk for enhanced text analysis and processing in Python applications.",
  shortDescription: "Learn how to read PDF and DOCX files, divide their content into chunks, and create embeddings for each chunk using OpenAI's API in Python. This guide covers reading the files, extracting text, and generating embeddings.",
  codeExplanation: `1. Set the file path.
  2. Read the file.
  3. Split text from the file into chunks.
  4. Generate embeddings for each chunk.`,
  ui: FilesEmbedding,
  Icon: CodeIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
    { importName: "pypdf", installationName: "pypdf", version: ">=4.1.0" },
    { importName: "docx", installationName: "python-docx", version: ">=1.1.2" } 
  ],
  docsUrl: DOCS_URL,
};

export default FilesEmbeddingRecipe;
