import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { OpenAIIcon } from "../../icons/OpenAI";

const DOCS_URL = "client-open-ai";

export const Client: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [dotenvVar, setDotenvVar] = useState("OPENAI_KEY");

  useEffect(() => {
    let src = `# load .env file\n`;
    src += `load_dotenv()\n\n`;
    src += `# get api key from environment\n`;
    src += `api_key = os.environ["${dotenvVar}"]\n\n`;
    src += `# create OpenAI client\n`;
    src += `def create_client(api_key):\n`;
    src += `    try:\n`;
    src += `        client = openai.OpenAI(api_key=api_key)\n`;
    src += `        client.models.list()\n`;
    src += `        return client\n`;
    src += `    except openai.AuthenticationError:\n`;
    src += `        print("Incorrect API")\n`;
    src += `    return None\n\n`;
    src += `client = create_client(api_key)`;
    setCode(src);
    setPackages([
      "import os",
      "from dotenv import load_dotenv",
      "import openai",
    ]);
    if (setMetadata) {
      setMetadata({
        dotenvVar,
        docsUrl: DOCS_URL,
      });
    }
  }, [dotenvVar]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["dotenvVar"] !== undefined) setDotenvVar(metadata["dotenvVar"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={OpenAIIcon}
        label={"OpenAI Client"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Enter dotenv variable with API KEY"}
        name={dotenvVar}
        setName={setDotenvVar}
      />
    </div>
  );
};

export const ClientRecipe: IRecipe = {
  name: "Client connection",
  longName: "OpenAI client connection",
  parentName: "OpenAI",
  description: "Learn how to securely load and use an OpenAI API key from an environment variable in Python with this detailed guide. We'll start by loading the .env file and retrieving the API key stored as OPENAI_KEY. Next, we'll create a function create_client that initializes an OpenAI client using the retrieved API key. The function includes error handling to manage authentication issues, ensuring the API key is correct. Finally, we'll demonstrate listing available models from the OpenAI library, providing a complete and practical example for integrating OpenAI's API into your projects.",
  shortDescription: "Learn how to securely load and use an OpenAI API key from an environment variable in Python. This guide walks through creating a client instance, handling authentication errors, and listing available models using the OpenAI library.",
  codeExplanation: `
  1. Load dotenv file.
  2. Get API KEY from environment.
  3. Check API and create a client`,
  ui: Client,
  Icon: OpenAIIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default ClientRecipe;
