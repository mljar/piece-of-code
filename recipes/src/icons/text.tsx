import React from "react";
import { IconProps } from "./props";

export const TextIcon: React.FC<IconProps> = ({
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
    <path d="M19 10h-14" />
    <path d="M5 6h14" />
    <path d="M14 14h-9" />
    <path d="M5 18h6" />
    <path d="M18 15v6" />
    <path d="M15 18h6" />
  </svg>
);
