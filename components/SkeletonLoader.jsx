import React from 'react';

const SkeletonLoader = ({isOverviewText, isDescription, isTechOrContactInfo}) => {
  if (isOverviewText) {
    return (
      <div className="animate-pulse flex p-4 gap-2 bg-white rounded-2xl shadow-sm w-full">
        <div className="h-32 bg-gray-200 w-[50%] rounded-md max-w-md"></div>
        <div className="w-[50%] flex flex-col gap-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        </div>
      </div>
    );
  }

  if (isDescription) {
    return (
      <div className="w-full animate-pulse flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-2/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
    )
  }
  
  if (isTechOrContactInfo) {
    return (
      <div className="w-full animate-pulse flex flex-col gap-3">
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  return (
    <div className="w-full animate-pulse flex flex-col gap-3">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
  )
};

export default SkeletonLoader;
