import React from "react";

const Skeleton = () => {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="rounded-lg bg-gray-300 h-48 w-full"></div>
    </div>
  );
};

export default Skeleton;
