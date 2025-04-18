import axios from "axios";
import { useEffect, useState } from "react";
import { MovieCastType, MovieCrewType } from "../types/movieType";

const useFetchMovieCrew = ({ id }: { id: string | undefined }) => {
  const urlCrew = `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`;

  const [movieCrew, setMovieCrew] = useState<MovieCrewType>(
    {} as MovieCrewType
  );
  const [cast, setCast] = useState<MovieCastType[]>([]);

  //fetch movieCrew
  const fetchMovieCrew = async () => {
    try {
      const response = await axios.get(urlCrew, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      setMovieCrew(response.data);
      setCast(response.data.cast.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchMovieCrew();
  }, [id]);

  return { movieCrew, cast };
};
export default useFetchMovieCrew;
