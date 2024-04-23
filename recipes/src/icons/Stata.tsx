import React from "react";
import { IconProps } from "./props";

export const StataIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 512 512`}
    strokeWidth="2"
    stroke={color}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M149.275 512H0V362.725h149.275V512zm0-330.638H0v149.276h149.275V181.362zm181.363 181.363H181.362V512h149.276V362.725zm0-181.363H181.362v149.276h149.276V181.362zm0-181.362H181.362v149.275h149.276V0zM512 0H362.725v149.275H512V0zm0 181.362H362.725v149.276H512V181.362z"
      clipRule="evenodd"
    />
  </svg>
);
