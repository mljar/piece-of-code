import React, { SetStateAction, useEffect, useState } from "react";

import { IRecipe, IRecipeProps } from "../base";
import { Title } from "../../components/Title";
import { Select } from "../../components/Select";
import { Variable } from "../../components/Variable";
import { Numeric } from "../../components/Numeric";
import { Toggle } from "../../components/Toggle";
import { PlayIcon } from "../../icons/Play";
import { CakeIcon } from "../../icons/Cake";
import { PlusIcon } from "../../icons/Plus";
import { TrashIcon } from "../../icons/Trash";
import { Tooltip } from "react-tooltip";
import { ChartBar2Icon } from "../../icons/ChartBar2";
import { SelectPath } from "../../components/SelectPath";

const DOCS_URL = "matplotlib-bar";

type SeriesType = {
  x: string;
  y: string;
  width: number;
  color: string;
  alpha: number;
  label: string;
  align: string;
};

export const BarPlot: React.FC<IRecipeProps> = ({
  setCode,
  setPackages,
  variablesStatus,
  variables,
  runCell,
  setKeepOpen,
  metadata,
  setMetadata,
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
  const dataFrames = variables
    .filter((v) => v.varType === "DataFrame")
    .map((v) => v.varName);

  const [df, setDf] = useState(dataFrames.length ? dataFrames[0] : "");
  const [allCols, setAllCols] = useState([] as string[]);
  const allAlignments = ["center", "edge"]
  const allColors = [
    "tab:blue",
    "tab:orange",
    "tab:green",
    "tab:red",
    "tab:purple",
    "tab:brown",
    "tab:pink",
    "tab:gray",
    "tab:olive",
    "tab:cyan",
  ];
  const [objectCols, setObjectCols] = useState([] as string[]);
  const [colorBy, setColorBy] = useState([] as string[]);
  const [series, setSeries] = useState([] as SeriesType[]);

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
  const legendPositions = [
    "best",
    "upper right",
    "upper left",
    "lower left",
    "lower right",
    "right",
    "center left",
    "center right",
    "lower center",
    "upper center",
    "center",
  ];
  const [legendPosition, setLegendPosition] = useState(legendPositions[0]);
  const [automatic, setAutomatic] = useState(false);
  const [saveToFile, setSaveToFile] = useState(false);
  const [fileName, setFileName] = useState("my_file.png")
  const [filePath, setFilePath] = useState("")

  useEffect(() => {
    if (setKeepOpen) {
      setKeepOpen(true);
    }
  }, []);

  useEffect(() => {
    if (df === "") {
      setAllCols([]);
      setSeries([]);
    } else {
      try {
        setSeries([]);
        const variable = variables.filter((v) => v.varName === df)[0];
        let cols: string[] = [];
        let objCols: string[] = [];
        for (let i = 0; i < variable.varColumns.length; i++) {
          if (variable.varColumnTypes[i] !== "object") {
            cols.push(variable.varColumns[i]);
          } else {
            objCols.push(variable.varColumns[i]);
          }
        }
        setAllCols(cols);
        setObjectCols(objCols);
        setColorBy(objCols.map((col) => `Color by ${col}`));

        if (cols.length > 0) {
          setSeries([
            {
              x: cols[0],
              y: cols[cols.length > 1 ? 1 : 0],
              width: 0.8,
              color: allColors[0],
              alpha: 1,
              label: "",
              align: allAlignments[0]
            },
          ]);
        }
      } catch (error) { }
    }
  }, [df]);

  useEffect(() => {
    if (df === "" || series.length === 0) {
      return;
    }
    let src = ``;

    let showLegend = false;

    let doColorBy = false;
    let colorByCol = "";
    series.map((serie) => {
      if (colorBy.includes(serie.color)) {
        doColorBy = true;
        colorByCol = serie.color.slice(9);
      }
    });
    if (doColorBy) {
      showLegend = true;
      src += `# create mapping between values and colors\n`;
      src += `labels = ${df}["${colorByCol}"].unique().tolist()\n`;
      src += `colors = list(mcolors.TABLEAU_COLORS.keys())\n`;
      src += `color_map = {l: colors[i%len(colors)] for i,l in enumerate(labels)}\n`;
    }

    let tab = "";
    if (style !== "default") {
      src += `# apply style and create bar plot\n`;
      src += `with plt.style.context("${style}"):\n`;
      tab = "    ";
    } else {
      src += `# create bar plot\n`;
    }

    series.map((serie, index) => {
      if (index > 0 && doColorBy) {
        return;
      }
      src += `${tab}plt.bar(${df}["${serie.x}"], ${df}["${serie.y}"]`;

      if (doColorBy) {
        src += `, color=${df}["${colorByCol}"].map(color_map)`;
      } else {
        src += `, color="${serie.color}"`;
      }
      if (serie.width !== 0.8) {
        src += `, width=${serie.width}`;
      }
      if (serie.alpha !== 1) {
        src += `, alpha=${serie.alpha}`;
      }
      if (serie.label !== "") {
        src += `, label="${serie.label}"`;
        showLegend = true;
      }
      if (serie.align !== "center") {
        src += `, align="${serie.align}"`;
      }
      src += `)\n`;
    });

    if (xGrid || yGrid) {
      src += `# add grid\n`;
    }
    if (xGrid && yGrid) {
      src += `plt.grid()\n`;
    } else if (xGrid) {
      src += `plt.grid(axis="x")\n`;
    } else if (yGrid) {
      src += `plt.grid(axis="y")\n`;
    }

    if (title !== "") {
      src += `plt.title("${title}")\n`;
    }
    if (xLabel !== "") {
      src += `plt.xlabel("${xLabel}")\n`;
    }
    if (yLabel !== "") {
      src += `plt.ylabel("${yLabel}")\n`;
    }
    if (showLegend) {
      src += `# add legend box\n`;
      if (doColorBy) {
        src += `handles = [Line2D([0], [0], marker='o', color='w', markerfacecolor=v, label=k, markersize=8) for k, v in color_map.items()]\n`;
        src += `plt.legend(handles=handles, loc="${legendPosition}")\n`;
      } else {
        src += `plt.legend(loc="${legendPosition}")\n`;
      }
    }
    if (saveToFile) {
      src += `# save plot to file\n`;
      src += `fname = os.path.join(r"${filePath}", "${fileName}")\n`;
      src += `plt.savefig(fname, bbox_inches = "tight")\n`;
    }
    src += `# display plot\n`;
    src += `plt.show()`;
    setCode(src);
    if (doColorBy) {
      setPackages([
        "import matplotlib.pyplot as plt",
        "from matplotlib.lines import Line2D",
        "import matplotlib.colors as mcolors",
      ]);
    } else {
      setPackages(["import matplotlib.pyplot as plt", "import os"]);
    }
    if (automatic && runCell) {
      runCell();
    }
    if (setMetadata) {
      setMetadata({
        df,
        series,
        title,
        xLabel,
        yLabel,
        xGrid,
        yGrid,
        style,
        legendPosition,
        automatic,
        advanced,
        variables,
        docsUrl: DOCS_URL,
      });
    }
  }, [df, series, title, xLabel, yLabel, xGrid, yGrid, style, legendPosition, advanced, automatic, saveToFile, filePath, fileName]);

  useEffect(() => {
    if (metadata) {
      if ("mljar" in metadata) metadata = metadata.mljar;
      if (metadata["df"] !== undefined) setDf(metadata["df"]);
      if (metadata["series"] !== undefined) setSeries(metadata["series"]);
      if (metadata["title"] !== undefined) setTitle(metadata["title"]);
      if (metadata["xLabel"] !== undefined) setXLabel(metadata["xLabel"]);
      if (metadata["yLabel"] !== undefined) setYLabel(metadata["yLabel"]);
      if (metadata["xGrid"] !== undefined) setXGrid(metadata["xGrid"]);
      if (metadata["yGrid"] !== undefined) setYGrid(metadata["yGrid"]);
      if (metadata["style"] !== undefined) setStyle(metadata["style"]);
      if (metadata["legendPosition"] !== undefined) setLegendPosition(metadata["legendPosition"]);
      if (metadata["advanced"] !== undefined) setAdvanced(metadata["advanced"]);
      if (metadata["automatic"] !== undefined) setAutomatic(metadata["automatic"]);
      if (metadata["saveToFile"] !== undefined) setSaveToFile(metadata["saveToFile"]);
      if (metadata["filePath"] !== undefined) setFilePath(metadata["filePath"]);
      if (metadata["fileName"] !== undefined) setFileName(metadata["fileName"]);
    }
  }, [metadata]);

  const seriesElements = series.map((serie, index) => {
    function setXData(value: SetStateAction<string>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, x: value.toString() }
        )
      );
    }
    function setYData(value: SetStateAction<string>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, y: value.toString() }
        )
      );
    }

    function setColor(value: SetStateAction<string>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, color: value.toString() }
        )
      );
    }
    function setAlignment(value: SetStateAction<string>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, align: value.toString() }
        )
      );
    }
    function setLabel(value: SetStateAction<string>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, label: value.toString() }
        )
      );
    }
    function setAlpha(value: SetStateAction<number>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, alpha: value.valueOf() as number }
        )
      );
    }
    function setWidth(value: SetStateAction<number>): void {
      setSeries(
        series.map((s, j) =>
          index !== j ? s : { ...serie, width: value.valueOf() as number }
        )
      );
    }

    return (
      <div
        className="poc-grid md:poc-grid-cols-11 md:poc-gap-2"
        key={`plot-serie-${index}`}
      >
        <div className="poc-col-span-2">
          <Select
            label={"Select x-axis data"}
            option={serie.x}
            options={allCols.map((d) => [d, d])}
            setOption={setXData}
          />
        </div>
        <div className="poc-col-span-2">
          <Select
            label={"Select y-axis data"}
            option={serie.y}
            options={allCols.map((c) => [c, c])}
            setOption={setYData}
          />
        </div>
        <div className="poc-col-span-2">
          <Variable
            label="Label"
            name={serie.label}
            setName={setLabel}
            tooltip="Label is used in legend, please left blank to not include legend"
          />
        </div>
        <div className="poc-col-span-1">
          <Select
            label={"Select color"}
            option={serie.color}
            options={
              index === 0
                ? [...allColors, ...colorBy].map((c) => [c, c])
                : allColors.map((c) => [c, c])
            }
            setOption={setColor}
          />
        </div><div className="poc-col-span-1">
          <Select
            label={"Select alignment"}
            option={serie.align}
            options={[...allAlignments].map((c) => [c, c])}
            setOption={setAlignment}
          />
        </div>
        <div className="poc-col-span-1">
          <Numeric
            label="Set alpha"
            name={serie.alpha}
            setName={setAlpha}
            minValue={0.01}
            maxValue={1}
            step={0.01}
          />
        </div><div className="poc-col-span-1">
          <Numeric
            label="Set width"
            name={serie.width}
            setName={setWidth}
            minValue={0.01}
            maxValue={1}
            step={0.01}
          />
        </div>
        <div className="">
          <div className=" poc-inline">
            <button
              data-tooltip-id="matplotlib-tooltip"
              data-tooltip-content="Add data series"
              type="button"
              className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1 poc-text-center poc-mt-7"
              onClick={() =>
                setSeries([
                  ...series,
                  {
                    x: allCols[0],
                    y: allCols[allCols.length > 1 ? 1 : 0],
                    width: 0.8,
                    color: allColors[0],
                    alpha: 1,
                    label: "",
                    align: allAlignments[0]
                  },
                ])
              }
            >
              {<PlusIcon className="poc-inline poc-pb-1" />}
            </button>
          </div>

          {series.length > 1 && (
            <div className=" poc-inline poc-mx-1">
              <button
                data-tooltip-id="matplotlib-tooltip"
                data-tooltip-content="Delete series"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-pink-400 poc-via-pink-500 poc-to-pink-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-pink-300 dark:focus:poc-ring-pink-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-1  poc-text-center  disabled:poc-text-gray-300"
                onClick={() => {
                  let aa = [...series];
                  aa.splice(index, 1);
                  setSeries(aa);
                }}
                disabled={series.length === 1}
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
        Icon={ChartBar2Icon}
        label={"Bar Plot"}
        advanced={advanced}
        setAdvanced={setAdvanced}
        docsUrl={metadata === undefined ? "" : `/docs/${DOCS_URL}/`}
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
          <Tooltip
            id="matplotlib-tooltip"
            place="top"
            positionStrategy="fixed"
            offset={5}
            style={{ zIndex: "10001" }}
          />
          {seriesElements}

          <div className="poc-grid md:poc-grid-cols-5 md:poc-gap-2 poc-h-16">
            <div className="poc-col-span-1">
              <Toggle
                label={"Save to file"}
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
                  tooltip="Dont't forget to add extension, supported formats: eps, jpeg, jpg, pdf, pgf, png, ps, raw, rgba, svg, svgz, tif, tiff, webp"
                />
              )}
            </div>
          </div>

          {advanced && (
            <>
              <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
                <Select
                  label={"Plot style"}
                  option={style}
                  options={allStyles.map((c) => [c, c])}
                  setOption={setStyle}
                />
                <Select
                  label={"Legend position"}
                  option={legendPosition}
                  options={legendPositions.map((c) => [c, c])}
                  setOption={setLegendPosition}
                  tooltip="Legend is only displayed if labels are filled with values"
                />
              </div>
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
                  paddingTop={false}
                />
                <Toggle
                  label={"Show y-axis lines grid"}
                  value={yGrid}
                  setValue={setYGrid}
                  paddingTop={false}
                />
              </div>
            </>
          )}
          <div className="poc-grid md:poc-grid-cols-2 md:poc-gap-2">
            <Toggle
              label={"Automatically run code on chart update"}
              value={automatic}
              setValue={setAutomatic}
              tooltip="Switch it if you would like to automatically run cell on code change"
              paddingTop={false}
            />
            <div className="poc-pt-4">
              <button
                data-tooltip-id="top-buttons-tooltip"
                data-tooltip-content="Add new cell below"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-cyan-400 poc-via-cyan-500 poc-to-cyan-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-cyan-300 dark:focus:poc-ring-cyan-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-3 poc-py-1 poc-text-center  poc-float-right"
                onClick={() => {
                  if (setKeepOpen) {
                    setKeepOpen(false);
                  }
                }}
              >
                <CakeIcon className="poc-inline poc-pb-1" />
                Chart is ok, hide recipe
              </button>
              <button
                data-tooltip-id="top-buttons-tooltip"
                data-tooltip-content="Run code"
                type="button"
                className="poc-text-white poc-bg-gradient-to-r poc-from-green-400 poc-via-green-500 poc-to-green-600 hover:poc-bg-gradient-to-br focus:poc-ring-4 focus:poc-outline-none focus:poc-ring-green-300 dark:focus:poc-ring-green-800 poc-font-medium poc-rounded-lg poc-text-sm poc-px-3 poc-py-1 poc-text-center poc-mx-1 poc-float-right"
                onClick={() => {
                  if (runCell) {
                    runCell();
                  }
                }}
              >
                {<PlayIcon className="poc-inline poc-p-1" />}Run code
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export const BarPlotRecipe: IRecipe = {
  name: "Bar plot",
  longName: "Bar plot in matplotlib",
  parentName: "matplotlib",
  description: `Create a bar plot in matplotlib based on your data. You can plot several series of bars in one figure. For each series, you can select color, width, alignment and transparency (alpha). Please provide label for bars to create legend. You can also produce bar plot with colors assigned to selected categorical column.

  Please check **Advanced** options to change plot style, set title, axis labels and control legend position.
  `,
  shortDescription:
    "Create and customize bar plot for your data. You can set color, width, alignment and transparency for line plot. There can be several plots in one figure",
  codeExplanation: `
1. Please select DataFrame.
2. Please select columns for x and y axis. You can set color and transparency for each bar. There can be several bars in the one plot.
3. You can customize each bars color, transparency(alpha), width and alignment.
4. Please check **Advanced** options. 
5. You can set title and axis labels there.
6. If you would like to control position of legend in your plot, you can do this in **Advanced** options. The default value is **best**, which means that matplotlib will search for position that do not overlay chart points.
7. You can apply different style for bar figure.
`,
  ui: BarPlot,
  Icon: ChartBar2Icon,
  requiredPackages: [
    {
      importName: "matplotlib",
      installationName: "matplotlib",
      version: ">=3.8.4",
    },
  ],
  docsUrl: DOCS_URL,
  tags: ["matplotlib", "bar"],
  defaultVariables: [
    {
      varName: "X",
      varType: "DataFrame",
      varColumns: ["col1", "col2", "col3-object", "col4"],
      varColumnTypes: ["int", "int", "object", "int"],
      varSize: "",
      varShape: "",
      varContent: "",
      isMatrix: true,
      isWidget: false,
    },
  ],
};

export default BarPlotRecipe;

