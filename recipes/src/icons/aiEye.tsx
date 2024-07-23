import React from "react";
import { IconProps } from "./props";

export const aiEyeIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <svg
  xmlns="http://www.w3.org/2000/svg"
  className={className}
  width={size}
  height={size}
  viewBox={`0 0 ${size} ${size}`}
  strokeWidth="2"
  stroke={color}
  fill="none"
  strokeLinecap="round"
  strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
    <path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
  </svg>
);
