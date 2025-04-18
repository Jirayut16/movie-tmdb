import axios from "axios";
import { useEffect, useState } from "react";
import { MovieDetailType } from "../types/movieType";

const useFetchMovieRecommend = ({ id }: { id: string | undefined }) => {
  const urlRecommend = `https://api.themoviedb.org/3/movie/${id}/recommendations?language=en-US&page=1`;
  const [recommendMovie, setRecommendMovie] = useState<MovieDetailType[]>([]);
  //fetch recommend movie
  const fetchRecommendMovie = async () => {
    try {
      const response = await axios.get(urlRecommend, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      setRecommendMovie(response.data.results.slice(0, 10));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRecommendMovie();
  }, [id]);

  return recommendMovie;
};
export default useFetchMovieRecommend;
