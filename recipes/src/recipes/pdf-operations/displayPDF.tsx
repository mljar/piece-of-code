import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Numeric } from "../../components/Numeric";
import { SelectPath } from "../../components/SelectPath";
import { PDFIcon } from "../../icons/PDF";

const DOCS_URL = "display-pdf-python";

export const DisplayPDF: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  hideTitle,
}) => {
  const [filePath, setFilePath] = useState("");
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    let src = `# set PDF path\n`;
    src += `pdf_path = r"${filePath}"\n\n`;
    src += `# open PDF\n`;
    src += `with open(pdf_path, "rb") as pdf:\n`;
    src += `    content = pdf.read()\n\n`;
    src += `# encode PDF\n`;
    src += `base64_pdf = base64.b64encode(content).decode("utf-8")\n\n`;
    src += `# display encoded PDF\n`;
    src += `IFrame(f"data:application/pdf;base64,{base64_pdf}", width=${width ? width : 1000}, height=${height ? height : 500})`;

    setCode(src);
    setPackages(["import base64", "from IPython.display import IFrame"]);
    if (setMetadata) {
      setMetadata({
        filePath,
        width,
        height,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath, width, height]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["width"] !== undefined) setWidth(metadata["width"]);
      if (metadata["height"] !== undefined) setHeight(metadata["height"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={PDFIcon}
        label={"Display PDF"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
        hideTitle={hideTitle}
      />
      <SelectPath
        label={"Select file"}
        defaultPath={filePath}
        setPath={setFilePath}
        tooltip={"Choose the PDF which you want to display."}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Numeric
          label={"Set width"}
          name={width}
          setName={setWidth}
          tooltip={"Set the width of the output PDF."}
        />
        <Numeric
          label={"Set height"}
          name={height}
          setName={setHeight}
          tooltip={"Set the height of the output PDF"}
        />
      </div>
    </div>
  );
};

export const DisplayPDFRecipe: IRecipe = {
  name: "Display PDF",
  longName: "Display the PDF file in the Python Notebook",
  parentName: "PDF Operations",
  description:
    "Learn how to display a PDF in Python. This recipe walks you through opening a PDF file, encoding it to Base64, and displaying it interactively in your notebook using an IFrame. Ideal for viewing PDFs directly within your Python projects, making it easy to integrate and display documents seamlessly.",
  shortDescription:
    "Learn how to display a PDF in Python. This recipe covers opening a PDF, encoding it to Base64, and displaying it interactively in your notebook using an IFrame.  Perfect for viewing PDFs directly in your Python projects.",
  codeExplanation: `
  1. Open the PDF.
  2. Encode the PDF Content (using Base64).
  3. Create an IFrame to display encoded PDF.`,
  ui: DisplayPDF,
  Icon: PDFIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default DisplayPDFRecipe;
