import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";
import { Variable } from "../../components/Variable";
import { SearchIcon } from "../../icons/Search";

const DOCS_URL = "find-pdf-with-given-information-python";

export const SearchInPDF: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [directoryPath, setDirectoryPath] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    let src = `# set directory path\n`;
    src += `directoryPath = r"${directoryPath}"\n\n`;
    src += `# declare lists and variables\n`;
    src += `readers = []\n`;
    src += `filenames = []\n`;
    src += `check = 0\n\n`;
    src += `# read PDFs\n`;
    src += `for file in Path(directoryPath).glob("*.pdf"):\n`;
    src += `    readers.append(PdfReader(str(file)))\n`;
    src += `    filenames.append(file.name)\n\n`;
    src += `# search for text in PDFs\n`;
    src += `for x in range(0, len(readers)):\n`;
    src += `    for i in range(0, len(readers[x].pages)):\n`;
    src += `        if "${text}" in readers[x].pages[i].extract_text().lower():\n`;
    src += `            print(f"File: {filenames[x]}, Page: {i+1}")\n`;
    src += `            check += 1\n\n`;
    src += `# securing condition\n`;
    src += `if check == 0: print("There is no such word in any pdf.")`;

    setCode(src);
    setPackages(["from pypdf import PdfReader", "from pathlib import Path"]);
    if (setMetadata) {
      setMetadata({
        directoryPath,
        text,
        docsUrl: DOCS_URL,
      });
    }
  }, [directoryPath, text]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["directoryPath"] !== undefined)
        setDirectoryPath(metadata["directoryPath"]);
      if (metadata["text"] !== undefined) setText(metadata["text"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SearchIcon}
        label={"Search text in many PDFs"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select direcory"}
        defaultPath={directoryPath}
        setPath={setDirectoryPath}
        selectFolder={true}
        tooltip={
          "Choose the directory with PDFs in which you want to find text."
        }
      />
      <Variable
        label={"Enter text"}
        name={text}
        setName={setText}
        tooltip={"Text which you want to find (lowercase)."}
      />
    </div>
  );
};

export const SearchInPDFRecipe: IRecipe = {
  name: "Search text in many PDFs",
  longName: "Search text in many PDF files using Python",
  parentName: "PDF Operations",
  description:
    "Learn to search for specific text in multiple PDF files using Python. This recipe explains how to set the directory path, read PDF files, and search for text within them. It shows how to print filenames and page numbers where the text appears and how to notify if no matches are found, streamlining text search in PDFs.",
  shortDescription:
    "Learn how to search for text in PDFs using Python. This recipe covers setting the directory path, reading files, finding text, printing filenames and page numbers where the text appears or notifying about no matches.",
  codeExplanation: `
  1. Set the directory path.
  2. Declare lists and a counter.
  3. Read PDFs from the given directory.
  4. Search for the given text.
  5. Hand the case when the given text is not found.`,
  ui: SearchInPDF,
  Icon: SearchIcon,
  requiredPackages: [
    { importName: "IPython", installationName: "ipython", version: ">=8.26.0" },
    { importName: "pypdf", installationName: "pypdf", version: ">=4.1.0" },
  ],
  docsUrl: DOCS_URL,
};

export default SearchInPDFRecipe;
