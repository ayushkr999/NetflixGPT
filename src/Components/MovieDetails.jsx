import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearSelectedMovie } from "../utils/movieSlice";
import { FALLBACK_POSTER } from "../utils/constant";
import { getMovieDetails } from "../utils/movieApi";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const selectedMovie = useSelector((store) => store.movies.selectedMovie);
  const [fullDetails, setFullDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    dispatch(clearSelectedMovie());
  };

  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Fetch full details if plot is short or some fields are missing
  useEffect(() => {
    if (!selectedMovie) {
      setFullDetails(null);
      return;
    }

    // If selectedMovie already has full plot & director, use it
    if (selectedMovie.Director && selectedMovie.Plot && selectedMovie.Plot.length > 100) {
      setFullDetails(selectedMovie);
      return;
    }

    const imdbId = selectedMovie.imdbID || selectedMovie.id;
    if (!imdbId) {
      setFullDetails(selectedMovie);
      return;
    }

    let isMounted = true;
    setLoading(true);

    getMovieDetails(imdbId).then((data) => {
      if (isMounted) {
        setFullDetails(data || selectedMovie);
        setLoading(false);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [selectedMovie]);

  if (!selectedMovie) return null;

  const movie = fullDetails || selectedMovie;

  const title = movie.title || movie.Title || "Movie Details";
  const year = movie.year || movie.Year || "N/A";
  const rating = movie.rating || movie.imdbRating || "N/A";
  const plot = movie.plot || movie.Plot || "No plot synopsis available for this title.";
  const genre = movie.genre || movie.Genre || "N/A";
  const director = movie.director || movie.Director || "N/A";
  const actors = movie.actors || movie.Actors || "N/A";
  const runtime = movie.runtime || movie.Runtime || "N/A";
  const language = movie.language || movie.Language || "N/A";
  const imdbId = movie.imdbID || movie.id;
  const poster =
    movie.poster && movie.poster !== "N/A"
      ? movie.poster
      : movie.Poster && movie.Poster !== "N/A"
      ? movie.Poster
      : FALLBACK_POSTER;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={handleClose}
    >
      <div
        className="relative bg-zinc-900 border border-zinc-700 rounded-2xl max-w-3xl w-full text-white overflow-hidden shadow-2xl my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-30 bg-black/60 hover:bg-black/90 text-gray-300 hover:text-white rounded-full p-2.5 transition duration-200 border border-zinc-700/50"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-400">Loading movie details...</p>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row">
            {/* Poster Section */}
            <div className="w-full md:w-2/5 relative bg-zinc-950 flex items-center justify-center p-4">
              <img
                src={poster}
                alt={title}
                className="w-full max-h-[420px] object-cover rounded-xl shadow-lg"
                onError={(e) => {
                  e.currentTarget.src = FALLBACK_POSTER;
                }}
              />
            </div>

            {/* Content Section */}
            <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col justify-between space-y-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white mb-2">
                  {title}
                </h2>

                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-xs font-semibold">
                  {rating !== "N/A" && (
                    <span className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40 px-2 py-0.5 rounded">
                      ⭐ {rating} / 10
                    </span>
                  )}
                  {year !== "N/A" && (
                    <span className="bg-zinc-800 text-gray-300 px-2 py-0.5 rounded border border-zinc-700">
                      {year}
                    </span>
                  )}
                  {runtime !== "N/A" && (
                    <span className="bg-zinc-800 text-gray-300 px-2 py-0.5 rounded border border-zinc-700">
                      {runtime}
                    </span>
                  )}
                  {language !== "N/A" && (
                    <span className="bg-zinc-800 text-gray-300 px-2 py-0.5 rounded border border-zinc-700">
                      🌐 {language}
                    </span>
                  )}
                </div>

                {/* Genre Tags */}
                {genre !== "N/A" && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {genre.split(",").map((g) => (
                      <span
                        key={g.trim()}
                        className="bg-red-950/60 text-red-300 border border-red-800/40 text-xs px-2.5 py-0.5 rounded-full"
                      >
                        {g.trim()}
                      </span>
                    ))}
                  </div>
                )}

                {/* Plot */}
                <div className="space-y-1 mb-4">
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-bold">
                    Synopsis
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2">
                    {plot}
                  </p>
                </div>

                {/* Metadata List */}
                <div className="space-y-2 text-xs text-gray-300 border-t border-zinc-800 pt-3">
                  {director !== "N/A" && (
                    <p>
                      <strong className="text-gray-400">Director: </strong>
                      {director}
                    </p>
                  )}
                  {actors !== "N/A" && (
                    <p>
                      <strong className="text-gray-400">Cast: </strong>
                      {actors}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-2 flex items-center justify-between border-t border-zinc-800">
                {imdbId && (
                  <a
                    href={`https://www.imdb.com/title/${imdbId}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-yellow-500 hover:text-yellow-400 font-semibold transition"
                  >
                    <span>View on IMDb</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                )}
                <button
                  onClick={handleClose}
                  className="bg-zinc-800 hover:bg-zinc-700 text-white text-xs px-4 py-2 rounded-md font-semibold transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

