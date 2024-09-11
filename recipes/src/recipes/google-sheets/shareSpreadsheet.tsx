import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { GOOGLE_CONNECTION, SPREADSHEET } from "./utils";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";

import { SpreadsheetIcon } from "../../icons/Spreadsheet";
import { spread } from "axios";

const DOCS_URL = "python-share-spreadsheet";

export const ShareSpreadSheet: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  metadata,
  setMetadata,
}) => {
  const vars = variables.filter((v) => v.varType.includes(GOOGLE_CONNECTION));

  const varsS = variables
    .filter((v) => v.varType.includes(SPREADSHEET))
    .map((v) => v.varName);
  const [spreadsheet, setSpreadsheet] = useState(
    varsS.length > 0 ? varsS[0] : ""
  );

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
  const [permission, setPermission] = useState("user");
  const permissionOptions = [
    ["User", "user"],
    ["Group", "group"],
    ["Domain", "domain"],
    ["Anyone", "anyone"],
  ] as [string, string][];
  const [role, setRole] = useState("reader");
  const roleOptions = [
    ["Owner", "owner"],
    ["Writer", "writer"],
    ["Reader", "reader"],
  ] as [string, string][];
  const [email, setEmail] = useState("");

  useEffect(() => {
    let src = ``;
    src += `# share spreadsheet\n`;
    src += `${spreadsheet}.share(email_address='${email}', perm_type='${permission}', role='${role}')`;

    setCode(src);
    setPackages(["import gspread"]);
    if (setMetadata) {
      setMetadata({
        permission,
        role,
        email,
        spreadsheet,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [permission, role, email, spreadsheet]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["permission"] !== undefined)
        setPermission(metadata["permission"]);
      if (metadata["role"] !== undefined) setRole(metadata["role"]);
      if (metadata["email"] !== undefined) setEmail(metadata["email"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={SpreadsheetIcon}
        label={"Share spreadsheet"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Select
        label={"Choose spreadsheet"}
        option={spreadsheet}
        options={varsS.map((d) => [d, d])}
        setOption={setSpreadsheet}
        tooltip={"Choose the spreadsheet you want to share."}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Select
          label={"Choose account type"}
          option={permission}
          options={permissionOptions}
          setOption={setPermission}
          tooltip={
            "Choose the type of account to which you want to share the sheet."
          }
        />
        <Select
          label={"Choose role"}
          option={role}
          options={roleOptions}
          setOption={setRole}
          tooltip={"Choose the primary role for the user."}
        />
      </div>
      <Variable
        label={"Enter email"}
        name={email}
        setName={setEmail}
        tooltip={
          "Enter the user or group e-mail address, domain name or None for 'anyone' type."
        }
      />
    </div>
  );
};

export const ShareSpreadSheetRecipe: IRecipe = {
  name: "Share spreadsheet",
  longName: "Share the Google Sheets spreadsheet using Python",
  parentName: "Google Sheets",
  description:
    "Learn how to share a Google Sheet using Python and the gspread library. This recipe covers the steps to set permissions, specify the user's email address, and assign roles to share the spreadsheet programmatically. Follow these instructions to efficiently manage access to your Google Sheets directly from your Python applications.",
  shortDescription:
    "Learn how to share a Google Sheet using Python and the gspread library. This recipe covers setting permissions, specifying the email address, and assigning roles to share the spreadsheet programmatically.",
  codeExplanation: `
  1. Share the spreadsheet.`,
  ui: ShareSpreadSheet,
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
    {
      varName: "sh",
      varType: SPREADSHEET,
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

export default ShareSpreadSheetRecipe;
