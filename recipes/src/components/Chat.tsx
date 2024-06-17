import React, { useState } from "react";
import { IPackage, IRecipeSet } from "../recipes/base";
import markdownit from "markdown-it";
import { SendIcon } from "../icons/Send";
import ollama from "ollama/browser";

const md = markdownit();

// Remember the old renderer if overridden, or proxy to the default renderer.
var defaultRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, env, self) {
    return self.renderToken(tokens, idx, options);
  };

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  tokens[idx].attrSet("target", "_blank");

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self);
};

export interface IChatProps {}

export const Chat: React.FC<IChatProps> = ({}: IChatProps) => {
  const [streaming, setStreaming] = useState(false);
  const [lastMsg, setLastMsg] = useState(``);
  const lama = async (prompt: string) => {
    const messages = [
      {
        role: "system",
        content:
          "You are AI assistant in MLJAR Studio application. You help to write Python code. Please return ONLY python code.",
      },
      { role: "user", content: prompt },
    ];
    const response = await ollama.chat({
      model: "llama3",
      messages: messages,
      stream: true,
    });
    let fullResponse = "";
    setStreaming(true);
    for await (const part of response) {
      fullResponse += part.message.content;
      setLastMsg(fullResponse);
    }
    setStreaming(false);
    console.log(msgs);
    setMsgs([...msgs, fullResponse]);
  };

  //lama();

  const [msgs, setMsgs] = useState([
    //"helloo",
    // "test",
    // "asdfasdf",
    // "test",
    // "asdfasdf",
    // "test",
    // "asdfasdf",
    // "test",
    // "asdfasdf",
  ] as string[]);
  const [msg, setMsg] = useState("");

  const msgsElements = msgs.map((m, index) => {
    if (index % 2 === 0) {
      return (
        <div
          key={`msg-${index}`}
          className="poc-inline poc-p-2 poc-my-2 poc-bg-blue-100 poc-rounded-md poc-text-sm"
        >
          {m}
        </div>
      );
    } else {
      return (
        <div key={`msg-${index}`} className="poc-p-2 poc-my-2 poc-self-end">
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
    }
  });

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
          className="poc-flex-1 poc-p-4 poc-overflow-y-auto "
          style={{ maxHeight: "266px" }}
        >
          {msgsElements}

          {streaming && (
            <div className="poc-p-2 poc-my-2 poc-self-end">
              <div
                className="poc-prose poc-max-w-none prose-headings:poc-py-0 prose-headings:poc-my-0 prose-headings:poc-text-sm
            prose-p:poc-leading-6 prose-p:poc-py-1 prose-p:poc-my-1 
            prose-pre:poc-py-1 prose-pre:poc-my-1
            prose-ul:poc-py-1 prose-ul:poc-my-1
            prose-ol:poc-py-1 prose-ol:poc-my-1
            prose-li:poc-py-1 prose-li:poc-my-1 prose-li:poc-leading-6 poc-prose-sm
             "
                dangerouslySetInnerHTML={{
                  __html: md.render(lastMsg),
                }}
              ></div>
            </div>
          )}
        </div>

        <div className="poc-p-0 poc-bg-gray-200">
          <div className="">
            <div className="poc-w-full poc-border-t poc-relative poc-bg-gray-50 dark:poc-bg-gray-700">
              <button
                className="!poc-absolute poc-right-1 poc-top-1 poc-z-10 poc-p-2 poc-pt-3 disabled:poc-text-gray-300"
                onClick={() => {
                  if (msg !== "") {
                    setMsgs([...msgs, msg]);
                    lama(msg);
                    setMsg("");
                  }
                }}
                disabled={msg === ""}
              >
                {" "}
                <SendIcon className="poc-inline" />
              </button>
              <input
                type="textarea"
                className="poc-peer poc-w-11/12  poc-bg-gray-50 poc-text-gray-900
             poc-p-4  poc-outline-0 dark:poc-bg-gray-700   dark:poc-placeholder-gray-400 dark:poc-text-white"
                placeholder={"Write prompt ..."}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                aria-label={`Input chat`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
