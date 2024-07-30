import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Toggle } from "../../components/Toggle";
import { SelectPath } from "../../components/SelectPath";
import { LoadFileIcon } from "../../icons/LoadFIle";

const DOCS_URL = "python-read-many-pdf-from-directory";

export const LoadManyPDF: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
    const [directoryPath, setDirectoryPath] = useState("");
    const [list, setList] = useState(false);

  useEffect(() => {
    let src = `# set directory path\n`;
    src += `directoryPath = r"${directoryPath}"\n\n`;
    src += `# declare lists\n`;
    src += `readers = []\n`;
    src += `filenames = []\n\n`;
    src += `# read PDFs\n`;
    src += `for file in Path(directoryPath).glob("*.pdf"):\n`;
    src += `    readers.append(PdfReader(str(file)))\n`;
    src += `    filenames.append(file.name)`;
    if (list) {
        src += `\n\n# print PDFs information\n`;
        src += `for x in range(0, len(readers)):\n`;
        src += `    pages = len(readers[x].pages)\n`;
        src += `    print(f"Name: {filenames[x]}, Pages: {pages}")`;
    }

    
    setCode(src);
    setPackages(["from pypdf import PdfReader", "from pathlib import Path"]);
    if (setMetadata) {
      setMetadata({
        directoryPath,
        list,
        docsUrl: DOCS_URL,
      });
    }
  }, [directoryPath, list]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["directoryPath"] !== undefined) setDirectoryPath(metadata["directoryPath"]);
      if (metadata["list"] !== undefined) setList(metadata["list"]);
     }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={LoadFileIcon}
        label={"Load Many PDFs"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select direcory"}
        defaultPath={directoryPath}
        setPath={setDirectoryPath}
        selectFolder={true}
        tooltip={"Choose file from which you want to load the PDFs."}
      />
      <Toggle
        label={"PDFs information"}
        value={list}
        setValue={setList}
        tooltip={"Print PDFs information such as their names and the number of their pages."}
        />
    </div>
  );
};

export const LoadManyPDFRecipe: IRecipe = {
  name: "Load Many PDFs",
  longName: "Load many PDFs from given directory into the notebook in Python",
  parentName: "PDF Operations",
  description: "Learn how to read multiple PDF files from a directory using Python. We'll cover setting the directory path, iterating through PDF files, using the pypdf module - PdfReader to read each file, storing their filenames, and printing each PDF's name and page count. Follow these steps to efficiently manage and extract information from multiple PDFs in your Python applications.",
  shortDescription: "Learn how to read multiple PDF files in a directory using Python. This guide covers setting the directory path, reading PDFs, storing their filenames, and printing each PDF's name and page count.",
  codeExplanation: `
  1. Set the directory path.
  2. Declare lists.
  3. Read the PDFs.
  4. Print PDFs information (names and number of pages)`,
  ui: LoadManyPDF,
  Icon: LoadFileIcon,
  requiredPackages: [
    { importName: "IPython", installationName: "ipython", version: ">=8.26.0" },
    { importName: "pypdf", installationName: "pypdf", version: ">=4.1.0"}
  ],
  docsUrl: DOCS_URL,
};

export default LoadManyPDFRecipe;