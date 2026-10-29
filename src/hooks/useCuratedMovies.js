import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CURATED_CATEGORIES } from "../utils/constant";
import { getMoviesByTitles } from "../utils/movieApi";
import {
  setAllCategories,
  setCategoriesError,
  setLoadingCategories,
} from "../utils/movieSlice";

const useCuratedMovies = () => {
  const dispatch = useDispatch();
  const categories = useSelector((store) => store.movies.categories);

  useEffect(() => {
    // If already loaded, do not refetch
    const isAlreadyLoaded = Object.values(categories).some(
      (list) => Array.isArray(list) && list.length > 0
    );
    if (isAlreadyLoaded) return;

    let isMounted = true;

    const fetchCategories = async () => {
      dispatch(setLoadingCategories(true));
      try {
        const loadedCategories = {};

        // Fetch each category in parallel
        const categoryKeys = Object.keys(CURATED_CATEGORIES);
        const promises = categoryKeys.map(async (key) => {
          const config = CURATED_CATEGORIES[key];
          const movies = await getMoviesByTitles(config.movies);
          return { key, movies };
        });

        const results = await Promise.all(promises);

        results.forEach(({ key, movies }) => {
          loadedCategories[key] = movies;
        });

        if (isMounted) {
          dispatch(setAllCategories(loadedCategories));
          dispatch(setLoadingCategories(false));
        }
      } catch (error) {
        console.error("Failed to load movie categories:", error);
        if (isMounted) {
          dispatch(setCategoriesError("Failed to load movies. Please check your connection."));
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, [dispatch, categories]);
};

export default useCuratedMovies;

