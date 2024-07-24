import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { Select } from "../../components/Select";
import { TextIcon } from "../../icons/text";


const DOCS_URL = "python-client-openai";

export const Translations: React.FC<IRecipeProps> = ({
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
    src += `# send translation request\n`;
    src += `translation = client.audio.translations.create(\n`;
    src += `    model="whisper-1",\n`;
    src += `    file=file,\n`;
    src += `    response_format="${format}"\n`;
    src += `)\n\n`;
    src += `# print response\n`;
    src += `print(translation)`;

    setCode(src);
    setPackages([
      "import openai",
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
        label={"Speech Translations"}
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

export const TranslationsRecipe: IRecipe = {
  name: "Speech Translations",
  longName: "OpenAI Speech Translations",
  parentName: "OpenAI",
  description: "Learn how to translate any audio to English text using OpenAI's API in Python. This guide covers opening an audio file, sending a translation request with a specified model, and printing the response. You'll learn how to handle audio input, configure the API request, and process the response for seamless integration of audio translation into your Python applications.",
  shortDescription: "Learn how to translate any audio to English text using OpenAI's API in Python. This guide covers opening an audio file, sending a translation request with a specified model, and printing the response.",
  codeExplanation: `
  1. Send the translation (API) request.
  2. Print the response.`,
  ui: Translations,
  Icon: TextIcon,
  requiredPackages: [
    { importName: "openai", installationName: "openai", version: ">=1.35.14" },
  ],
  docsUrl: DOCS_URL,
};

export default TranslationsRecipe;