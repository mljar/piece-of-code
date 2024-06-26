import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { CalendarClockIcon } from "../../icons/CalendarClock";
import { HourGlassIcon } from "../../icons/HourGlass";
import { Numeric } from "../../components/Numeric";

const DOCS_URL = "python-time-delay";

export const TimeDelay: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myDelay, setMyDelay] = useState(3);

  useEffect(() => {
    let src = `# start delay\n`;
    src += `time.sleep(${myDelay})`;
    setCode(src);
    setPackages(["import datetime"]);
    if (setMetadata) {
      setMetadata({
        myDelay,
        docsUrl: DOCS_URL,
      });
    }
  }, [myDelay]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myDelay"] !== undefined) setMyDelay(metadata["myDelay"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={HourGlassIcon}
        label={"Add time delay"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Numeric
        label={"Delay time in seconds"}
        name={myDelay}
        setName={setMyDelay}
      />
    </div>
  );
};

export const TimeDelayRecipe: IRecipe = {
  name: "Time delay",
  longName: "Add time delay in Python",
  parentName: "Python",
  description:
    "Add time delay in Python. Your program will sleep for selected number of seconds.",
  shortDescription: "Add time delay in Python",
  codeExplanation: `
1. Sleeps Python 🐍 for selected number of seconds.
`,
  ui: TimeDelay,
  Icon: CalendarClockIcon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default TimeDelayRecipe;
