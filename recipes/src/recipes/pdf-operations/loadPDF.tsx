import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { SelectPath } from "../../components/SelectPath";
import { LoadFileIcon } from "../../icons/LoadFIle";

const DOCS_URL = "read-python-pdf";

export const LoadPDF: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [filePath, setFilePath] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    let src = `# set PDF path\n`;
    src += `filePath = r"${filePath}"\n\n`;
    src += `# read PDF\n`;
    src += `reader = PdfReader(filePath)\n\n`;
    if (pages) {
      src += `# specify number of pages\n`;
      src += `pages = len(reader.pages)\n`;
      src += `print("Number of pages: ", pages)\n\n`;
    }
    if (showText) {
      src += `# show text from page\n`;
      src += `text = reader.pages[${(page ? page : 1) - 1}].extract_text()\n`;
      src += `print(text)`;
    }

    setCode(src);
    setPackages(["from pypdf import PdfReader", "from pathlib import Path"]);
    if (setMetadata) {
      setMetadata({
        filePath,
        page,
        pages,
        showText,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath, page, pages, showText]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["page"] !== undefined) setPage(metadata["page"]);
      if (metadata["showText"] !== undefined) setShowText(metadata["showText"]);
      if (metadata["pages"] !== undefined) setPages(metadata["pages"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={LoadFileIcon}
        label={"Load PDF"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select file"}
        defaultPath={filePath}
        setPath={setFilePath}
        tooltip={"Choose the PDF which you want to load."}
      />
      <div className="poc-grid md:poc-grid-cols-6 md:poc-gap-2">
        <Toggle label={"Pages count"} value={pages} setValue={setPages} />
        <Toggle
          label={"Display text"}
          value={showText}
          setValue={setShowText}
        />
        {showText && (
          <Numeric
            label={"Page number"}
            name={page}
            setName={setPage}
            tooltip={"Number of the page from which you want to display text."}
            minValue={1}
          />
        )}
      </div>
    </div>
  );
};

export const LoadPDFRecipe: IRecipe = {
  name: "Load PDF",
  longName: "Load the PDF file into Python Notebook",
  parentName: "PDF Operations",
  description:
    "Learn to read and extract text from PDF files in Python. This recipe walks you through setting the PDF path, reading the file, counting the pages, and extracting text from a specific page using the PdfReader library. Perfect for efficiently processing and analyzing PDF documents in your projects.",
  shortDescription:
    "Learn how to read and extract text from PDF files in Python. This recipe covers setting the PDF path, reading the file, counting the number of pages, and extracting text from a specific page using the PdfReader library.",
  codeExplanation: `
  1. Set path to the PDF.
  2. Read the PDF.
  3. Specify the number of pages in the given PDF.
  4. Display text from a specific page from the PDF.`,
  ui: LoadPDF,
  Icon: LoadFileIcon,
  requiredPackages: [
    { importName: "pypdf", installationName: "pypdf", version: ">=4.1.0" },
  ],
  docsUrl: DOCS_URL,
};

export default LoadPDFRecipe;
