import React from "react";
import { IconProps } from "./props";

export const SquareArrowUPIcon: React.FC<IconProps> = ({
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
    <path d="M16 12l-4 -4l-4 4" />
    <path d="M12 16v-8" />
    <path d="M3 3m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z" />
  </svg>
);
