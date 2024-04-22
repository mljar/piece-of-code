import React from "react";
import { IconProps } from "./props";

export const TableColumnIcon: React.FC<IconProps> = ({
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
    <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
    <path d="M10 10h11" />
    <path d="M10 3v18" />
    <path d="M9 3l-6 6" />
    <path d="M10 7l-7 7" />
    <path d="M10 12l-7 7" />
    <path d="M10 17l-4 4" />
  </svg>
);
