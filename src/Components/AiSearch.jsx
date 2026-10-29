import React from "react";
import AiMovieSuggestions from "./AiMovieSuggestions";
import AiSearchBar from "./AiSearchBar";

const AiSearch = () => {
  return (
    <div className="relative min-h-screen bg-zinc-950 text-white overflow-hidden pb-20">
      {/* Cinematic subtle background overlay */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        <img
          className="w-full h-full object-cover opacity-25 filter blur-xs"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/cc73e7c7-7860-4ef4-8fc8-1baf24569d2f/web/IN-en-20260126-TRIFECTA-perspective_90d714e8-acc9-4253-ab46-ca6b349c1989_large.jpg"
          alt="Netflix Background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-950/90 to-zinc-950" />
      </div>

      <div className="relative z-10">
        <AiSearchBar />
        <AiMovieSuggestions />
      </div>
    </div>
  );
};

export default AiSearch;

