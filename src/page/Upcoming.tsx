import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { LoadingOverlay } from "../components/LoadingOverlay";
import { GenreType, MovieDataType } from "../types/movieType";
import { delay } from "../function/delay";
import { dateFormatted } from "../function/dateFormatted";

interface UpcomingDataType extends MovieDataType {
  genre_ids: number[];
}

function Upcoming() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const img = "https://image.tmdb.org/t/p/w500";
  const url = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${apiKey}`;
  const urlGenres = `https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=${apiKey}`;
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);
  const [upcomingData, setUpcomingData] = useState<UpcomingDataType[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchNowPlaying = async () => {
    try {
      const response = await axios.get(url);
      await delay();
      setUpcomingData(response.data.results);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //fetch genres
  const fetchGenres = async () => {
    try {
      const response = await axios.get(urlGenres);
      await delay();
      setGenres(response.data.genres);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNowPlaying();
    fetchGenres();
  }, []);

  if (!upcomingData) {
    return <div>Loading...</div>;
  }

  // search part
  // search part
  const filteredMovies = upcomingData.filter((movie) => {
    const matchesGenre = selectedGenreId
      ? movie.genre_ids.includes(selectedGenreId)
      : true;
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <LoadingOverlay isLoading={isLoading}>
      {isLoading ? null : (
        <div onLoad={() => window.scrollTo(0, 0)}>
          <div>
            <div
              className="h-[25vh] sm:h-[65vh] flex justify-center items-center relative after:contents[''] after:bg-dark after:opacity-50 after:absolute after:top-0 after:h-[25vh] sm:after:h-[65vh] after:w-full"
              style={{
                backgroundImage: `url(/upcoming.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex flex-row justify-center items-center">
                <h1 className="text-4xl sm:text-6xl mx-8 md:mx-2 text-white font-semibold z-[5]">
                  Upcoming..
                </h1>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-4 mb-16">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
              {/* Search part */}
              <div className="w-full lg:w-1/5">
                <div className="bg-white rounded-md shadow-md p-4 mx-6 lg:mx-0">
                  <div className="flex flex-row justify-center items-center relative">
                    <input
                      type="text"
                      onChange={(e) => setSearchValue(e.target.value)}
                      className="p-2 rounded-md shadow-md w-full text-sm"
                      placeholder="Search Movie.."
                    />
                    <IoSearch className="absolute right-2 w-6 h-6 text-gray-600" />
                  </div>
                  <div className=" mt-2 md:mt-4 text-lg md:text-xl xl:text-2xl font-semibold">
                    <p>Search by Genre:</p>
                  </div>
                  <div className="flex flex-row flex-wrap">
                    <button
                      className={
                        selectedGenreId === null
                          ? "px-2 lg:px-4 py-1 lg:py-2 m-1 lg:m-2 text-xs md:text-md bg-second rounded-md shadow-md text-white font-semibold duration-200 transition-all ease-in"
                          : "px-2 lg:px-4 py-1 lg:py-2 m-1 lg:m-2 text-xs md:text-md bg-main rounded-md shadow-md text-white hover:bg-second duration-200 transition-all ease-in"
                      }
                      onClick={() => setSelectedGenreId(null)}
                    >
                      Show all
                    </button>
                    {genres.map((genre) => (
                      <button
                        key={genre.id}
                        className={
                          selectedGenreId === genre.id
                            ? "px-2 lg:px-4 py-1 lg:py-2 m-1 lg:m-2 text-xs md:text-md bg-second rounded-md shadow-md text-white font-semibold duration-200 transition-all ease-in"
                            : "px-2 lg:px-4 py-1 lg:py-2 m-1 lg:m-2 text-xs md:text-md bg-main rounded-md shadow-md text-white hover:bg-second hover:text-white duration-200 transition-all ease-in"
                        }
                        onClick={() => setSelectedGenreId(genre.id)}
                        value={genre.id}
                      >
                        {genre.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              {/* Not found */}
              <div className="w-full lg:w-4/5 flex flex-row gap-4 justify-center">
                {filteredMovies.length > 0 ? null : (
                  <div className="text-main font-semibold text-xl md:text-2xl flex flex-row ms-4 italic justify-center lg:justify-start w-full overflow-hidden">
                    "Movie Not Found"
                    <span className="animate-bounce ms-2 lg:hidden">👀</span>
                  </div>
                )}
                {/* filteredData */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2 gap-y-4 mx-6 lg:mx-0">
                  {" "}
                  {filteredMovies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} key={movie.id}>
                      <div className="flex flex-row justify-center items-center cursor-pointer hover:opacity-80 duration-200 transition-all ease-in">
                        <div className="flex flex-col relative bg-white p-2 w-full rounded-md shadow-md ">
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
                          <div className="absolute top-2 right-2 rounded-md bg-red-600 text-white p-2">
                            {movie.vote_average.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </LoadingOverlay>
  );
}

export default Upcoming;
