import React from 'react';
import './../css/style.css'; // Import the CSS animation

const BarLoader = ({ loading, className="flex items-center justify-center", style, children }) => {


  if (loading) {
    return (
      <div className={className} style={{ width: "100%", height: "100%", ...style }}>
      <div className="bar-loader">
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      </div>
    );
  }

  return children ?? null;
};

export default BarLoader;
