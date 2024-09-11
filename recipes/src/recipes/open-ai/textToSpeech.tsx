import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Select } from "../../components/Select";
import { SelectPath } from "../../components/SelectPath";
import { SpeakerIcon } from "../../icons/Speaker";

const DOCS_URL = "python-text-to-speech";

export const TextToSpeech: React.FC<IRecipeProps> = ({
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

  const [model, setModel] = useState("tts-1");
  const modelOptions = [
    ["TTS", "tts-1"],
    ["TSS HD", "tts-1-hd"],
  ] as [string, string][];
  const [voice, setVoice] = useState("alloy");
  const voiceOptions = [
    ["Alloy", "alloy"],
    ["Echo", "echo"],
    ["Fable", "fable"],
    ["Onyx", "onyx"],
    ["Nova", "nova"],
    ["Shimmer", "shimmer"],
  ] as [string, string][];
  const [text, setText] = useState("");
  const [fileName, setFileName] = useState("speech.mp3");
  const [filePath, setFilePath] = useState("");
  const [varType, setVarType] = useState("str");
  const varTypeOptions = [
    ["Text", "str"],
    ["Variable", "var"],
  ] as [string, string][];

  useEffect(() => {
    let src = `# set file path\n`;
    src += `file_path = os.path.join(r"${filePath}", "${fileName}")\n\n`;
    src += `# create api request \n`;
    src += `with client.audio.speech.with_streaming_response.create(\n`;
    src += `  model="${model}",\n`;
    src += `  voice="${voice}",\n`;
    if (varType === "str") {
      src += `  input="${text}"\n`;
    } else {
      src += `  input=${text}\n`;
    }
    src += `) as response:\n`;
    src += `  response.stream_to_file(file_path)\n\n`;
    src += `# play audio\n`;
    src += `Audio(file_path, autoplay=False)`;

    setCode(src);
    setPackages([
      "from openai import OpenAI",
      "import os",
      "from IPython.display import Audio",
    ]);
    if (setMetadata) {
      setMetadata({
        model,
        voice,
        text,
        fileName,
        filePath,
        varType,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, voice, text, fileName, filePath, varType]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["voice"] !== undefined) setVoice(metadata["voice"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["varType"] !== undefined) setVarType(metadata["varType"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SpeakerIcon}
        label={"Text to speech"}
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
        <Select
          label={"Choose voice"}
          option={voice}
          options={voiceOptions}
          setOption={setVoice}
          tooltip="Experiment with different voices to find one that matches your desired tone and audience. The current voices are optimized for English."
        />
      </div>
      <div className="poc-grid md:poc-grid-cols-[80%_20%] md:poc-gap-2">
        <Variable
          label={"Enter the text"}
          name={text}
          setName={setText}
          tooltip="This is the text that you want to be spoken aloud by the TTS model."
        />
        <Select
          label={"Choose method"}
          option={varType}
          options={varTypeOptions}
          setOption={setVarType}
          tooltip={"Choose if you want to type the text or give the variable with text."}
        />
      </div>
      <SelectPath
        label={
          "Select the output directory, leave empty to save in the current directory"
        }
        setPath={setFilePath}
        selectFolder={true}
        defaultPath={filePath}
      />
      <Variable
        label={"Enter file name"}
        name={fileName}
        setName={setFileName}
        tooltip={
          "This is the name of the file where the speech audio will be saved."
        }
      />
    </div>
  );
};

export const TextToSpeechRecipe: IRecipe = {
  name: "Text to speech",
  longName: "Generate audio speech from text using OpenAI API in Python",
  parentName: "OpenAI",
  description:
    "Learn how to generate and play speech from text using OpenAI's API in Python. This recipe covers setting the file path, creating an API request, streaming the audio response to a file, and playing the generated speech. Follow these steps to easily convert text into spoken audio and hear the results.",
  shortDescription:
    "Learn how to generate and play speech from text using OpenAI's API in Python. This recipe covers setting a file path, creating an API request, streaming the audio response to a file, and playing the audio.",
  codeExplanation: `
  1. Set the file path.
  2. Create the API request. 
  3. Save response as the audio file.
  4. Play audio in Jupyter Notebook.`,
  ui: TextToSpeech,
  Icon: SpeakerIcon,
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

export default TextToSpeechRecipe;
