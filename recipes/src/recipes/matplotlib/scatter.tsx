import React, { useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { XyIcon } from "../../icons/Xy";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { MultiSelect } from "../../components/MultiSelect";
import { Variable } from "../../components/Variable";
import { CategoryIcon } from "../../icons/Category";
import { TreeIcon } from "../../icons/Tree";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { ChartScatterIcon } from "../../icons/ChartScatter";
import { PlayIcon } from "../../icons/Play";
import { CakeOffIcon } from "../../icons/CakeOff";
import { CakeIcon } from "../../icons/Cake";

export const ScatterPlot: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  runCell,
  setKeepOpen,
}) => {
  if (variablesStatus === "loaded" && !variables.length) {
    return (
      <div className="bg-white dark:poc-bg-slate-800 p-4 rounded-md">
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      </div>
    );
  }
  const [advanced, setAdvanced] = useState(false);
  const [model, setModel] = useState("my_tree");
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);

  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [allCols, setAllCols] = useState([] as string[]);
  const [xData, setXData] = useState("");
  const [yData, setYData] = useState("");

  const [title, setTitle] = useState("");
  const [xLabel, setXLabel] = useState("");
  const [yLabel, setYLabel] = useState("");
  const [xGrid, setXGrid] = useState(false);
  const [yGrid, setYGrid] = useState(false);
  const allStyles = [
    "default",
    "Solarize_Light2",
    "_classic_test_patch",
    "_mpl-gallery",
    "_mpl-gallery-nogrid",
    "bmh",
    "classic",
    "dark_background",
    "fast",
    "fivethirtyeight",
    "ggplot",
    "grayscale",
    "seaborn-v0_8",
    "seaborn-v0_8-bright",
    "seaborn-v0_8-colorblind",
    "seaborn-v0_8-dark",
    "seaborn-v0_8-dark-palette",
    "seaborn-v0_8-darkgrid",
    "seaborn-v0_8-deep",
    "seaborn-v0_8-muted",
    "seaborn-v0_8-notebook",
    "seaborn-v0_8-paper",
    "seaborn-v0_8-pastel",
    "seaborn-v0_8-poster",
    "seaborn-v0_8-talk",
    "seaborn-v0_8-ticks",
    "seaborn-v0_8-white",
    "seaborn-v0_8-whitegrid",
    "tableau-colorblind10",
  ];
  const [style, setStyle] = useState("default");
  const [automatic, setAutomatic] = useState(false);

  useEffect(() => {
    if (setKeepOpen) {
      setKeepOpen(true);
    }
  }, []);

  useEffect(() => {
    if (df === "") {
      setAllCols([]);
      setXData("");
      setYData("");
    } else {
      try {
        setXData("");
        setYData("");
        const variable = variables.filter((v) => v.varName === df)[0];
        let cols: string[] = [];
        for (let i = 0; i < variable.varColumns.length; i++) {
          if (variable.varColumnTypes[i] !== "object") {
            cols.push(variable.varColumns[i]);
            if (cols.length === 1) {
              setXData(cols[0]);
              setYData(cols[0]);
            }
            if (cols.length === 2) {
              setYData(cols[1]);
            }
          }
        }
        setAllCols(cols);
      } catch (error) {}
    }
  }, [df]);

  useEffect(() => {
    if (df === "" || xData === "" || yData === "") {
      return;
    }
    let src = `# make a scatter plot\n`;
    let tab = "";
    if (style !== "default") {
      src += `with plt.style.context("${style}"):\n`;
      tab = "    ";
    }
    src += `${tab}plt.scatter(${df}["${xData}"], ${df}["${yData}"])\n`;

    // size

    // color

    // alpha

    // figure size ?

    // more series

    if (title !== "") {
      src += `plt.title("${title}")\n`;
    }
    if (xLabel !== "") {
      src += `plt.xlabel("${xLabel}")\n`;
    }
    if (yLabel !== "") {
      src += `plt.ylabel("${yLabel}")\n`;
    }
    if (xGrid && yGrid) {
      src += `plt.grid()\n`;
    } else if (xGrid) {
      src += `plt.grid(axis="x")\n`;
    } else if (yGrid) {
      src += `plt.grid(axis="y")\n`;
    }
    src += `plt.show()`;
    setCode(src);
    setPackages(["import matplotlib.pyplot as plt"]);
    if (automatic && runCell) {
      runCell();
    }
  }, [df, xData, yData, title, xLabel, yLabel, xGrid, yGrid, style]);

  return (
    <div>
      <Title
        Icon={ChartScatterIcon}
        label={"Scatter Plot"}
        advanced={advanced}
        setAdvanced={setAdvanced}
      />
      {df === "" && (
        <p className="text-base text-gray-800 dark:text-white">
          There are no DataFrames in your notebook. Please create DataFrame by
          reading data from file, url or database.
        </p>
      )}
      {df !== "" && (
        <>
          <Select
            label={"Select DataFrame"}
            option={df}
            options={dataFrames.map((d) => [d, d])}
            setOption={setDf}
          />
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Select
              label={"Select x-axis data"}
              option={xData}
              options={allCols.map((d) => [d, d])}
              setOption={setXData}
            />
            <Select
              label={"Select y-axis data"}
              option={yData}
              options={allCols.map((c) => [c, c])}
              setOption={setYData}
            />
          </div>

          {advanced && (
            <>
              <Select
                label={"Plot style"}
                option={style}
                options={allStyles.map((c) => [c, c])}
                setOption={setStyle}
              />
              <Variable label="Plot title" name={title} setName={setTitle} />
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Variable
                  label="x-axis label"
                  name={xLabel}
                  setName={setXLabel}
                />
                <Variable
                  label="y-axis label"
                  name={yLabel}
                  setName={setYLabel}
                />
              </div>
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Toggle
                  label={"Show x-axis lines grid"}
                  value={xGrid}
                  setValue={setXGrid}
                />
                <Toggle
                  label={"Show y-axis lines grid"}
                  value={yGrid}
                  setValue={setYGrid}
                />
              </div>
            </>
          )}
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Toggle
              label={"Automatically rerun code on chart update"}
              value={automatic}
              setValue={setAutomatic}
              tooltip="Switch it if you would like to automatically rereun cell on code change"
            />
            <div className="poc-pt-4">
              <button
                data-tooltip-id="top-buttons-tooltip"
                data-tooltip-content="Run code"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-3 poc-py-1 poc-text-center poc-mx-1"
                onClick={() => {
                  if (runCell) {
                    runCell();
                  }
                }}
              >
                {<PlayIcon className="poc-inline poc-p-1" />}Run code
              </button>

              <button
                data-tooltip-id="top-buttons-tooltip"
                data-tooltip-content="Add new cell below"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-3 poc-py-1 poc-text-center "
                onClick={() => {
                  if (setKeepOpen) {
                    setKeepOpen(false);
                  }
                }}
              >
                <CakeIcon className="poc-inline poc-pb-1" />
                Chart is ok, hide recipe
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const ScatterPlotRecipe: IRecipe = {
  name: "Scatter plot",
  longName: "Scatter plot in matplotlib",
  parentName: "matplotlib",
  description: `Scatter plot`,
  shortDescription: "Scatter plot",
  codeExplanation: ``,
  ui: ScatterPlot,
  Icon: ChartScatterIcon,
  requiredPackages: [
    {
      importName: "matplotlib",
      installationName: "matplotlib",
      version: ">=3.8.4",
    },
  ],
  docsUrl: "matplotlib-scatter",
  tags: ["matplotlib", "scatter"],
  defaultVariables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2-object", "col3-object", "col4"],
      varColumnTypes: ["int", "object", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
    {
      varName: "y",
      varType: "Series",
      varColumns: ["target"],
      varColumnTypes: ["int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default ScatterPlotRecipe;
