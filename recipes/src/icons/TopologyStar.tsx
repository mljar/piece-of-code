import React from "react";
import { IconProps } from "./props";

export const TopologyStarIcon: React.FC<IconProps> = ({
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
    <path d="M8 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M20 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M8 6a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M20 18a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M14 12a2 2 0 1 0 -4 0a2 2 0 0 0 4 0z" />
    <path d="M7.5 7.5l3 3" />
    <path d="M7.5 16.5l3 -3" />
    <path d="M13.5 13.5l3 3" />
    <path d="M16.5 7.5l-3 3" />
  </svg>
);
