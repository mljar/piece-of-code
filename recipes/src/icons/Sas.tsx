import React from "react";
import { IconProps } from "./props";

export const SasIcon: React.FC<IconProps> = ({
  size = 24,
  color = "currentColor",
  className = "",
}: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width={size}
    height={size}
    viewBox={`0 0 342 512`}
    strokeWidth="2"
    stroke={color}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      fill="currentColor"
      d="M295.193 244.97c105.562 128.085 9.026 239.158-77.363 260.736c-99.606 24.906-189.727-26.897-216.58-106.152c34.639 56.465 135.228 68.71 190.01 34.316c62.182-39.035 82.696-107.621 36.84-163.258c0 0-67.76-81.537-67.775-81.552c-11.901-14.408-7.663-34.102 6.775-45.995c14.346-11.818 33.794-11.88 45.734 2.328l82.359 99.577zm-181.875-3.57c-45.841-55.637-25.31-124.237 36.854-163.29c54.777-34.392 155.373-22.146 190.01 34.346C313.316 33.172 223.22-18.601 123.603 6.289C37.207 27.87-59.334 138.895 46.243 267.025l80.747 98.014c11.94 14.208 31.374 14.117 45.736 2.284c14.423-11.878 18.675-31.557 6.775-46.01c-.032-.016-66.182-79.913-66.182-79.913z"
    />
  </svg>
);