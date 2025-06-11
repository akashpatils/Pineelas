import React from "react";

const InfoTooltip = ({ title, description }) => (
  <div className="absolute top-full right-[-1rem] mt-1 flex flex-col items-center z-50">
    <div className="bg-[#424242] w-[350px] text-white text-sm rounded-lg px-5 py-3 shadow-lg max-w-[400px] text-center">
      <div className="font-semibold mb-1 text-start">{title}</div>
      <div className="text-xs text-start mt-2">{description}</div>
    </div>
    {/* <div className="w-2 h-2 bg-[#424242] rotate-45 -mt-[72px] ml-[18.5rem]"></div> */}
  </div>
);

export default InfoTooltip;