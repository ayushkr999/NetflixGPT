import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import { CURATED_CATEGORIES } from "../utils/constant";

const SecondaryContainer = () => {
  const { categories, loadingCategories, categoriesError } = useSelector(
    (store) => store.movies
  );

  if (categoriesError) {
    return (
      <div className="bg-black px-6 md:px-12 py-12 text-center">
        <div className="bg-red-950/40 border border-red-800/50 rounded-xl p-6 max-w-xl mx-auto">
          <p className="text-red-300 font-medium">{categoriesError}</p>
          <p className="text-gray-400 text-sm mt-2">
            Please verify your network connection and OMDb API key.
          </p>
        </div>
      </div>
    );
  }

  const categoryKeys = Object.keys(CURATED_CATEGORIES);

  return (
    <div className="bg-black relative z-20 pb-24 space-y-6 md:space-y-10 -mt-16 md:-mt-24">
      {categoryKeys.map((key) => {
        const config = CURATED_CATEGORIES[key];
        const movies = categories?.[key];

        if (loadingCategories && (!movies || movies.length === 0)) {
          return (
            <div key={key} className="px-6 md:px-12 space-y-3">
              <div className="h-6 w-48 bg-zinc-800/80 rounded animate-pulse"></div>
              <div className="flex gap-4 overflow-hidden">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-36 sm:w-44 md:w-52 aspect-[2/3] bg-zinc-900 rounded-lg animate-pulse"
                  ></div>
                ))}
              </div>
            </div>
          );
        }

        if (!movies || movies.length === 0) return null;

        return <MovieList key={key} title={config.title} movies={movies} />;
      })}
    </div>
  );
};

export default SecondaryContainer;
