import {
  Link,
  Outlet,
  Route,
  Routes,
  useLocation,
  useParams,
} from "react-router-dom";

import { useEffect, useRef, useState } from "react";

import {
  getMovieDetails,
} from "../services/api";

import Cast from "../components/Cast";
import Reviews from "../components/Reviews";

export default function MovieDetails() {
  const { movieId } = useParams();

  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const backLink = useRef(
    location.state?.from || "/"
  );

  useEffect(() => {
    const fetchMovie = async () => {
      const data = await getMovieDetails(movieId);

      setMovie(data);
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Link to={backLink.current}>
        Go back
      </Link>

      <h1>{movie.title}</h1>

      <p>{movie.overview}</p>

      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>

        <li>
          <Link to="reviews">
            Reviews
          </Link>
        </li>
      </ul>

      <Routes>
        <Route path="cast" element={<Cast />} />

        <Route
          path="reviews"
          element={<Reviews />}
        />
      </Routes>

      <Outlet />
    </div>
  );
}