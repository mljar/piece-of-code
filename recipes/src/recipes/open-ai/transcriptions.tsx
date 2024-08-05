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
  setMetadata,
}) => {
    const [filePath, setFilePath] = useState("");
    const [format, setFormat] = useState("text");
    const formatOptions = [
        ["text", "text"],
        ["json", "json"],
        ["srt", "srt"],
        ["verbose_json", "verbose_json"],
        ["vtt", "vtt"]
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
    src += `print(transcription)`


    setCode(src);
    setPackages([
      "from openai import OpenAI",
    ]);
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
        label={"Speech Transcriptions"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />  
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
      <SelectPath
        label={"Select file"}
        defaultPath={filePath}
        setPath={setFilePath}
        tooltip={"File uploads are currently limited to 25 MB and the following input file types are supported: mp3, mp4, mpeg, mpga, m4a, wav, and webm."}
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
  name: "Speech Transcriptions",
  longName: "OpenAI Speech Transcriptions",
  parentName: "OpenAI",
  description: "Learn how to transcribe audio to text using OpenAI's API in Python. This guide covers sending a transcription request with a specified model, handling the audio file input, and setting the response format to text. Follow these steps to seamlessly integrate audio transcription capabilities into your Python applications and print the transcription response for easy access and analysis.",
  shortDescription: "Learn how to transcribe audio to text using OpenAI's API in Python. This guide covers sending a transcription request with a specified model, handling the audio file, and printing the transcription response.",
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
    }],
};

export default TranscriptionsRecipe;