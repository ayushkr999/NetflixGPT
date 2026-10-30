import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../utils/movieSlice";
import { FALLBACK_POSTER } from "../utils/constant";

const MovieCard = ({ movie, posterPath }) => {
  const dispatch = useDispatch();

  // Support both full movie object and simple posterPath fallback
  const normalizedMovie = movie || {
    poster: posterPath || FALLBACK_POSTER,
    title: "Movie",
    year: "",
    rating: "N/A",
  };

  const title = normalizedMovie.title || normalizedMovie.Title || "";
  const year = normalizedMovie.year || normalizedMovie.Year || "";
  const rating = normalizedMovie.rating || normalizedMovie.imdbRating || "";
  const genre = normalizedMovie.genre || normalizedMovie.Genre || "";

  const posterSrc =
    normalizedMovie.poster && normalizedMovie.poster !== "N/A"
      ? normalizedMovie.poster
      : normalizedMovie.Poster && normalizedMovie.Poster !== "N/A"
      ? normalizedMovie.Poster
      : FALLBACK_POSTER;

  const handleClick = () => {
    dispatch(setSelectedMovie(normalizedMovie));
  };

  return (
    <div
      onClick={handleClick}
      className="group relative w-36 sm:w-44 md:w-52 flex-shrink-0 cursor-pointer rounded-lg overflow-hidden bg-zinc-900 border border-zinc-800 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/80 hover:border-zinc-700 hover:z-20"
    >
      {/* Poster Image */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-zinc-950">
        <img
          src={posterSrc}
          alt={title || "Movie Poster"}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            if (e.currentTarget.src !== window.location.origin + FALLBACK_POSTER) {
              e.currentTarget.src = FALLBACK_POSTER;
            }
          }}
        />

        {/* Rating badge top-right */}
        {rating && rating !== "N/A" && (
          <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm border border-yellow-500/40 text-yellow-400 text-[11px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow">
            <span>★</span>
            <span>{rating}</span>
          </div>
        )}

        {/* Dark overlay with movie details revealed on hover / bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-left">
          <h4 className="text-white text-sm font-bold line-clamp-1 leading-tight">
            {title}
          </h4>

          <div className="flex items-center gap-2 text-[11px] text-gray-300 mt-1 font-medium">
            {year && <span>{year}</span>}
            {genre && genre !== "N/A" && (
              <span className="text-gray-400 line-clamp-1 border-l border-zinc-700 pl-1.5">
                {genre.split(",")[0]}
              </span>
            )}
          </div>

          <span className="text-[10px] text-red-400 font-semibold mt-1">
            Click for info →
          </span>
        </div>
      </div>

      {/* Persistent title for mobile / standard view */}
      <div className="p-2 sm:p-2.5 bg-zinc-900/90 text-left">
        <h4 className="text-xs sm:text-sm font-semibold text-white truncate">
          {title}
        </h4>
        <div className="flex items-center justify-between text-[11px] text-gray-400 mt-0.5">
          <span>{year || "Movie"}</span>
          {rating && rating !== "N/A" && (
            <span className="text-yellow-400 font-bold">★ {rating}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
