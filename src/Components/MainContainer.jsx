import React from "react";
import { useSelector } from "react-redux";
import HeroMovie from "./HeroMovie";

const MainContainer = () => {
  const featuredMovie = useSelector((store) => store.movies.featuredMovie);
  const popularMovies = useSelector((store) => store.movies.categories?.popular);

  const displayMovie = featuredMovie || (popularMovies && popularMovies[0]);

  if (!displayMovie) {
    return (
      <div className="w-full h-[60vh] md:h-[75vh] bg-zinc-950 flex items-center justify-center animate-pulse">
        <div className="text-center space-y-4 px-4">
          <div className="h-8 w-64 bg-zinc-800 rounded mx-auto"></div>
          <div className="h-4 w-96 bg-zinc-900 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return <HeroMovie movie={displayMovie} />;
};

export default MainContainer;
