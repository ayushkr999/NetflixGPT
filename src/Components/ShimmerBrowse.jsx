import React from "react";

const ShimmerBrowse = () => {
  return (
    <div className="w-full min-h-screen bg-black text-white space-y-12 animate-pulse pb-20">
      {/* Hero Shimmer */}
      <div className="relative w-full h-[65vh] bg-zinc-900/60 flex items-center px-6 md:px-12 pt-20">
        <div className="max-w-2xl w-full space-y-4">
          <div className="h-6 w-36 bg-zinc-800 rounded-full"></div>
          <div className="h-12 w-3/4 bg-zinc-800 rounded-lg"></div>
          <div className="h-4 w-1/2 bg-zinc-800/80 rounded"></div>
          <div className="space-y-2 pt-2">
            <div className="h-4 w-full bg-zinc-800/60 rounded"></div>
            <div className="h-4 w-5/6 bg-zinc-800/60 rounded"></div>
            <div className="h-4 w-2/3 bg-zinc-800/60 rounded"></div>
          </div>
          <div className="flex gap-4 pt-4">
            <div className="h-12 w-32 bg-zinc-800 rounded-lg"></div>
            <div className="h-12 w-32 bg-zinc-800 rounded-lg"></div>
          </div>
        </div>
      </div>

      {/* Categories Shimmer */}
      {[1, 2, 3].map((row) => (
        <div key={row} className="px-6 md:px-12 space-y-4">
          <div className="h-6 w-48 bg-zinc-800 rounded"></div>
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div
                key={card}
                className="w-36 sm:w-44 md:w-52 aspect-[2/3] bg-zinc-900/80 rounded-lg flex-shrink-0 border border-zinc-800/50"
              ></div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerBrowse;

