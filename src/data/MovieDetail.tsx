import axios from "axios";
import { delay } from "../function/delay";
import { useEffect, useState } from "react";
import { MovieDetailType } from "../types/movieType";

const useFetchMovieDetail = ({ id }: { id: string | undefined }) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  const [movieDetail, setMovieDetail] = useState<MovieDetailType>(
    {} as MovieDetailType
  );

  const [isLoading, setIsLoading] = useState(true);

  //fetch movieDetail
  const fetchMovieDetail = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      await delay();
      setMovieDetail(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovieDetail();
  }, [id]);

  return { movieDetail, isLoading };
};
export default useFetchMovieDetail;
