import React from "react";
import { IconProps } from "./props";

export const GetIcon: React.FC<IconProps> = ({
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
    <path d="M7 8h-2a2 2 0 0 0 -2 2v4a2 2 0 0 0 2 2h2v-4h-1" />
    <path d="M14 8h-4v8h4" />
    <path d="M10 12h2.5" />
    <path d="M17 8h4" />
    <path d="M19 8v8" />
  </svg>
);
