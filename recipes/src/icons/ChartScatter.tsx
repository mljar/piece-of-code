import React from "react";
import { IconProps } from "./props";

export const ChartScatterIcon: React.FC<IconProps> = ({
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
    <path d="M3 3v18h18" />
    <path d="M8 15.015v.015" />
    <path d="M16 16.015v.015" />
    <path d="M8 7.03v.015" />
    <path d="M12 11.03v.015" />
    <path d="M19 11.03v.015" />
  </svg>
);
