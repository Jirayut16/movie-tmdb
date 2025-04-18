import useFetchMovieDetail from "../data/MovieDetail";
import useFetchMovieKeyword from "../data/MovieKeyword";

const About = ({ id }: { id: string | undefined }) => {
  const movieKeywordData = useFetchMovieKeyword({ id });
  const movieDetailData = useFetchMovieDetail({ id });
  const movieDetail = movieDetailData.movieDetail;
  const keyword = movieKeywordData;
  const img = "https://image.tmdb.org/t/p/original/";

  return (
    <div className="w-full lg:w-1/4  px-4 py-2 md:py-0 rounded-md">
      <div className="grid grid-cols-2 lg:flex lg:flex-col ">
        {/* 1 */}
        <div>
          <h4 className="font-semibold text-lg">Status:</h4>
          <p className="font-light text-md">{movieDetail.status}</p>
        </div>
        {/* 2 */}
        <div>
          <h4 className="font-semibold text-lg mt-0 lg:mt-6">Languages:</h4>
          {movieDetail?.spoken_languages?.map((language) => (
            <p key={language?.name} className="font-light text-md">
              {language?.name.toUpperCase()},
            </p>
          ))}
        </div>
        {/* 3 */}
        <div>
          <h4 className="font-semibold text-lg mt-6">Budget:</h4>
          <p className="font-light text-md">
            {movieDetail.budget === 0
              ? "Unknown"
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(movieDetail.budget)}
          </p>
        </div>
        {/* 4 */}
        <div>
          <h4 className="font-semibold text-lg mt-6">Revenue</h4>
          <p className="font-light text-md">
            {movieDetail.revenue === 0
              ? "Unknown"
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(movieDetail.revenue)}
          </p>
        </div>
        {/* 5 */}
        <div>
          <h4 className="font-semibold text-lg mt-6">Production company:</h4>
          <p className="font-light text-sm lg:text-md">
            {movieDetail?.production_companies?.[0]?.name ?? ""}
          </p>
          <div className="mt-2 w-36 h-36  sm:w-48 sm:h-48 bg-white rounded-full p-4 flex justify-center items-center">
            <img
              src={`${img}/${
                movieDetail?.production_companies?.[0]?.logo_path ?? ""
              }`}
              alt="logo company"
              className="object-cover"
            />
          </div>
        </div>
        {/* 6 */}
        <div>
          <h4 className="font-semibold text-lg mt-6">Keyword:</h4>
          <div className="flex flex-row flex-wrap gap-2 mt-2">
            {keyword?.map((keyword) => (
              <span
                key={keyword.id}
                className="px-2 lg:px-4 py-1 bg-main text-white rounded-md text-sm lg:text-md cursor-pointer hover:bg-main/80 duration-200 transition-all ease-in"
              >
                {keyword.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;
