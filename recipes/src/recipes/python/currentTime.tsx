import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Toggle } from "../../components/Toggle";
import { CalendarClockIcon } from "../../icons/CalendarClock";

const DOCS_URL = "python-get-current-time";

export const CurrentTime: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [now, setNow] = useState("now");
  const [showDate, setShowDate] = useState(true);

  useEffect(() => {
    let src = `# get current time\n`;
    src += `${now} = datetime.datetime.now()\n`;
    if (showDate) {
      src += `# display current time\n`;
      src += `print(${now})`;
    } else {
      src += `# display current time without date\n`;
      src += `print(${now}.time())`;
    }
    setCode(src);
    setPackages(["import datetime"]);
    if (setMetadata) {
      setMetadata({
        now,
        showDate,
        docsUrl: DOCS_URL,
      });
    }
  }, [now, showDate]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["now"] !== undefined) setNow(metadata["now"]);
      if (metadata["showDate"] !== undefined) setShowDate(metadata["showDate"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={CalendarClockIcon}
        label={"Get current time"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Current time variable"}
        name={now}
        setName={setNow}
        tooltip={"Current time will be stored in this variable"}
      />
      <Toggle label={"Display date"} value={showDate} setValue={setShowDate} />
    </div>
  );
};

export const CurrentTimeRecipe: IRecipe = {
  name: "Get current time",
  longName: "Get current time in Python",
  parentName: "Python",
  description: "Get and display current time in Python",
  shortDescription: "Get and display current time in Python",
  codeExplanation: `
1. Get current time using datetime package.
2. Display current time with print method.`,
  ui: CurrentTime,
  Icon: CalendarClockIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default CurrentTimeRecipe;
