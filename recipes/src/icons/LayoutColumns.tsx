import React from "react";
import { IconProps } from "./props";

export const LayoutColumnsIcon: React.FC<IconProps> = ({
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
        <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
        <path d="M12 4l0 16" />
    </svg>
);
