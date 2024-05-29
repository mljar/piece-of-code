import React from "react";
import { IconProps } from "./props";

export const RulerMeasureIcon: React.FC<IconProps> = ({
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
    <path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" />
    <path d="M9 12v2" />
    <path d="M6 12v3" />
    <path d="M12 12v3" />
    <path d="M18 12v3" />
    <path d="M15 12v2" />
    <path d="M3 3v4" />
    <path d="M3 5h18" />
    <path d="M21 3v4" />
  </svg>
);
