import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieCredits } from "../services/api";

export default function Cast() {
  const { movieId } = useParams();

  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      const data = await getMovieCredits(movieId);

      setCast(data);
    };

    fetchCast();
  }, [movieId]);

  return (
    <ul>
      {cast.map(actor => (
        <li key={actor.id}>
          {actor.name}
        </li>
      ))}
    </ul>
  );
}