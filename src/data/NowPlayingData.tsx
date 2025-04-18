import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { MovieDataType } from "../types/movieType";
import { delay } from "../function/delay";
interface NowPlayingDataType extends MovieDataType {
  genre_ids: number[];
}

//สร้าง context
const NowPlayingMovieData = createContext<NowPlayingDataType[]>([]);
export const useNowPlayingMovieData = () => useContext(NowPlayingMovieData);

export default function NowPlayingData({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiKey = import.meta.env.VITE_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
  const [nowPlaying, setNowPlaying] = useState<NowPlayingDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      await delay();
      const response = await axios.get(url);
      setNowPlaying(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    //ส่ง contextและใส่ value
    <LoadingOverlay isLoading={isLoading}>
      {isLoading ? null : (
        <NowPlayingMovieData.Provider value={nowPlaying}>
          {children}
        </NowPlayingMovieData.Provider>
      )}
    </LoadingOverlay>
  );
}
