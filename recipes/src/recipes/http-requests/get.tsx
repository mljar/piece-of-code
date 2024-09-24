import React, { SetStateAction, useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { GetIcon } from "../../icons/httpGet";
import { Numeric } from "../../components/Numeric";
import { Select } from "../../components/Select";
import { Toggle } from "../../components/Toggle";
import { PlusIcon } from "../../icons/Plus";
import { TrashIcon } from "../../icons/Trash";
import { SelectPath } from "../../components/SelectPath";

const DOCS_URL = "python-http-get-request";

type ParamsType = {
  key: string;
  value: string;
};

export const GetRequest: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
  variablesStatus,
  variables,
}) => {

  // if (variablesStatus === "loading") {
  //     return (
  //         <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
  //             <p className="text-base text-gray-800 dark:text-white">
  //                 Loading variables ...
  //             </p>
  //         </div>
  //     );
  // }

  const [response, setResponse] = useState("response");
  const [url, setUrl] = useState("https://example.com");
  const [timeout, setTimeout] = useState(10);
  const [showResponse, setShowResponse] = useState(false);
  const [preetyPrint, setPreetyPrint] = useState(false);
  const [passParams, setPassParams] = useState(false);
  const [saveToFile, setSaveToFile] = useState(false);
  const [fileName, setFileName] = useState("response.json")
  const [filePath, setFilePath] = useState("")

  const [params, setParams] = useState([] as ParamsType[]);

  const authOptions: [string, string][] = [
    ["None", ""],
    ["HTTPBasicAuth", "HTTPBasicAuth"],
    ["HTTPDigestAuth", "HTTPDigestAuth"],
    ["Bearer", "Bearer"],
    ["API KEY", "ApiKey"]
  ];
  const [authOption, setAuthOption] = useState(authOptions[0][0]);
  const [token, setToken] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (!passParams) {
      setParams([]);
    } else {
      try {
        setParams([
          {
            key: "",
            value: "",
          },
        ]);
      } catch (error) { }
    }
  }, [passParams]);

  let rows = ""

  if (params.length >= 1) {
    for (let i = 0; i < params.length; i++) {
      let valArr = params[i].value.split(",");
      let valRow = ""
      for (let j = 0; j < valArr.length; j++) {
        valRow = valRow.concat("\"", valArr[j].trim(), "\", ")
      }
      rows = rows.concat("\"", params[i].key, "\": [", valRow, "], ",)
    }
  }

  useEffect(() => {
    let src = ``

    if (authOption !== "None") {
      src += `load_dotenv(override=True)\n\n`;
    }
    if (authOption === "ApiKey") {
      src += `headers = { "Authorization": f"ApiKey {os.getenv("${token}")}" }\n\n`;
    }
    if (authOption === "Bearer") {
      src += `headers = { "Authorization": f"Bearer {os.getenv("${token}")}" }\n\n`;
    }

    if (passParams) {
      src += `payload = { ${rows} }\n\n`;
    }

    src += `${response} = requests.get(\n`;
    src += `    url = "${url}",\n`;

    if (authOption === "") { }
    else if (authOption === "Bearer" || authOption === "ApiKey") {
      src += `    headers=headers,\n`;
    }
    else if (authOption === "HTTPBasicAuth") {
      src += `    auth=HTTPBasicAuth(os.getenv("${username}"),os.getenv("${password}")),\n`;
    }
    else if (authOption === "HTTPDigestAuth") {
      src += `    auth=HTTPDigestAuth(os.getenv("${username}"),os.getenv("${password}")),\n`;
    }

    if (passParams) {
      src += `    params=payload,\n`;
    }

    src += `    timeout=${timeout},\n`;
    src += `)\n\n`;

    src += `${response}.raise_for_status()`;

    if (saveToFile) {
      src += `\n\nwith open(os.path.join(r"${filePath}", "${fileName}"), "wb") as file:\n`;
      src += `    if ${response}.headers["Content-type"] == "application/json": file.write(json.dump(${response}.json(), file, ensure_ascii=False, indent=4))\n`;
      src += `    else: file.write(${response}.content)`;
    }
    if (showResponse) {
      if (preetyPrint) {
        src += `\n\nif ${response}.headers["Content-type"] == "application/json": print(json.dumps(${response}.json(), indent=4))\n`;
      } else {
        src += `\n\nif ${response}.headers["Content-type"] == "application/json": print(${response}.json())\n`;
      }
      src += `else: print(${response}.text)`;
    }

    setCode(src);

    if (authOption === "HTTPBasicAuth") {
      setPackages([
        "import requests",
        "import json",
        "import os",
        "from dotenv import load_dotenv",
        "from requests.auth import HTTPBasicAuth",
      ]);
    }
    else if (authOption === "HTTPDigestAuth") {
      setPackages([
        "import requests",
        "import json",
        "import os",
        "from dotenv import load_dotenv",
        "from requests.auth import HTTPDigestAuth",
      ]);
    }
    else {
      setPackages([
        "import requests",
        "import json",
        "import os",
        "from dotenv import load_dotenv"
      ]);
    }

    if (setMetadata) {
      setMetadata({
        response, url, timeout, authOption, username, password, token, showResponse, preetyPrint, passParams, params, saveToFile, filePath, fileName,
        docsUrl: DOCS_URL,
      });
    }
  }, [response, url, timeout, authOption, username, password, token, showResponse, preetyPrint, passParams, params, saveToFile, filePath, fileName]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["response"] !== undefined) setResponse(metadata["response"]);
      if (metadata["url"] !== undefined) setUrl(metadata["url"]);
      if (metadata["timeout"] !== undefined) setTimeout(metadata["timeout"]);
      if (metadata["authOption"] !== undefined) setAuthOption(metadata["authOption"]);
      if (metadata["username"] !== undefined) setUsername(metadata["username"]);
      if (metadata["password"] !== undefined) setPassword(metadata["password"]);
      if (metadata["token"] !== undefined) setToken(metadata["token"]);
      if (metadata["showResponse"] !== undefined) setShowResponse(metadata["showResponse"]);
      if (metadata["preetyPrint"] !== undefined) setPreetyPrint(metadata["preetyPrint"]);
      if (metadata["passParams"] !== undefined) setPassParams(metadata["passParams"]);
      if (metadata["params"] !== undefined) setParams(metadata["params"]);
      if (metadata["saveToFile"] !== undefined) setSaveToFile(metadata["saveToFile"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
    }
  }, [metadata]);

  const paramsElements = params.map((param, index) => {
    function setKey(value: SetStateAction<string>): void {
      setParams(
        params.map((p, j) =>
          index !== j ? p : { ...param, key: value.toString() }
        )
      );
    }
    function setValue(value: SetStateAction<string>): void {
      setParams(
        params.map((p, j) =>
          index !== j ? p : { ...param, value: value.toString() }
        )
      );
    }

    return (
      <div
        className="poc-grid md:poc-grid-cols-11 md:poc-gap-2"
        key={`request-params-${index}`}
      >
        <div className="poc-col-span-5">
          <Variable
            label="Key"
            name={param.key}
            setName={setKey}
          />
        </div>
        <div className="poc-col-span-5">
          <Variable
            label="Value"
            name={param.value}
            setName={setValue}
          />
        </div>
        <div className="">
          <div className=" poc-inline">
            <button
              data-tooltip-id="requests-tooltip"
              data-tooltip-content="Add request params"
              type="button"
              className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-mt-7"
              onClick={() =>
                setParams([
                  ...params,
                  {
                    key: "",
                    value: "",
                  },
                ])
              }
            >
              {<PlusIcon className="poc-inline poc-pb-1" />}
            </button>
          </div>

          {params.length > 1 && (
            <div className=" poc-inline poc-mx-1">
              <button
                data-tooltip-id="series-tooltip"
                data-tooltip-content="Delete params"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1  poc-text-center  disabled:poc-text-gray-300"
                onClick={() => {
                  let aa = [...params];
                  aa.splice(index, 1);
                  setParams(aa);
                }}
                disabled={params.length === 1}
              >
                {<TrashIcon className="poc-inline poc-pb-1" />}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div>
      <Title
        Icon={GetIcon}
        label={"Get request"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Name response variable"}
        name={response}
        setName={setResponse}
      />
      <Variable
        label={"Set request url"}
        name={url}
        setName={setUrl}
      />
      <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
        <Toggle
          label={"Pass parameters"}
          value={passParams}
          setValue={setPassParams}
          paddingTop={false}
        />
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Toggle
            label={"Show response"}
            value={showResponse}
            setValue={setShowResponse}
            paddingTop={false}
          />
          {showResponse && (
            < Toggle
              label={"Pretty print json"}
              value={preetyPrint}
              setValue={setPreetyPrint}
              paddingTop={false}
            />
          )}
        </div>
      </div>
      {paramsElements}
      <div className="poc-grid md:poc-grid-cols-5 md:poc-gap-2 poc-h-16">
        <div className="poc-col-span-1">
          <Toggle
            label={"Save response to file"}
            value={saveToFile}
            setValue={setSaveToFile}
          />
        </div>
        <div className="poc-col-span-2">
          {saveToFile && (
            <SelectPath
              label={"Select folder"}
              setPath={setFilePath}
              defaultPath={filePath}
              selectFolder={true}
            />
          )}
        </div>
        <div className="poc-col-span-2">
          {saveToFile && (
            <Variable
              label={"File name"}
              name={fileName}
              setName={setFileName}
              tooltip="Dont't forget to add extension to the file name"
            />
          )}
        </div>
      </div>

      <Numeric
        label={"Set the timeout"}
        name={timeout}
        setName={setTimeout}
        tooltip={"Ammout after which request will timeout in seconds"}
      />
      <Select
        label={"Select auth option"}
        option={authOption}
        options={authOptions}
        setOption={setAuthOption}
      />
      {(authOption === "HTTPBasicAuth" || authOption === "HTTPDigestAuth") && (
        <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
          <Variable
            label="Name of the secret containing username"
            name={username}
            setName={setUsername}
          />
          <Variable
            label="Name of the secret containing password"
            name={password}
            setName={setPassword}
          />
        </div>
      )}
      {(authOption === "Bearer" || authOption === "ApiKey") && (
        <Variable
          label="Name of the secret containing token or API KEY"
          name={token}
          setName={setToken}
        />
      )}
    </div>
  );
};

export const GetRequestRecipe: IRecipe = {
  name: "Get request",
  longName: "Get request",
  parentName: "http-requests",
  // len: 159
  description: "Send HTTP Get request to the URL of your choosing, pass parameters, set timeout, authenticate with many different auth options, pretty print the JSON response.",
  shortDescription: "Send HTTP Get request to the URL of your choosing, pass parameters, set timeout, authenticate with many different auth options, pretty print the JSON response.",
  codeExplanation: `
1. If chosen set request parameters to the payload variable.
2. If chosen set authentication secrets in request headers.
3. Send requeset.
4. If the response status code is from 4XX or 5XX range, raise the exception.
5. Show the response body, if chosen pretty print the JSON response.
`,
  ui: GetRequest,
  Icon: GetIcon,
  requiredPackages: [
    { importName: "requests", installationName: "requests", version: ">=2.32.3" },
    { importName: "dotenv", installationName: "python-dotenv", version: ">=1.0.1" },
  ],
  docsUrl: DOCS_URL,
  tags: ["http", "requests", "get"],
  defaultVariables: [],
};
export default GetRequestRecipe;
