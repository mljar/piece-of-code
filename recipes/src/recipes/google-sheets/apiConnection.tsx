import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { SelectPath } from "../../components/SelectPath";

import { APIIcon } from "../../icons/API";

const DOCS_URL = "google-sheets-api-connection";

export const APICon: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [filePath, setFilePath] = useState("");

  useEffect(() => {
    let src = `# set filepath\n`;
    src += `filepath=r"${filePath}"\n\n`;
    src += `# create connection function\n`;
    src += `def connection(filepath):\n`;
    src += `    try:\n`;
    src += `        gc = gspread.service_account(filepath)\n`;
    src += `        print("Connection succeeded!")\n`;
    src += `        return gc\n`;
    src += `    except ValueError:\n`;
    src += `        print("Incorrect private key")\n\n`;
    src += `# connection\n`;
    src += `gc = connection(filepath)`;

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        filePath,
        docsUrl: DOCS_URL,
      });
    }
  }, [filePath]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={APIIcon}
        label={"Connection"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <SelectPath
        label={"Select file"}
        defaultPath={filePath}
        setPath={setFilePath}
        tooltip={
          "Please select the JSON file with credentials to connect with Google Sheets API"
        }
      />
    </div>
  );
};

export const APIConRecipe: IRecipe = {
  name: "Connection",
  longName: "Python Google Sheets API Connection",
  parentName: "Google Sheets",
  description:
    "Learn how to connect to Google Sheets using Python. This recipe covers using service account credentials, creating a connection function with error handling, and establishing the connection to Google Sheets using gspread. Follow these steps to seamlessly integrate your Python applications with Google Sheets for efficient data management and automation.",
  shortDescription:
    "Learn how to connect to Google Sheets using Python. This recipe covers using service account credentials, creating a connection function with error handling, and establishing the connection to Google Sheets using gspread.",
  codeExplanation: `
  1. Set the file path to your credentials.
  2. Create connection function with error handling.
  3. Establish the connection.`,
  ui: APICon,
  Icon: APIIcon,
  requiredPackages: [
    { importName: "gspread", installationName: "gspread", version: ">=6.1.2" },
  ],
  docsUrl: DOCS_URL,
};

export default APIConRecipe;
