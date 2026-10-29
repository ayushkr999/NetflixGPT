import React, { useRef } from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);

  if (!movies || movies.length === 0) return null;

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { scrollLeft, clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth * 0.75 : clientWidth * 0.75;
      scrollContainerRef.current.scrollTo({
        left: scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative group px-4 md:px-12 py-3">
      {/* Row Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl md:text-2xl font-bold text-white tracking-wide">
          {title}
        </h2>
        <span className="text-xs text-gray-500 font-medium">
          {movies.length} titles
        </span>
      </div>

      {/* Left Scroll Button */}
      <button
        onClick={() => scroll("left")}
        aria-label="Scroll left"
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/95 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700 shadow-xl"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4 pt-1 px-1"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {movies.map((movie, index) => {
          const key = movie.imdbID || movie.id || `${movie.title || "m"}-${index}`;
          return <MovieCard key={key} movie={movie} />;
        })}
      </div>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll("right")}
        aria-label="Scroll right"
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-black/70 hover:bg-black/95 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-zinc-700 shadow-xl"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default MovieList;
