import React from "react";
import { IconProps } from "./props";

export const ChartScatter3DIcon: React.FC<IconProps> = ({
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
    <path d="M3 20l9 -7" />
    <path d="M12 3v10l9 7" />
    <path d="M17 12v.015" />
    <path d="M17 4.015v.015" />
    <path d="M21 8.015v.015" />
    <path d="M12 19.015v.015" />
    <path d="M3 12.015v.015" />
    <path d="M7 8.015v.015" />
    <path d="M3 4.015v.015" />
  </svg>
);
