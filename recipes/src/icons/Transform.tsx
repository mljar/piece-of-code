import React from "react";
import { IconProps } from "./props";

export const TransformIcon: React.FC<IconProps> = ({
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
    <path d="M3 6a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    <path d="M21 11v-3a2 2 0 0 0 -2 -2h-6l3 3m0 -6l-3 3" />
    <path d="M3 13v3a2 2 0 0 0 2 2h6l-3 -3m0 6l3 -3" />
    <path d="M15 18a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
  </svg>
);
