import React from "react";
import { IconProps } from "./props";

export const XyIcon: React.FC<IconProps> = ({
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
    <path d="M14 9l3 5.063" />
    <path d="M4 9l6 6" />
    <path d="M4 15l6 -6" />
    <path d="M20 9l-4.8 9" />
  </svg>
);
