import React from 'react';
import './TimeCard.css';

interface MyComponentProps {
  title: string;
}

const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="MyComponent">
      <h1>{title}</h1>
    </div>
  );
};

export default MyComponent;
