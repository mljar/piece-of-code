// MyComponent.tsx
import React from 'react';
import './MyComponent.css'; // Import the CSS file

export interface MyComponentProps {
  text: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ text }) => {
  return <div className="my-component">{text}</div>;
};

export default MyComponent;
