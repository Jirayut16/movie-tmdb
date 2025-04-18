import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdArrowOutward } from "react-icons/md";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { MovieDataType as NowPlayingDataType } from "../types/movieType";
import { FreeMode, Pagination } from "swiper/modules";
import { dateFormatted } from "../function/dateFormatted";

function NowPlaying() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const img = "https://image.tmdb.org/t/p/w500";
  const url = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=${apiKey}`;
  const [NowPlayingData, setNowPlayingData] = useState<NowPlayingDataType[]>(
    []
  );

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(url);
      setNowPlayingData(response.data.results.slice(0, 8));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNowPlaying();
  }, []);

  return (
    <div className="container mx-auto mt-8 sm:mt-16 mb-16">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start md:space-x-4 space-x-0">
        <div>
          <h1 className="text-4xl sm:text-2xl mx-4 md:mx-2 text-second font-semibold">
            Now Playing
          </h1>
        </div>
      </div>
      {/* swiper1 */}
      <div className="mx-8 mt-4" id="swiperBG">
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
          }}
          freeMode={true}
          pagination={{ clickable: true }}
          modules={[FreeMode, Pagination]}
        >
          {NowPlayingData.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Link to={`/movie/${movie.id}`} key={movie.id}>
                <div className="flex flex-row justify-center items-center cursor-pointer active:cursor-grabbing">
                  <div className="flex flex-col relative">
                    <img
                      src={img + movie.poster_path}
                      alt={movie.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                    <div className="text-main font-semibold text-sm md:text-base mt-2">
                      {movie.title}
                    </div>
                    <div className="text-gray-400 text-xs md:text-sm">
                      {dateFormatted({ data: movie.release_date })}
                    </div>
                    <div className="absolute top-1 right-2 text-xs rounded-md bg-red-600 text-white p-2">
                      {movie.vote_average.toFixed(2)}
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className=" flex flex-row justify-center items-center">
          <Link to={"/nowplaying"}>
            <div className=" flex flex-row justify-center items-center hover:text-gray-600 duration-100 transition-all ease-in cursor-pointer">
              <p className="text-center text-sm font-semibold ">See more</p>
              <MdArrowOutward className="text-sm ms-2" />
            </div>
          </Link>
        </div>
      </div>
      {/* End swiper1 */}
    </div>
  );
}

export default NowPlaying;
