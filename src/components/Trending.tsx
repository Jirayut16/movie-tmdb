import axios from "axios";
import { useEffect, useRef, useState } from "react";
// swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import { MovieDataType } from "../types/movieType";
import { FreeMode, Pagination } from "swiper/modules";
import { dateFormatted } from "../function/dateFormatted";

function Trending() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const img = "https://image.tmdb.org/t/p/w500";
  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
  const [trendingData, setTrendingData] = useState<MovieDataType[]>([]);
  const [thisWeekTrendingData, setThisWeekTrendingData] = useState<
    MovieDataType[]
  >([]);
  const trendingToday = useRef<HTMLDivElement>(null);
  const trendingThisWeek = useRef<HTMLDivElement>(null);
  const [selectedTab, setSelectedTab] = useState<"today" | "thisWeek">("today");

  const fetchTrending = async () => {
    try {
      const response = await axios.get(url);
      const trendingSelected = response.data.results.slice(0, 8);
      const trendingThisWeekSelected = response.data.results.slice(8, 16);
      setTrendingData(trendingSelected);
      setThisWeekTrendingData(trendingThisWeekSelected);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchTrending();
  }, []);

  //toggleClass
  function getTrendingToday() {
    trendingThisWeek.current?.classList.add("hidden");
    setSelectedTab("today");
    if (trendingToday.current) {
      trendingToday.current.classList.remove("hidden");
    }
  }
  function getTrendingThisWeek() {
    trendingToday.current?.classList.add("hidden");
    setSelectedTab("thisWeek");
    if (trendingThisWeek.current) {
      trendingThisWeek.current.classList.remove("hidden");
    }
  }

  return (
    <div className="container mx-auto mt-8 sm:mt-16">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:justify-start sm:items-start md:space-x-4 space-x-0">
        <div>
          <h1 className="text-4xl sm:text-2xl mx-4 md:mx-2 text-second font-semibold">
            Trending
          </h1>
        </div>
        <div className="flex flex-row space-x-4 mt-4 sm:mt-0">
          <button
            type="button"
            onClick={getTrendingToday}
            className={
              selectedTab === "today"
                ? "bg-gradient-to-br from-[#fc00ff]  to-[#00dbde] text-white py-2 px-4 rounded-full shadow-lg"
                : "bg-gray-200 text-dark hover:bg-gray-300  py-2 px-4 rounded-full shadow-lg"
            }
          >
            Today
          </button>

          <button
            type="button"
            onClick={getTrendingThisWeek}
            className={
              selectedTab === "thisWeek"
                ? "bg-gradient-to-br from-[#fc00ff]  to-[#00dbde] text-white py-2 px-4 rounded-full shadow-lg"
                : "bg-gray-200 text-dark hover:bg-gray-300  py-2 px-4 rounded-full shadow-lg"
            }
          >
            This Week
          </button>
        </div>
      </div>
      {/* swiper1 */}
      <div className="mx-8 mt-4" id="swiperBG" ref={trendingToday}>
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
          {trendingData.map((movie) => (
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
      </div>
      {/* End swiper1 */}

      {/* swiper2 */}
      <div className="mx-8 mt-4 hidden" id="swiperBG" ref={trendingThisWeek}>
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
          {thisWeekTrendingData.map((movie) => (
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
      </div>
      {/* End swiper2 */}
    </div>
  );
}

export default Trending;
