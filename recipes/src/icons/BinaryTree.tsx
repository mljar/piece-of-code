import React from "react";
import { IconProps } from "./props";

export const BinaryTreeIcon: React.FC<IconProps> = ({
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
    <path d="M6 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M16 4a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M16 20a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M11 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M21 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M5.058 18.306l2.88 -4.606" />
    <path d="M10.061 10.303l2.877 -4.604" />
    <path d="M10.065 13.705l2.876 4.6" />
    <path d="M15.063 5.7l2.881 4.61" />
  </svg>
);
