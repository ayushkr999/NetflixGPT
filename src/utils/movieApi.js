import { FALLBACK_POSTER, getEnv } from "./constant.js";

const OMDB_BASE_URL = "https://www.omdbapi.com/";
const BACKUP_KEYS = ["trilogy", "720c3666"];

// In-memory cache to avoid duplicate network calls
const cache = new Map();

/**
 * Normalizes movie object from OMDb so components have consistent properties
 */
export const normalizeMovie = (omdbMovie) => {
  if (!omdbMovie || omdbMovie.Response === "False") return null;

  const poster =
    omdbMovie.Poster && omdbMovie.Poster !== "N/A"
      ? omdbMovie.Poster
      : FALLBACK_POSTER;

  return {
    ...omdbMovie,
    id: omdbMovie.imdbID,
    imdbID: omdbMovie.imdbID,
    title: omdbMovie.Title,
    year: omdbMovie.Year,
    poster: poster,
    genre: omdbMovie.Genre || "N/A",
    rating: omdbMovie.imdbRating || "N/A",
    plot: omdbMovie.Plot || "No plot synopsis available.",
    director: omdbMovie.Director || "N/A",
    actors: omdbMovie.Actors || "N/A",
    runtime: omdbMovie.Runtime || "N/A",
    language: omdbMovie.Language || "N/A",
  };
};

/**
 * Fetch helper with automatic key failover if a key reaches its daily limit
 */
const fetchWithFailover = async (paramString) => {
  const primaryKey = getEnv("REACT_APP_OMDB_API_KEY", "trilogy");
  const candidateKeys = Array.from(
    new Set([primaryKey, ...BACKUP_KEYS].filter(Boolean))
  );

  let lastError = null;
  for (const key of candidateKeys) {
    try {
      const res = await fetch(`${OMDB_BASE_URL}?apikey=${key}&${paramString}`);
      if (!res.ok) continue;

      const data = await res.json();
      if (data.Response === "True") {
        return data;
      }

      // If daily limit reached on this key or key is invalid, try next candidate
      if (
        data.Error &&
        (data.Error.toLowerCase().includes("limit") ||
          data.Error.toLowerCase().includes("key"))
      ) {
        lastError = data.Error;
        continue;
      }

      return data;
    } catch (err) {
      lastError = err?.message;
    }
  }

  return { Response: "False", Error: lastError || "Movie not found!" };
};

/**
 * Search movies by keyword
 * @param {string} query
 * @param {number} page
 * @returns {Promise<{results: Array, totalResults: number, error: string|null}>}
 */
export const searchMovies = async (query, page = 1) => {
  const trimmed = query?.trim();
  if (!trimmed) {
    return { results: [], totalResults: 0, error: null };
  }

  const cacheKey = `search_${trimmed.toLowerCase()}_${page}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const data = await fetchWithFailover(
      `s=${encodeURIComponent(trimmed)}&type=movie&page=${page}`
    );

    if (data.Response === "False") {
      const result = {
        results: [],
        totalResults: 0,
        error: data.Error || "No movies found.",
      };
      cache.set(cacheKey, result);
      return result;
    }

    const normalized = (data.Search || [])
      .map((item) => normalizeMovie(item))
      .filter(Boolean);

    const result = {
      results: normalized,
      totalResults: parseInt(data.totalResults, 10) || normalized.length,
      error: null,
    };

    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error("OMDb search error:", error);
    return {
      results: [],
      totalResults: 0,
      error: "Unable to load movies. Please try again.",
    };
  }
};

/**
 * Fetch full movie details by IMDb ID
 * @param {string} imdbId
 * @returns {Promise<Object|null>}
 */
export const getMovieDetails = async (imdbId) => {
  if (!imdbId) return null;

  const cacheKey = `id_${imdbId}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    const data = await fetchWithFailover(
      `i=${encodeURIComponent(imdbId)}&plot=full`
    );

    if (data.Response === "False") return null;

    const normalized = normalizeMovie(data);
    cache.set(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error(`Error fetching movie ${imdbId}:`, error);
    return null;
  }
};

/**
 * Fetch full movie details by Movie Title
 * @param {string} title
 * @returns {Promise<Object|null>}
 */
export const getMovieByTitle = async (title) => {
  if (!title) return null;

  const trimmed = title.trim();
  const cacheKey = `title_${trimmed.toLowerCase()}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  try {
    let data = await fetchWithFailover(
      `t=${encodeURIComponent(trimmed)}&plot=full`
    );

    if (data.Response === "False") {
      // Fallback: try search with first result
      const searchRes = await searchMovies(trimmed, 1);
      if (searchRes.results.length > 0) {
        const fullDetail = await getMovieDetails(searchRes.results[0].imdbID);
        if (fullDetail) {
          cache.set(cacheKey, fullDetail);
          return fullDetail;
        }
      }
      return null;
    }

    const normalized = normalizeMovie(data);
    cache.set(cacheKey, normalized);
    return normalized;
  } catch (error) {
    console.error(`Error fetching movie by title "${title}":`, error);
    return null;
  }
};

/**
 * Fetch a batch of movies by titles
 * @param {string[]} titles
 * @returns {Promise<Array>}
 */
export const getMoviesByTitles = async (titles = []) => {
  if (!Array.isArray(titles) || titles.length === 0) return [];

  const promises = titles.map((title) => getMovieByTitle(title));
  const results = await Promise.all(promises);
  return results.filter(Boolean);
};
