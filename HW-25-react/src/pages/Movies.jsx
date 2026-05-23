import { useEffect, useState } from "react";
import {
  useSearchParams,
} from "react-router-dom";

import { searchMovies } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";

export default function Movies() {
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] =
    useSearchParams();

  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      const data = await searchMovies(query);

      setMovies(data);
    };

    fetchMovies();
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();

    const value = e.target.elements.query.value;

    setSearchParams({ query: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" />

        <button type="submit">
          Search
        </button>
      </form>

      <MovieList movies={movies} />
    </div>
  );
}