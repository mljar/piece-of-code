import React from "react";
import { IconProps } from "./props";

export const TableAddIcon: React.FC<IconProps> = ({
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
        <path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" />
        <path d="M3 10h18" />
        <path d="M10 3v18" />
        <path d="M16 19h6" />
        <path d="M19 16v6" />
    </svg>
);
