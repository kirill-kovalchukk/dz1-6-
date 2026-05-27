import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovieReviews } from "../services/api";

export default function Reviews() {
  const { movieId } = useParams();

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = await getMovieReviews(movieId);

      setReviews(data);
    };

    fetchReviews();
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews</p>;
  }

  return (
    <ul>
      {reviews.map(review => (
        <li key={review.id}>
          <h3>{review.author}</h3>

          <p>{review.content}</p>
        </li>
      ))}
    </ul>
  );
}

