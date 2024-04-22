import React from "react";
import { IconProps } from "./props";

export const TableRowIcon: React.FC<IconProps> = ({
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
    <path d="M9 3l-6 6" />
    <path d="M14 3l-7 7" />
    <path d="M19 3l-7 7" />
    <path d="M21 6l-4 4" />
    <path d="M3 10h18" />
    <path d="M10 10v11" />
  </svg>
);
