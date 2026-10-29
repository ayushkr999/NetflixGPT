import React from "react";
import { useSelector } from "react-redux";
import Header from "./Header";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import AiSearch from "./AiSearch";
import MovieDetails from "./MovieDetails";
import useCuratedMovies from "../hooks/useCuratedMovies";

const Browse = () => {
  const showAiSearch = useSelector((store) => store.ai?.showAiSearch);

  // Hook fetches real curated movie collections from OMDb API
  useCuratedMovies();

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <Header />

      {showAiSearch ? (
        <AiSearch />
      ) : (
        <main>
          <MainContainer />
          <SecondaryContainer />
        </main>
      )}

      {/* Global Movie Details Modal */}
      <MovieDetails />
    </div>
  );
};

export default Browse;
