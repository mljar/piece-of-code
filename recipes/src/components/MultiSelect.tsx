import React, { useState } from "react";

export default function MultiSelectDropdown({
  selection,
  allOptions,
  setSelection,
  prompt = "Please select",
}: {
  selection: string[];
  allOptions: string[];
  setSelection: any;
  prompt: string;
}) {
  const [showOptions, setShowOptions] = useState(false);

  const handleChange = (opt: string) => {
    let newOption = [...selection];
    if (selection.includes(opt)) {
      const index = newOption.indexOf(opt, 0);
      if (index > -1) {
        newOption.splice(index, 1);
      }
    } else {
      newOption.push(opt);
    }
    setSelection(newOption);
  };

  const selectedElements = selection.map((s) => {
    return (
      <span
        key={s}
        className="poc-inline-flex poc-items-center poc-px-2 poc-py-1 poc-my-0.5 poc-me-1 poc-text-sm
        poc-font-medium poc-text-blue-800 poc-bg-blue-100 poc-rounded dark:poc-bg-slate-900 dark:poc-text-slate-50"
      >
        {s}
      </span>
    );
  });

  const optionsElements = allOptions.map((opt, i) => {
    const isSelected = selection.includes(opt);
    return (
      <div
        key={`${opt}-${i}`}
        onClick={() => handleChange(opt)}
        className="poc-inline"
      >
        {isSelected && (
          <span
            className={`poc-cursor-pointer poc-inline-flex poc-items-center poc-px-2 poc-py-1 poc-my-0.5 poc-me-1 poc-text-sm
            poc-font-medium poc-text-blue-600 poc-bg-blue-100 poc-rounded dark:poc-bg-slate-900
             dark:poc-text-slate-50 `}
          >
            {opt}
          </span>
        )}
        {!isSelected && (
          <span
            className={`poc-cursor-pointer poc-inline-flex poc-items-center poc-px-2 poc-py-1 poc-my-0.5 poc-me-1 poc-text-sm
            poc-font-medium poc-text-blue-800 poc-rounded dark:poc-text-slate-50 
            poc-border poc-border-blue-100 dark:poc-border-slate-800`}
          >
            {opt}
          </span>
        )}
      </div>
    );
  });

  let borderClass = "poc-border-gray-300 dark:poc-border-gray-600";
  if (showOptions) {
    borderClass = "poc-border-blue-500 dark:poc-border-blue-400";
  }
  return (
    <div>
      <div
        className={
          `poc-cursor-pointer poc-px-2 poc-py-1
        poc-bg-gray-50   poc-text-gray-900 
        poc-rounded-md 
         poc-block poc-w-full poc-p-1.5 
        dark:poc-bg-gray-700  dark:poc-placeholder-gray-400 
        dark:poc-text-white 
        poc-outline-0
        poc-border
        ` + borderClass
        }
        onClick={() => {
          setShowOptions(!showOptions);
        }}
      >
        {showOptions && (
          <span className="poc-text-gray-500 dark:poc-text-slate-300 poc-pr-2">
            ▲
          </span>
        )}
        {!showOptions && (
          <span className="poc-text-gray-500 dark:poc-text-slate-300 poc-pr-2">
            ▼
          </span>
        )}

        {selectedElements.length === 0 && (
          <span className="poc-text-gray-500 dark:poc-text-slate-300">
            {prompt}
          </span>
        )}

        {selectedElements}
      </div>

      {showOptions && (
        <div
          className="poc-relative poc-border poc-max-h-60 poc-overflow-y-auto poc-rounded-md"
          style={{ marginTop: "1px" }}
        >
          <button
            type="button"
            className="poc-text-white poc-bg-blue-600 hover:poc-bg-blue-700 focus:poc-ring focus:poc-ring-blue-300
            poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-0.5 dark:poc-bg-blue-600 dark:poc-hover:bg-blue-700 focus:poc-outline-none dark:focus:poc-ring-blue-800 poc-mx-1 poc-my-1 poc-mt-2"
            onClick={() => {
              setShowOptions(!showOptions);
            }}
          >
            OK
          </button>

          <button
            type="button"
            className="poc-text-white poc-bg-blue-600 hover:poc-bg-blue-700 focus:poc-ring focus:poc-ring-blue-300
            poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-0.5 dark:poc-bg-blue-600 dark:poc-hover:bg-blue-700 focus:poc-outline-none dark:focus:poc-ring-blue-800"
            onClick={() => {
              setSelection(allOptions);
              setShowOptions(false);
            }}
          >
            Select All
          </button>

          <button
            type="button"
            className="poc-text-white poc-bg-blue-600 hover:poc-bg-blue-700 focus:poc-ring focus:poc-ring-blue-300
            poc-font-medium poc-rounded-lg poc-text-sm poc-px-2 poc-py-0.5 dark:poc-bg-blue-600 dark:poc-hover:bg-blue-700 focus:poc-outline-none dark:focus:poc-ring-blue-800 poc-mx-1"
            onClick={() => setSelection([])}
          >
            Clear All
          </button>

          <div className="poc-w-full dark:poc-text-slate-50 poc-p-1">
            {optionsElements}
          </div>
        </div>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  selection: string[]; // selected value
  allOptions: string[];
  setSelection: (opts: string[]) => void;
}

export const MultiSelect: React.FC<SelectProps> = ({
  label,
  selection,
  allOptions,
  setSelection,
}: SelectProps) => {
  return (
    <div>
      <div className="poc-mt-2">
        <label className="poc-block poc-text-sm poc-font-medium poc-text-gray-900 dark:poc-text-white">
          {label}
        </label>

        <MultiSelectDropdown
          selection={selection}
          allOptions={allOptions}
          setSelection={setSelection}
          prompt="Please select"
        />
      </div>
    </div>
  );
};
