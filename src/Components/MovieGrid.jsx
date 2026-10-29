import React from "react";
import MovieCard from "./MovieCard";

const MovieGrid = ({ movies, title, subtitle }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <div className="w-full px-4 md:px-12 py-6">
      {title && (
        <div className="mb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-wide">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 justify-items-center">
        {movies.map((movie, index) => {
          const key = movie.imdbID || movie.id || `${movie.title || "grid"}-${index}`;
          return (
            <div key={key} className="w-full flex justify-center">
              <MovieCard movie={movie} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MovieGrid;

