import React from "react";
import { IconProps } from "./props";

export const SuccessIcon: React.FC<IconProps> = ({
  size = 6,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <div className={className}>
    <svg
      className={`w-${size} h-${size} text-green-500 dark:text-green-400 inline pb-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
    </svg>
    <span className="sr-only">Success</span>
  </div>
);
