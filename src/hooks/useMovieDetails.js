import { useState, useEffect } from "react";
import { getMovieDetails } from "../utils/movieApi";

export const useMovieDetails = (imdbId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!imdbId) {
      setMovie(null);
      return;
    }

    let isMounted = true;
    setLoading(true);
    setError(null);

    getMovieDetails(imdbId)
      .then((data) => {
        if (isMounted) {
          if (data) {
            setMovie(data);
          } else {
            setError("Movie details could not be found.");
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error("Error in useMovieDetails:", err);
          setError("Failed to fetch movie details.");
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [imdbId]);

  return { movie, loading, error };
};

export default useMovieDetails;

