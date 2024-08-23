import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { SearchIcon } from "../../icons/Search";

const DOCS_URL = "python-cosine-similarity";

export const SimilaritySearch: React.FC<IRecipeProps> = ({
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

  const [chunks, setChunks] = useState("chunks");
  const [embeddings, setEmbeddings] = useState("embeddings");
  const [query, setQuery] = useState("");
  const [model, setModel] = useState("text-embedding-3-small");
  const modelOptions = [
    ["text-embedding-3-small", "text-embedding-3-small"],
    ["text-embedding-3-large", "text-embedding-3-large"],
    ["ada v2", "text-embedding-ada-002"],
  ] as [string, string][];

  useEffect(() => {
    let src = `# define user query\n`;
    src += `user_query = "${query}"\n\n`;
    src += `# generate embedding\n`;
    src += `response = client.embeddings.create(\n`;
    src += `    input = user_query,\n`;
    src += `    model = "${model}"\n`;
    src += `)\n`;
    src += `query_embedding = response.data[0].embedding\n\n`;
    src += `# find most similar id\n`;
    src += `best_match_id = cosine_similarity(np.array(${embeddings ? embeddings : "embeddings"}), np.array(query_embedding).reshape(1,-1)).argmax()\n\n`;
    src += `# print most similar text\n`;
    src += `${chunks ? chunks : "chunks"}[best_match_id]`;

    setCode(src);
    setPackages([
      "from openai import OpenAI",
      "import numpy as np",
      "from sklearn.metrics.pairwise import cosine_similarity",
    ]);
    if (setMetadata) {
      setMetadata({
        chunks,
        embeddings,
        query,
        model,
        docsUrl: DOCS_URL,
      });
    }
  }, [chunks, embeddings, query, model]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["chunks"] !== undefined) setChunks(metadata["chunks"]);
      if (metadata["embeddings"] !== undefined)
        setEmbeddings(metadata["embeddings"]);
      if (metadata["query"] !== undefined) setQuery(metadata["query"]);
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SearchIcon}
        label={"Cosine similarity search"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Enter query"}
        name={query}
        setName={setQuery}
        tooltip="This is the text you want to find similarity to."
      />
      <div className="poc-grid md:poc-grid-cols-3 md:poc-gap-2">
        <Variable
          label={"Enter text list name"}
          name={chunks}
          setName={setChunks}
          tooltip="Name of the list where you store the divisioned text."
        />
        <Variable
          label={"Enter embeddings list name"}
          name={embeddings}
          setName={setEmbeddings}
          tooltip="Name of the list where you store embeddings created for each element of the text list."
        />
        <Select
          label={"Choose model"}
          option={model}
          options={modelOptions}
          setOption={setModel}
          tooltip={
            "Choose the OpenAI model that you want to use. Remember that each model has individual pricing."
          }
        />
      </div>
    </div>
  );
};

export const SimilaritySearchRecipe: IRecipe = {
  name: "Cosine similarity search",
  longName: "Search the cosine similarity using OpenAI API in Python",
  parentName: "OpenAI",
  description:
    "Learn how to find text most similar to a user query using OpenAI's API in Python. This recipe covers creating embeddings for the user query, calculating cosine similarity with precomputed embeddings, and retrieving the most similar text chunk. Boost your text analysis and search by integrating these steps into your Python apps.",
  shortDescription:
    "Learn how to find text most similar to a user query using OpenAI's API in Python. This recipe covers creating embeddings, calculating cosine similarity, and retrieving the most similar text chunk.",
  codeExplanation: `1. Define the user query.
  2. Generate embedding for the user query.
  3. Find the most similar ID by calculating cosine similarity.
  4. Print the best matching text chunk.`,
  ui: SimilaritySearch,
  Icon: SearchIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
    { importName: "numpy", installationName: "numpy", version: ">=1.26.4" },
    {
      importName: "sklearn",
      installationName: "scikit-learn",
      version: ">=1.5.1",
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

export default SimilaritySearchRecipe;
