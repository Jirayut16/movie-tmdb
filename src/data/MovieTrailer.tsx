import axios from "axios";
import { useEffect, useState } from "react";
import { VideoTrailerType } from "../types/movieType";

const useFetchMovieTrailer = ({ id }: { id: string | undefined }) => {
  const urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  const [videoTrailer, setVideoTrailer] = useState<VideoTrailerType[]>([]);

  //fetch movie trailer
  const fetchVideoTrailer = async () => {
    try {
      const response = await axios.get(urlTrailer, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TOKEN}`,
        },
      });
      const trailerKey = response?.data?.results?.find(
        (video: VideoTrailerType) => video.type === "Trailer"
      );
      setVideoTrailer(trailerKey.key);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVideoTrailer();
  }, [id]);

  return videoTrailer;
};
export default useFetchMovieTrailer;
