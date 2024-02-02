// MyComponent.tsx
import React, { useState } from "react";
// import "./MyComponent.css"; // Import the CSS file

import "../style.css";

export interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  const [t, setT] = useState("zero");
  return (
    <>
      {t}
      <button
        type="button"
        onClick={() => setT("jeden")}
      >
        button {text}
      </button>
    </>
  );
};

export default MyComponent;
