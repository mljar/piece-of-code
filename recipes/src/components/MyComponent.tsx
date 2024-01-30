// MyComponent.tsx
import React from "react";
// import "./MyComponent.css"; // Import the CSS file

import "../style.css";

export interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  return (
    <>
      <div className="my-component">Here {text} is</div>
      <button
        type="button"
        className="text-white bg-green-700 hover:bg-blue-100  font-medium rounded-lg
         text-sm px-2 py-1.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
      >
        Default
      </button>

      <p className="text-3xl font-bold underline">Hello world!</p>
    </>
  );
};

export default MyComponent;
