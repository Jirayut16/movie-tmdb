import axios from "axios";
import { useEffect, useState } from "react";
import { KeywordType } from "../types/movieType";

const useFetchMovieKeyword = ({ id }: { id: string | undefined }) => {
  const urlKeyword = `https://api.themoviedb.org/3/movie/${id}/keywords`;
  const [keyword, setKeyword] = useState<KeywordType[]>([]);

  //fetch Keyword
  const fetchKeyword = async () => {
    try {
      const response = await axios.get(urlKeyword, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      setKeyword(response.data.keywords);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchKeyword();
  }, [id]);

  return keyword;
};
export default useFetchMovieKeyword;
