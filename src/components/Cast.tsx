import { MdArrowOutward } from "react-icons/md";
import useFetchMovieCrew from "../data/MovieCrew";
import { MovieCastType } from "../types/movieType";

const Cast = ({ id }: { id: string | undefined }) => {
  const movieCrewData = useFetchMovieCrew({ id });

  const cast = movieCrewData.cast;
  return (
    <div className="container mx-auto" id="cast">
      <div>
        <h2 className="text-2xl font-semibold mt-6 mx-4 lg:mx-0">Top Cast</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4 mt-2 p-4 lg:p-0">
          {cast.map((cast: MovieCastType, index: number) => (
            <div
              key={index}
              className=" bg-white rounded-md overflow-hidden shadow-lg w-full"
            >
              <img
                src={
                  cast.profile_path === null
                    ? "https://freesvg.org/img/abstract-user-flat-4.png"
                    : `https://image.tmdb.org/t/p/w500${cast.profile_path}`
                }
                alt=""
                className="w-full h-48 object-cover"
              />

              <div className="p-2">
                <p className="text-sm font-semibold">{cast.name}</p>
                <p className="text-xs font-light">{cast.character}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-row items-center lg:gap-2 mt-2 cursor-pointer">
          <p className="text-lg font-semibold mx-4 lg:mx-0 hover:text-gray-600 duration-100 transition-all ease-in">
            Full Cast & Crew
          </p>
          <MdArrowOutward className="text-xl" />
        </div>
      </div>
    </div>
  );
};
export default Cast;
