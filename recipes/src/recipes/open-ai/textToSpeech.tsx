import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
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
  setMetadata,
}) => {
    const [model, setModel] = useState("tts-1");
    const modelOptions = [
        ["TTS", "tts-1"],
        ["TSS HD", "tts-1-hd"]
    ] as [string, string][];
    const [voice, setVoice] = useState("alloy");
    const voiceOptions = [
        ["Alloy", "alloy"],
        ["Echo", "echo"],
        ["Fable", "fable"],
        ["Onyx", "onyx"],
        ["Nova", "nova"],
        ["Shimmer", "shimmer"]
    ] as [string, string][];
    const [text, setText] = useState("");
    const [fileName, setFileName] = useState("speech.mp3");
    const [filePath, setFilePath] = useState("");


  useEffect(() => {
    let src = `# set file path\n`;
    src += `file_path = os.path.join(r"${filePath}", "${fileName}")\n\n`;
    src += `# create api request \n`
    src += `with client.audio.speech.with_streaming_response.create(\n`;
    src += `  model="${model}",\n`;
    src += `  voice="${voice}",\n`;
    src += `  input="${text}"\n`;
    src += `) as response:\n`;
    src += `  response.stream_to_file(file_path)\n\n`;
    src += `# play audio\n`
    src += `Audio(file_path, autoplay=False)`;


    setCode(src);
    setPackages([
      "import openai",
      "import os",
      "from IPython.display import Audio"
    ]);
    if (setMetadata) {
      setMetadata({
        model,
        voice,
        text,
        fileName,
        filePath,
        docsUrl: DOCS_URL,
      });
    }
  }, [model, voice, text, fileName, filePath]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["model"] !== undefined) setModel(metadata["model"]);
      if (metadata["voice"] !== undefined) setVoice(metadata["voice"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
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
      <Variable
        label={"Enter the text"}
        name={text}
        setName={setText}
        tooltip="This is the text that you want to be spoken aloud by the TTS model."
      />
      <SelectPath
        label={"Select the output directory, leave empty to save in the current directory"}
        setPath={setFilePath}
        selectFolder={true}
        defaultPath={filePath}
      />
      <Variable
        label={"Enter file name"}
        name={fileName}
        setName={setFileName}
        tooltip={"This is the name of the file where the speech audio will be saved."}
      />
    </div>
  );
};

export const TextToSpeechRecipe: IRecipe = {
  name: "Text to speech",
  longName: "OpenAI text to speech",
  parentName: "OpenAI",
  description: "Learn how to generate and play speech from text using OpenAI's API in Python. This guide covers setting a file path, creating an API request with a specified model and voice, streaming the audio response to save it, and playing the audio file. Follow these steps to seamlessly integrate text-to-speech capabilities and audio playback into your Python applications.",
  shortDescription: "Learn how to generate and play speech from text using OpenAI's API in Python. This guide covers setting a file path, creating an API request, streaming the audio response to a file, and playing the audio.",
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
};

export default TextToSpeechRecipe;