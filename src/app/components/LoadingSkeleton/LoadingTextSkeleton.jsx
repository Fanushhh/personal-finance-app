import React from "react";

const SkeletonText = ({classNames}) => {
  return (
    <div className={`animate-pulse p-4 max-w-sm w-full rounded-2xl ${classNames}`}>
      
      
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        
      
    </div>
  );
};

export default SkeletonText;