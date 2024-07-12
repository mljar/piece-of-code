import React from "react";
import { IconProps } from "./props";

export const InsertIcon: React.FC<IconProps> = ({
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
        <path d="M20 6v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1z" />
        <path d="M12 15l0 4" />
        <path d="M14 17l-4 0" />
    </svg>
);
