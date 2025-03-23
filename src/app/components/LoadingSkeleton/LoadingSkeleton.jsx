import React from "react";

const Skeleton = ({classNames}) => {
  return (
    <div className={`animate-pulse p-4 max-w-sm w-full rounded-2xl ${classNames}`}>
      <div className="bg-gray-300 h-40 w-full rounded-lg"></div>
      <div className="mt-4">
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
      </div>
    </div>
  );
};

export default Skeleton;