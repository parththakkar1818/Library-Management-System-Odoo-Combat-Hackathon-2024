// Counter.jsx

import React from "react";
import CountUp from "react-countup";

const Counter = ({ number, title, className }) => {
    // const hi;
  return (
    <div className={`number text-center ${className}`}>
      <span className="mr-1">+</span>
      <CountUp className="text-4xl font-bold" duration={2} end={number} />

      <span className="block text-sm text-blue-600"> {title}</span>
    </div>
  );
};

export default Counter;