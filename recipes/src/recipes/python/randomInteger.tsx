import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Variable } from "../../components/Variable";
import { Dice5Icon } from "../../icons/Dice5";
import { Numeric } from "../../components/Numeric";

const DOCS_URL = "python-generate-random-integer";

export const RandomInteger: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  metadata,
  setMetadata,
}) => {
  const [myVar, setMyVar] = useState("my_random_number");
  const [myLower, setMyLower] = useState(0);
  const [myHigher, setMyHigher] = useState(10);

  useEffect(() => {
    let src = `# generate random integer\n`;
    src += `${myVar} = random.randint(${myLower}, ${myHigher})\n`;
    src += `# display random integer\n`;
    src += `print(f"Generated random number is {${myVar}}")`;
    setCode(src);
    setPackages(["import random"]);
    if (setMetadata) {
      setMetadata({
        myVar,
        myLower,
        myHigher,
        docsUrl: DOCS_URL,
      });
    }
  }, [myVar, myLower, myHigher]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["myVar"]) setMyVar(metadata["myVar"]);
      if (metadata["myLower"]) setMyLower(metadata["myLower"]);
      if (metadata["myHigher"]) setMyHigher(metadata["myHigher"]);
    }
  }, [metadata]);

  return (
    <div>
      <Title
        Icon={Dice5Icon}
        label={"Generate random integer"}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
      />
      <Variable
        label={"Variable with random number"}
        name={myVar}
        setName={setMyVar}
      />

      <Numeric label={"Lower boundary"} name={myLower} setName={setMyLower} />

      <Numeric
        label={"Higher boundary"}
        name={myHigher}
        setName={setMyHigher}
      />
    </div>
  );
};

export const RandomIntegerRecipe: IRecipe = {
  name: "Random integer",
  longName: "Generate random integer in Python",
  parentName: "Python",
  description: `Generate random integer in Python. Returns a random integer N such that lower <= N <= higher.`,
  shortDescription: "Generate random integers in Python",
  codeExplanation: `
1. Generate random integer from selected range.
  `,
  tags: ["random"],
  ui: RandomInteger,
  Icon: Dice5Icon,
  requiredPackages: [],
  docsUrl: DOCS_URL,
};

export default RandomIntegerRecipe;
