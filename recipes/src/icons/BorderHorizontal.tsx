import React from "react";
import { IconProps } from "./props";

export const BorderHorizontalIcon: React.FC<IconProps> = ({
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
    <path d="M4 12l16 0" />
    <path d="M4 4l0 .01" />
    <path d="M8 4l0 .01" />
    <path d="M12 4l0 .01" />
    <path d="M16 4l0 .01" />
    <path d="M20 4l0 .01" />
    <path d="M4 8l0 .01" />
    <path d="M12 8l0 .01" />
    <path d="M20 8l0 .01" />
    <path d="M4 16l0 .01" />
    <path d="M12 16l0 .01" />
    <path d="M20 16l0 .01" />
    <path d="M4 20l0 .01" />
    <path d="M8 20l0 .01" />
    <path d="M12 20l0 .01" />
    <path d="M16 20l0 .01" />
    <path d="M20 20l0 .01" />
  </svg>
);
