import React from "react";
import { IconProps } from "./props";

export const PutIcon: React.FC<IconProps> = ({
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
    <path d="M3 12h2a2 2 0 1 0 0 -4h-2v8" />
    <path d="M17 8h4" />
    <path d="M19 8v8" />
    <path d="M10 8v6a2 2 0 1 0 4 0v-6" />
  </svg>
);
