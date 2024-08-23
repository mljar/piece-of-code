import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { OpenAIIcon } from "../../icons/OpenAI";

const DOCS_URL = "python-client-openai";

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
    src += `        client = OpenAI(api_key=api_key)\n`;
    src += `        client.models.list()\n`;
    src += `        return client\n`;
    src += `    except AuthenticationError:\n`;
    src += `        print("Incorrect API")\n`;
    src += `    return None\n\n`;
    src += `client = create_client(api_key)`;
    setCode(src);
    setPackages([
      "import os",
      "from dotenv import load_dotenv",
      "from openai import OpenAI, AuthenticationError",
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
      if (metadata["dotenvVar"] !== undefined)
        setDotenvVar(metadata["dotenvVar"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={OpenAIIcon}
        label={"OpenAI client"}
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
  longName: "Create OpenAI API client connection using Python",
  parentName: "OpenAI",
  description:
    "Learn how to load environment variables in Python, safely get API keys, and set up an OpenAI client. The recipe covers handling errors if the API key is wrong, making your code more secure and reliable. Perfect for developers who want to keep their API connections safe and their Python code strong.",
  shortDescription:
    "Learn how to load environment variables in Python, securely retrieve API keys, and create an OpenAI client with error handling for authentication errors. This recipe enhances code security and reliability.",
  codeExplanation: `
  1. Load dotenv file.
  2. Get API KEY from environment.
  3. Check API and create a client`,
  ui: Client,
  Icon: OpenAIIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
    { importName: "dotenv", installationName: "python-dotenv", version: ">=1.0.1"}
  ],
  docsUrl: DOCS_URL,
};

export default ClientRecipe;
