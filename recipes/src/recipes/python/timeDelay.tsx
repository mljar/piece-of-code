import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { CalendarClockIcon } from "../../icons/CalendarClock";
import { HourGlassIcon } from "../../icons/HourGlass";
import { Numeric } from "../../components/Numeric";

export const TimeDelay: React.FC<IRecipeProps> = ({ setCode, setPackages }) => {
  const [myDelay, setMyDelay] = useState(3);

  useEffect(() => {
    let src = `# start delay\n`;
    src += `time.sleep(${myDelay})`;
    setCode(src);
    setPackages(["import datetime"]);
  }, [myDelay]);

  return (
    <div>
      <Title Icon={HourGlassIcon} label={"Add time delay"} />
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
  docsUrl: "python-time-delay",
};

export default TimeDelayRecipe;
