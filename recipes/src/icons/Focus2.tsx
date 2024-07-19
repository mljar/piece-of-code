import React from "react";
import { IconProps } from "./props";

export const Focus2Icon: React.FC<IconProps> = ({
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
    <circle cx="12" cy="12" r=".5" fill="currentColor" />
    <path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
    <path d="M12 3l0 2" />
    <path d="M3 12l2 0" />
    <path d="M12 19l0 2" />
    <path d="M19 12l2 0" />
  </svg>
);
