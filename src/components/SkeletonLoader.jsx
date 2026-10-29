import React from 'react';

/**
 * Skeleton loading component for data tables
 */
export const SkeletonLoader = ({ rows = 5, columns = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, rowIdx) => (
        <div key={rowIdx} className="flex gap-4">
          {Array.from({ length: columns }).map((_, colIdx) => (
            <div
              key={colIdx}
              className="h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg flex-1 animate-pulse"
            />
          ))}
        </div>
      ))}
    </div>
  );
};

/**
 * Skeleton card component
 */
export const SkeletonCard = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-6 shadow-md animate-pulse"
        >
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
