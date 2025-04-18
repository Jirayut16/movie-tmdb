import useFetchMovieRecommend from "../data/MovieRecommend";

const RecommendMovie = ({ id }: { id: string | undefined }) => {
  const movieRecommendData = useFetchMovieRecommend({ id });
  const recommendMovie = movieRecommendData;
  // change url and reload
  const handleNavigate = (movieId: number) => {
    window.location.href = `/movie/${movieId}`;
  };

  return (
    <div className="container mx-auto" id="recommend">
      <h4 className="text-2xl font-semibold mt-8 mx-4 lg:mx-0">
        Recommendations
      </h4>
      <div className="flex flex-row gap-4 mx-4 lg:mx-0 lg:mt-4 mb-16 overflow-hidden overflow-x-scroll">
        {recommendMovie.map((movie, index) => (
          <div
            className="flex flex-col bg-white my-4 rounded-md shadow-lg"
            onClick={() => handleNavigate(movie.id)}
            key={index}
          >
            <div
              key={index}
              className="w-40 lg:w-64 h-full  cursor-pointer hover:scale-105 duration-200 transition-all ease-in"
            >
              <img
                src={
                  movie.poster_path === null
                    ? "https://americandurafilm.com/wp-content/uploads/2022/06/No-Image-Placeholder.png"
                    : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                }
                alt="poster movie"
                className="w-full h-full object-cover rounded-md overflow-hidden"
              />
            </div>
            <div className="p-2 font-semibold text-sm lg:text-md">
              <p>{movie.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecommendMovie;
