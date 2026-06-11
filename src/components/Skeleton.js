import React from 'react';

function Skeleton() {
  return (
    <div className="bg-white border border-cream-3 overflow-hidden flex flex-col animate-pulse">
      {/* Image */}
      <div className="skeleton-shimmer h-56 w-full" />
      {/* Info */}
      <div className="p-4 flex flex-col gap-3">
        <div className="skeleton-shimmer h-4 w-16 rounded" />
        <div className="space-y-2">
          <div className="skeleton-shimmer h-3.5 w-full rounded" />
          <div className="skeleton-shimmer h-3.5 w-4/5 rounded" />
        </div>
        <div className="flex items-center justify-between mt-2 pt-3 border-t border-cream-3">
          <div className="skeleton-shimmer h-5 w-16 rounded" />
          <div className="skeleton-shimmer h-7 w-7 rounded" />
        </div>
      </div>
    </div>
  );
}

export default Skeleton;
