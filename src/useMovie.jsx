import { useState, useEffect } from "react";

const key = "59ec7bc1";

export function useMovies(query) {
  const [movies, setMovies] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(
    function () {
      const controller = new AbortController();
      async function FetchMovie() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${key}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Error occured when the fetching is done");

          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          console.log(data.Search);

          setMovies(data.Search);

          /* altenative;
        fetch(`http://www.omdbapi.com/?apikey=${key}&s=game`).then(res=>res.json()).then(data=>setMovies(data.Search))
   */
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        setIsLoading(false);
        return;
      }
      FetchMovie();
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
