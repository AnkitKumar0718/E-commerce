import React from 'react';

function Skeleton() {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse h-full flex flex-col">
      {/* Image Skeleton */}
      <div className="bg-gray-200 h-48 w-full"></div>
      
      {/* Info Skeleton */}
      <div className="p-4 flex flex-col flex-grow space-y-3">
        {/* Category */}
        <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        
        {/* Title lines */}
        <div className="space-y-2 flex-grow">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
        
        {/* Price */}
        <div className="h-5 bg-gray-200 rounded w-1/4 mt-auto"></div>
      </div>
    </div>
  );
}

export default Skeleton;
