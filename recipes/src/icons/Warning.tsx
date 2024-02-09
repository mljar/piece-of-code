import React from "react";
import { IconProps } from "./props";

export const WarningIcon: React.FC<IconProps> = ({
  size = 6,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <div className={`${className}`}>
    <svg
      className={`w-${size} h-${size} text-orange-500 dark:text-orange-200 inline pb-1`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill={color}
      viewBox="0 0 20 20"
    >
      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
    </svg>
    <span className="sr-only">Warning</span>
  </div>
);
