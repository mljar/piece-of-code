import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { CLIENT_OPENAI } from "./utils";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { Select } from "../../components/Select";
import { TextIcon } from "../../icons/text";

const DOCS_URL = "speech-transcription-openai";

export const Transcriptions: React.FC<IRecipeProps> = ({
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
  const [format, setFormat] = useState("text");
  const formatOptions = [
    ["text", "text"],
    ["json", "json"],
    ["srt", "srt"],
    ["verbose_json", "verbose_json"],
    ["vtt", "vtt"],
  ] as [string, string][];

  useEffect(() => {
    let src = `# open the file\n`;
    src += `file = open(r"${filePath}", "rb")\n\n`;
    src += `# send transcription request\n`;
    src += `transcription = client.audio.transcriptions.create(\n`;
    src += `    model="whisper-1",\n`;
    src += `    file=file,\n`;
    src += `    response_format="${format}"\n`;
    src += `)\n\n`;
    src += `# print response\n`;
    src += `print(transcription)`;

    setCode(src);
    setPackages(["from openai import OpenAI"]);
    if (setMetadata) {
      setMetadata({
        filePath,
        format,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath, format]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["format"] !== undefined) setFormat(metadata["format"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={TextIcon}
        label={"Speech transcriptions"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <SelectPath
          label={"Select file"}
          defaultPath={filePath}
          setPath={setFilePath}
          tooltip={
            "File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm."
          }
        />
        <Select
          label={"Choose format"}
          option={format}
          options={formatOptions}
          setOption={setFormat}
          tooltip="The format of the transcript output."
        />
      </div>
    </div>
  );
};

export const TranscriptionsRecipe: IRecipe = {
  name: "Speech transcriptions",
  longName: "Create transcriptions for audio using OpenAI API in Python",
  parentName: "OpenAI",
  description:
    "Learn to transcribe audio to text using OpenAI's API in Python. This recipe walks you through sending a transcription request with a chosen model, managing the audio file, and printing the resulting transcription. Master these steps to seamlessly convert audio into accurate text with ease.",
  shortDescription:
    "Learn how to transcribe audio to text using OpenAI's API in Python. This recipe covers sending a transcription request with a specified model, handling the audio file, and printing the transcription response.",
  codeExplanation: `
  1. Send the transcription (API) request.
  2. Print the response.`,
  ui: Transcriptions,
  Icon: TextIcon,
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

export default TranscriptionsRecipe;
