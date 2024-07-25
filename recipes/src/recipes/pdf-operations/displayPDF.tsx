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
}) => {
  const [filePath, setFilePath] = useState("");
  const [width, setWidth] = useState(1000);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    let src = `# set PDF path\n`;
    src += `pdf_path = r"${filePath}"\n\n`;
    src += `# \n`;
    src += `# open PDF\n`;
    src += `with open(pdf_path, "rb") as pdf:\n`;
    src += `    content = pdf.read()\n\n`;
    src += `# encode PDF\n`;
    src += `base64_pdf = base64.b64encode(content).decode("utf-8")\n\n`;
    src += `# display encoded PDF\n`;
    src += `IFrame(f"data:application/pdf;base64,{base64_pdf}", width=${width? width:1000}, height=${height? height:500})`

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
  longName: "Display your PDF in the notebook",
  parentName: "PDF Operations",
  description: "Learn how to encode a PDF to base64 in Python and display it seamlessly. This guide covers setting the PDF path, reading the PDF file, encoding it to a base64 string, and using an IFrame to display the encoded PDF. Follow these steps to handle PDF files efficiently and integrate base64 encoding and display into your Python applications.",
  shortDescription: "Learn how to encode a PDF to base64 in Python and display it. This guide covers setting the PDF path, reading and encoding the PDF file, and using an IFrame to display the base64-encoded PDF.",
  codeExplanation: `
  1. Open the PDF.
  2. Encode the PDF Content (using Base64).
  3. Create an IFrame to display encoded PDF.`,
  ui: DisplayPDF,
  Icon: PDFIcon,
  requiredPackages: [
    { importName: "IPython", installationName: "ipython", version: ">=8.26.0" },
  ],
  docsUrl: DOCS_URL,
};

export default DisplayPDFRecipe;