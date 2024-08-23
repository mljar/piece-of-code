import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { GOOGLE_CONNECTION } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";

const DOCS_URL = "open-spreadsheet-python";

export const OpenSpreadSheet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {

  const vars = variables.filter((v) => v.varType.includes(GOOGLE_CONNECTION));

  if (variablesStatus === "loaded" && !vars.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There is no API connection in your notebook. Please create an API
          connection. You can use the Connection recipe.
        </p>
      </div>
    );
  }

  const [open, setOpen] = useState("title");
  const openOptions = [
    ["Title", "title"],
    ["KEY", "key"],
    ["URL", "url"],
  ] as [string, string][];
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    let src = ``;
    src += `# open spreadsheet\n`;
    if (open == "title") {
      src += `sh = gc.open('${title}')`;
    }
    if (open == "key") {
      src += `sh = gc.open_by_key('${key}')`;
    }
    if (open == "url") {
      src += `sh = gc.open_by_url('${url}')`;
    }

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        open,
        title,
        key,
        url,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [open, title, key, url]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["open"] !== undefined) setOpen(metadata["open"]);
      if (metadata["title"] !== undefined) setTitle(metadata["title"]);
      if (metadata["key"] !== undefined) setKey(metadata["key"]);
      if (metadata["url"] !== undefined) setUrl(metadata["url"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SpreadsheetIcon}
        label={"Open spreadsheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"What do you want to use?"}
          option={open}
          options={openOptions}
          setOption={setOpen}
          tooltip={
            "Choose the variable which you want to use to open the spreadsheet."
          }
        />
        {open == "title" && (
          <Variable
            label={"Enter title"}
            name={title}
            setName={setTitle}
            tooltip={"Enter the title of the spreadsheet you want to open."}
          />
        )}
        {open == "key" && (
          <Variable
            label={"Enter key"}
            name={key}
            setName={setKey}
            tooltip={"Enter the key of the spreadsheet you want to open."}
          />
        )}
        {open == "url" && (
          <Variable
            label={"Enter url"}
            name={url}
            setName={setUrl}
            tooltip={"Enter the title of the spreadsheet you want to open."}
          />
        )}
      </div>
    </div>
  );
};

export const OpenSpreadSheetRecipe: IRecipe = {
  name: "Open spreadsheet",
  longName: "Open the Google Sheets spreadsheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to open Google Sheets using Python with the gspread library. This recipe covers opening a spreadsheet by its name, by key, and by URL key. It provides detailed steps for accessing Google Sheets programmatically, enabling efficient data manipulation and retrieval from your Google Sheets documents for your Python applications.",
  shortDescription:
    "Learn how to open Google Sheets using Python. This recipe covers opening a spreadsheet by name, by key, and by URL key using the gspread library, providing essential methods for accessing Google Sheets programmatically.",
  codeExplanation: `
  1. Open the spreadsheet.`,
  ui: OpenSpreadSheet,
  Icon: SpreadsheetIcon,
  requiredPackages: [
    { importName: "gspread", installationName: "gspread", version: ">=6.1.2" },
  ],
  docsUrl: DOCS_URL,
  defaultVariables: [
    {
      varName: "gc",
      varType: GOOGLE_CONNECTION,
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

export default OpenSpreadSheetRecipe;
