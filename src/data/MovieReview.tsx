import axios from "axios";
import { useEffect, useState } from "react";
import { ReviewType } from "../types/movieType";

const useFetchMovieReview = ({ id }: { id: string | undefined }) => {
  const urlReview = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
  const [review, setReview] = useState<ReviewType[]>([]);

  //fetch movie review
  const fetchMovieReview = async () => {
    try {
      const response = await axios.get(urlReview, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      setReview(response.data.results.slice(0, 5));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovieReview();
  }, [id]);

  return review;
};
export default useFetchMovieReview;
