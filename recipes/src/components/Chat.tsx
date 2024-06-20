import React, { useEffect, useId, useRef, useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import markdownit from "markdown-it";
import { SendIcon } from "../icons/Send";
import ollama from "ollama/browser";
import { PlayerStopIcon } from "../icons/PlayerStop";
import IVariable from "./IVariable";

const DOCS_URL = "python-notebook-ai-assistant";

const md = markdownit();

export interface IChatProps {
  variablesStatus: "loading" | "loaded" | "error" | "unknown";
  variables: IVariable[];
  setCode: (src: string) => void;
  metadata: any;
  setMetadata: (m: any) => void;
  isStatic: boolean;
  fixError?: string;
}

var stopStreaming = false;

export const Chat: React.FC<IChatProps> = ({
  variablesStatus,
  variables,
  setCode,
  metadata,
  setMetadata,
  isStatic,
  fixError,
}: IChatProps) => {
  const [streaming, setStreaming] = useState(false);
  const [lastMsg, setLastMsg] = useState(``);
  const [checkingLLM, setCheckingLLM] = useState(true);
  const [isLLMRunning, setIsLLMRunning] = useState(false);
  const [isLlama3Running, setIsLlama3Running] = useState(false);
  const elementRef = useRef<null | HTMLDivElement>(null);
  const scrollToElement = () => {
    const { current } = elementRef;
    if (current !== null) {
      console.log("scroll");
      current.scrollIntoView({ behavior: "smooth" });
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
      response.models.forEach((m: any) => {
        if (m.name.includes("llama3")) {
          setIsLlama3Running(true);
        }
      });
    } catch (error) {}
    setCheckingLLM(false);
  };

  useEffect(() => {
    if (!isStatic) {
      isOllamaRunning();
    }
  }, [isStatic]);

  const [askedToFix, setAskedToFix] = useState(false);

  useEffect(() => {
    if (isLlama3Running && fixError !== undefined && !askedToFix) {
      setAskedToFix(true);
      lama(fixError);
    }
  }, [isLlama3Running, fixError, askedToFix]);

  const lama = async (prompt: string) => {
    const varDesc = getVariablesDesc();
    console.log(varDesc);
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
      model: "llama3",
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

    if (setMetadata) {
      setMetadata({
        msgs: [...msgs, prompt, fullResponse],
        //variables: variables,
        docsUrl: DOCS_URL,
      });
    }
    scrollToElement();
  };

  useEffect(() => {
    const blockStart = lastMsg.search("```");

    if (blockStart !== -1) {
      const blockEnd = lastMsg.slice(blockStart + 1).search("```");

      // add 1 char for new line
      let start = blockStart + 4;
      const blockPython = lastMsg.search("```python");
      if (blockPython !== -1) {
        start = blockStart + 10;
      }

      if (blockEnd !== -1) {
        setCode(lastMsg.slice(start, blockEnd));
      } else {
        setCode(lastMsg.slice(start));
      }
    }
  }, [lastMsg]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["msgs"]) setMsgs(metadata["msgs"]);
    }
  }, [metadata]);

  const [msgs, setMsgs] = useState([] as string[]);
  const [msg, setMsg] = useState("");

  const aiResponse = (m: string, index: number) => {
    return (
      <div key={`msg-${index}`} className="poc-py-2 poc-my-2 poc-self-end">
        <div
          className="poc-prose poc-max-w-none prose-headings:poc-py-0 prose-headings:poc-my-0 prose-headings:poc-text-base
          prose-p:poc-leading-6 prose-p:poc-py-1 prose-p:poc-my-1 
          prose-pre:poc-py-1 prose-pre:poc-my-1
          prose-ul:poc-py-1 prose-ul:poc-my-1
          prose-ol:poc-py-1 prose-ol:poc-my-1
          prose-li:poc-py-1 prose-li:poc-my-1 prose-li:poc-leading-6 poc-prose-sm"
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
            Can't detect llama3 model.
            <br />
            Please check https://ollama.com/ to run llama3 model.
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
        className="poc-flex poc-flex-col poc-w-full poc-max-w-full poc-p-4 poc-border"
        style={{ minHeight: "266px", maxHeight: "266px" }}
        ref={elementRef}
      >
        <div
          className="poc-flex-1 poc-p-4 poc-overflow-y-auto poc-border-2 poc-border-red-400 "
          style={{ maxHeight: "266px" }}
          
        >
          {msgsElements}
          {streaming && lastMsg !== "" && <>{aiResponse(lastMsg, 1010101)}</>}
          {streaming && lastMsg === "" && (
            <>{aiResponse("Waiting for AI response ...", 1010101)} </>
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
                      console.log("stop");
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
                  placeholder={"Write prompt ..."}
                  value={msg}
                  onChange={(e) => {
                    setMsg(e.target.value);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      lama(msg);
                      setMsg("");
                      e.preventDefault();
                    }
                  }}
                  aria-label={`Input chat`}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
