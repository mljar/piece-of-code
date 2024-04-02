import React from "react";
import { IconProps } from "./props";

export const InfoIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <svg
    width={size}
    height={size}
    className={`${className} poc-text-blue-500 dark:poc-text-blue-200 poc-inline poc-pb-1`}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    viewBox="0 0 20 20"
  >
    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />{" "}
  </svg>
);
