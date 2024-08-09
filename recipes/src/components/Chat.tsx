import React, { useEffect, useId, useRef, useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import markdownit from "markdown-it";
import { SendIcon } from "../icons/Send";
import ollama from "ollama/browser";
import { PlayerStopIcon } from "../icons/PlayerStop";
import IVariable from "./IVariable";
import ExecutionStatus from "./ExecutionStatus";
import { PlayIcon } from "../icons/Play";
import { PlusIcon } from "../icons/Plus";
import { CakeIcon } from "../icons/Cake";
import { getStatusElements } from "./RunStatus";
import { WandIcon } from "../icons/Wand";
import { Select } from "./Select";

const DOCS_URL = "python-notebook-ai-assistant";

const md = markdownit();

export interface IChatProps {
  variablesStatus: "loading" | "loaded" | "error" | "unknown";
  variables: IVariable[];
  setCode: (src: string) => void;
  metadata: any;
  setMetadata: (m: any) => void;
  isStatic: boolean;
  runCell: () => void;
  executionSteps: [string, ExecutionStatus][];
  errorName: string;
  errorValue: string;
  currentCode: string;
  getCellCode: () => string;
  clearExecutionSteps: () => void;
  addCell: () => void;
}

var stopStreaming = false;

export const Chat: React.FC<IChatProps> = ({
  variablesStatus,
  variables,
  setCode,
  metadata,
  setMetadata,
  isStatic,
  runCell,
  executionSteps,
  errorName,
  errorValue,
  currentCode,
  getCellCode,
  clearExecutionSteps,
  addCell,
}: IChatProps) => {
  const [streaming, setStreaming] = useState(false);
  const [lastMsg, setLastMsg] = useState(``);
  const [checkingLLM, setCheckingLLM] = useState(true);
  const [isLLMRunning, setIsLLMRunning] = useState(false);
  const [isLlama3Running, setIsLlama3Running] = useState(false);
  const elementRef = useRef<null | HTMLDivElement>(null);
  const [showControlButtons, setShowControlButtons] = useState(true);
  const inputRef = useRef<null | HTMLInputElement>(null);

  const scrollToElement = (scrollBy = 10) => {
    const { current } = elementRef;
    if (current !== null) {
      current.scrollBy(0, scrollBy);
    }
  };

  const getVariablesDesc = () => {
    if (variables === undefined) {
      return "";
    }
    const descs = variables.map((v) => {
      let d = `${v.varName} is type of ${v.varType}`;
      if (v.isMatrix) {
        d += `, shape ${v.varShape}`;
        if (v.varColumns.length < 20) {
          d += `, columns=[`;
          d += v.varColumns.join(", ");
          d += `]`;
        } else {
          d += `, columns=[`;
          d += v.varColumns.slice(0, 20).join(", ");
          d += `, ...]`;
        }
      }
      return d;
    });
    return descs.join("; ");
  };

  const isOllamaRunning = async () => {
    try {
      const response = await ollama.list();
      setIsLLMRunning(true);
      if (response.models.length > 0) {
        setIsLlama3Running(true);
      }
    } catch (error) { }
    setCheckingLLM(false);
  };

  useEffect(() => {
    if (!isStatic) {
      isOllamaRunning();
    }
  }, [isStatic]);

  // const [askedToFix, setAskedToFix] = useState(false);

  // useEffect(() => {
  //   if (isLlama3Running && fixError !== undefined && !askedToFix) {
  //     setAskedToFix(true);
  //     lama(fixError);
  //   }
  // }, [isLlama3Running, fixError, askedToFix]);

  const lama = async (prompt: string) => {
    clearExecutionSteps();
    const varDesc = getVariablesDesc();

    setStreaming(true);
    setMsgs([...msgs, prompt]);
    let messages = [
      {
        role: "system",
        content: `You are AI assistant in MLJAR Studio application. You help to write Python code. Please return ONLY python code. Please DO NOT return output with code evaluation, unless asked to. Always use markdown format.`,
      },
    ];
    if (varDesc !== "") {
      messages.push({
        role: "user",
        content: `Variables available: ${varDesc}`,
      });
    }
    msgs.forEach((m, index) => {
      if (index % 2 === 0) {
        messages.push({ role: "user", content: m });
      }
    });
    messages.push({ role: "user", content: prompt });

    const response = await ollama.chat({
      model: model,
      messages: messages,
      stream: true,
    });
    let fullResponse = "";

    for await (const part of response) {
      if (stopStreaming) {
        stopStreaming = false;
        setStreaming(false);
        break;
      }
      fullResponse += part.message.content;
      setLastMsg(fullResponse);
      scrollToElement();
    }

    setLastMsg(fullResponse);
    setStreaming(false);
    stopStreaming = false;
    setMsgs([...msgs, prompt, fullResponse]);

    if (setMetadata && msgs.length > 0) {
      setMetadata({
        msgs: [...msgs, prompt, fullResponse],
        docsUrl: DOCS_URL,
      });
    }
    scrollToElement();
  };

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["msgs"]) setMsgs(metadata["msgs"]);
    }
  }, [metadata]);

  const [msgs, setMsgs] = useState([] as string[]);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let m = lastMsg;
    if (msgs.length > 1 && msgs.length % 2 === 0) {
      m = msgs[msgs.length - 1];
    }

    const blockStart = m.indexOf("```");

    if (blockStart !== -1) {
      let src = "";
      // add 1 char for new line
      let start = blockStart + 4;
      const blockPython = m.indexOf("```python");
      if (blockPython !== -1) {
        start = blockStart + 10;
      }
      const blockEnd = m.indexOf("\n```", start + 1);

      if (blockEnd !== -1) {
        src = m.slice(start, blockEnd);
      } else {
        src = m.slice(start);
      }
      setCode(src);
    }
  }, [lastMsg, msgs]);

  useEffect(() => {
    if (errorName !== "") {
      setMsg(
        `Please fix ${errorName} ${errorValue} in \`\`\`${getCellCode()}\`\`\``
      );
    }
  }, [errorName, errorValue]);

  useEffect(() => {
    if (!streaming) {
      inputRef.current?.focus();
      scrollToElement(100);
    }
  }, [streaming]);

  useEffect(() => {
    scrollToElement(100);
  }, [executionSteps]);

  const aiResponse = (m: string, index: number) => {
    return (
      <div key={`ai-msg-${index}`} className="poc-py-2 poc-self-end">
        <div
          className="poc-prose poc-max-w-none prose-headings:poc-py-0 prose-headings:poc-my-0 prose-headings:poc-text-base
          prose-p:poc-leading-6 prose-p:poc-py-1 prose-p:poc-my-1 
          prose-pre:poc-py-1 prose-pre:poc-my-1
          prose-ul:poc-py-1 prose-ul:poc-my-1
          prose-ol:poc-py-1 prose-ol:poc-my-1
          prose-li:poc-py-1 prose-li:poc-my-1 prose-li:poc-leading-6 poc-prose-sm dark:poc-prose-invert"
          dangerouslySetInnerHTML={{
            __html: md.render(m),
          }}
        ></div>
      </div>
    );
  };

  const msgsElements = msgs.map((m, index) => {
    if (index % 2 === 0) {
      return (
        <div
          key={`msg-${index}`}
          className="poc-inline poc-p-1.5 poc-my-2 poc-bg-blue-100 poc-rounded-md poc-text-sm"
        >
          {m}
        </div>
      );
    } else {
      return aiResponse(m, index);
    }
  });

  const [models] = useState([] as string[])
  const [model, setModel] = useState(models[0]);

  const fetchModels = async () => {
    const resopnse = await ollama.list();
    setModel(resopnse.models[0].name);

    resopnse.models.forEach((m: any) => {
      models.push(m.name);
    });
  };

  useEffect(() => {
    fetchModels();
  }, []);

  if (!isStatic) {
    if (checkingLLM) {
      return (
        <div
          className="poc-flex poc-items-center poc-justify-center  "
          style={{ minHeight: "266px", maxHeight: "266px" }}
        >
          <pre>Loading AI Assistant ...</pre>
        </div>
      );
    }

    if (!isLLMRunning) {
      return (
        <div
          className="poc-flex poc-items-center poc-justify-center  "
          style={{ minHeight: "266px", maxHeight: "266px" }}
        >
          <pre>
            Can't detect ollama running.
            <br />
            Please check https://ollama.com/ to download ollama.
            <br />
            You can do it!
          </pre>
        </div>
      );
    }

    if (!isLlama3Running) {
      return (
        <div
          className="poc-flex poc-items-center poc-justify-center  "
          style={{ minHeight: "266px", maxHeight: "266px" }}
        >
          <pre>
            Ollama was detected on your system.
            <br />
            But no LLM model was detected.
            <br />
            Please check https://ollama.com/library to run model of your choice.
            <br />
            You can do it!
          </pre>
        </div>
      );
    }
  }

  return (
    <div
      className="poc-flex poc-items-center poc-justify-center  "
      style={{ minHeight: "266px", maxHeight: "266px" }}
    >
      <div
        className="poc-flex poc-flex-col poc-w-full poc-max-w-full"
        style={{ minHeight: "266px", maxHeight: "266px" }}
      >
        <div
          className="poc-w-80 poc-self-end"
        >
          <Select
            label={""}
            option={model}
            options={models.map((m) => [m, m])}
            setOption={setModel}
          />
        </div>
        <div
          className="poc-flex-1 poc-overflow-y-auto poc-p-4"
          style={{ maxHeight: "266px", height: "266px" }}
          ref={elementRef}
        >
          {msgs.length === 0 && <>How can I help you?</>}
          {msgsElements}
          {streaming && lastMsg !== "" && <>{aiResponse(lastMsg, 1010101)}</>}
          {streaming && lastMsg === "" && (
            <>{aiResponse("Waiting for AI response ...", 1010101)} </>
          )}

          {!streaming && msgs.length > 1 && msg === "" && (
            <div>
              <div className="poc-inline">
                <button
                  type="button"
                  className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg 
                  poc-text-sm poc-px-2 poc-py-1 poc-text-center"
                  onClick={() => runCell()}
                >
                  {<PlayIcon className="poc-inline poc-py-1" />}Run cell
                </button>
              </div>
              {/* {errorName !== "" && executionSteps.length > 0 && (
                <div className="poc-inline">
                  <button
                    data-tooltip-id="top-buttons-tooltip"
                    data-tooltip-content="Add new cell below"
                    type="button"
                    className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-ml-1"
                    onClick={() => {
                      lama(msg);
                      clearExecutionSteps();
                      setMsg("");
                    }}
                  >
                    <WandIcon className="poc-inline poc-pb-1" />
                    Fix error
                  </button>
                </div>
              )} */}
              <div className="poc-inline">
                <button
                  data-tooltip-id="top-buttons-tooltip"
                  data-tooltip-content="Add new cell below"
                  type="button"
                  className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-ml-1"
                  onClick={() => addCell()}
                >
                  <PlusIcon className="poc-inline poc-pb-1" />
                  Add cell
                </button>
              </div>
              {/* <div className="poc-inline">
                <button
                  data-tooltip-id="top-buttons-tooltip"
                  data-tooltip-content="Open Piece of Code and overwrite with new code"
                  type="button"
                  className="poc-text-white poc-bg-gradient-to-r poc-from-yellow-400 
                poc-to-yellow-500 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:ring-teal-300 dark:focus:ring-teal-800        poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center "
                  onClick={() => {}}
                >
                  <CakeIcon className="poc-inline poc-pb-1" />
                  Recipes
                </button>
              </div> */}
            </div>
          )}
          {!streaming && msg === "" && executionSteps.length > 0 && (
            <div className="poc-py-2 dark:poc-text-slate-100">
              <b>Code execution</b>
              {getStatusElements(executionSteps)}
            </div>
          )}
        </div>

        {!isStatic && (
          <div className="poc-p-0 poc-bg-gray-200">
            <div className="">
              <div className="poc-w-full poc-border-t poc-relative poc-bg-gray-50 dark:poc-bg-gray-700">
                {!streaming && (
                  <button
                    className="!poc-absolute poc-right-1 poc-top-1 poc-z-10 poc-p-2 poc-pt-3 disabled:poc-text-gray-300"
                    onClick={() => {
                      if (msg !== "") {
                        lama(msg);
                        setMsg("");
                      }
                    }}
                    disabled={msg === ""}
                  >
                    {" "}
                    <SendIcon className="poc-inline" />
                  </button>
                )}

                {streaming && (
                  <button
                    className="!poc-absolute poc-right-1 poc-top-1 poc-z-10 poc-p-2 poc-pt-3 disabled:poc-text-gray-300"
                    onClick={() => {
                      stopStreaming = true;
                    }}
                  >
                    {" "}
                    <PlayerStopIcon className="poc-inline" />
                  </button>
                )}

                <input
                  type="text"
                  className="poc-peer poc-w-11/12  poc-bg-gray-50 poc-text-gray-900
             poc-p-4  poc-outline-0 dark:poc-bg-gray-700   dark:poc-placeholder-gray-400 dark:poc-text-white"
                  placeholder={
                    streaming
                      ? "Please wait for response ..."
                      : "Please write prompt ..."
                  }
                  value={msg}
                  onChange={(e) => {
                    if (executionSteps.length) clearExecutionSteps();
                    setMsg(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && msg !== "") {
                      lama(msg);
                      setMsg("");
                      e.preventDefault();
                    }
                  }}
                  aria-label={`Input chat`}
                  disabled={streaming}
                  ref={inputRef}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
