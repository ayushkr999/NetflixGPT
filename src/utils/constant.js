export const logo = "https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2026-01-09/consent/87b6a5c0-0104-4e96-a291-092c11350111/019ae4b5-d8fb-7693-90ba-7a61d24a8837/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const FALLBACK_POSTER = "/assets/No_Image.webp";

export const SUPPORTED_LANGUAGES = [
  { identifier: "en", name: "English" },
  { identifier: "hindi", name: "हिन्दी (Hindi)" },
  { identifier: "spanish", name: "Español (Spanish)" },
];

export const getEnv = (key, fallback = "") => {
  if (typeof process !== "undefined" && process.env && process.env[key]) {
    return process.env[key];
  }
  if (typeof import.meta !== "undefined" && import.meta.env) {
    if (import.meta.env[key]) return import.meta.env[key];
    const viteKey = `VITE_${key.replace(/^REACT_APP_/, "")}`;
    if (import.meta.env[viteKey]) return import.meta.env[viteKey];
  }
  return fallback;
};

// Curated movie collections for Netflix-style rows (OMDb relies on real titles/IMDb IDs)
export const CURATED_CATEGORIES = {
  popular: {
    title: "🔥 Popular Picks",
    movies: [
      "Inception",
      "Interstellar",
      "The Dark Knight",
      "Avatar",
      "Gladiator",
      "Titanic",
      "Oppenheimer",
      "Dune",
    ],
  },
  topRated: {
    title: "⭐ Top Rated",
    movies: [
      "The Shawshank Redemption",
      "The Godfather",
      "Pulp Fiction",
      "Schindler's List",
      "12 Angry Men",
      "Fight Club",
      "Forrest Gump",
      "The Lord of the Rings: The Return of the King",
    ],
  },
  action: {
    title: "🎬 Action & Thrills",
    movies: [
      "Mad Max: Fury Road",
      "John Wick",
      "The Matrix",
      "Top Gun: Maverick",
      "Casino Royale",
      "Mission: Impossible - Fallout",
      "Spider-Man: Across the Spider-Verse",
      "Die Hard",
    ],
  },
  comedy: {
    title: "😂 Comedy Gold",
    movies: [
      "The Grand Budapest Hotel",
      "Superbad",
      "The Hangover",
      "Knives Out",
      "Groundhog Day",
      "Deadpool",
      "Step Brothers",
      "Palm Springs",
    ],
  },
  romance: {
    title: "❤️ Romance & Drama",
    movies: [
      "La La Land",
      "The Notebook",
      "Pride & Prejudice",
      "About Time",
      "Before Sunrise",
      "Eternal Sunshine of the Spotless Mind",
      "Casablanca",
      "Past Lives",
    ],
  },
  horror: {
    title: "👻 Horror & Suspense",
    movies: [
      "The Conjuring",
      "A Quiet Place",
      "Hereditary",
      "Get Out",
      "The Shining",
      "It",
      "Insidious",
      "Sinister",
    ],
  },
  sciFi: {
    title: "🚀 Sci-Fi & Mind Bending",
    movies: [
      "Interstellar",
      "Blade Runner 2049",
      "Arrival",
      "Edge of Tomorrow",
      "Ex Machina",
      "Tenet",
      "The Martian",
      "Inception",
    ],
  },
};
