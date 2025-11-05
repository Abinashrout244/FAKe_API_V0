import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-row flex-wrap gap-5 justify-center items-center pt-30">
      {Array(20)
        .fill("")
        .map((index) => {
          return (
            <div
              key={index}
              className="w-64 h-[373px] bg-gray-500/50 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden border border-gray-100"
            ></div>
          );
        })}
    </div>
  );
};

export default Shimmer;
