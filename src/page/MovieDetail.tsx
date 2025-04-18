import { Link, useParams } from "react-router-dom";
import { useRef, MouseEventHandler } from "react";
import CircularLineProgress from "../components/CircularLineProgress";
import { IoTimeOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { MdFavorite } from "react-icons/md";
import { IoMdPlay } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { Breadcrumb } from "flowbite-react";
import { IoTicketSharp } from "react-icons/io5";
import { LoadingOverlay } from "../components/LoadingOverlay";
import CircularLineProgressSmall from "../components/CircularLineProgressSmall";
import useFetchMovieDetail from "../data/MovieDetail";
import useFetchMovieCrew from "../data/MovieCrew";
import useFetchMovieTrailer from "../data/MovieTrailer";
import { convertMinutesToTime } from "../function/convertMiniutes";
import Cast from "../components/Cast";
import Review from "../components/Review";
import About from "../components/About";
import RecommendMovie from "../components/RecommendMovie";

function MovieDetail() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trailerRef = useRef<HTMLIFrameElement>(null);
  const { id } = useParams();
  const img = "https://image.tmdb.org/t/p/original/";
  const movieDetailData = useFetchMovieDetail({ id });
  const movieCrewData = useFetchMovieCrew({ id });
  const movieTrailerData = useFetchMovieTrailer({ id });
  const isLoading = movieDetailData.isLoading;
  const movieDetail = movieDetailData.movieDetail;
  const movieCrew = movieCrewData.movieCrew;
  const videoTrailer = movieTrailerData;
  const movieMinutesResult = convertMinutesToTime(movieDetail.runtime);

  //getcrew
  const getProducer = movieCrew?.crew?.find((crew) => crew.job === "Producer");
  const getDirector = movieCrew?.crew?.find((crew) => crew.job === "Director");
  const getWriter = movieCrew?.crew?.find((crew) => crew.job === "Story");

  function showModal() {
    dialogRef.current?.showModal();
    document.body.style.overflow = "hidden";
    document.body.style.opacity = "0.8";
  }

  function closeTrailer() {
    const currentSrc = trailerRef.current?.src;
    trailerRef.current?.setAttribute("src", currentSrc!);
  }
  function CloseModal() {
    // Close trailer and modal
    dialogRef.current?.close();
    document.body.style.overflow = "visible";
    document.body.style.opacity = "1";
    closeTrailer();
  }
  //close modal when clickOutside
  const clickOutside: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === dialogRef.current) {
      dialogRef.current?.close();
      document.body.style.overflow = "visible";
      document.body.style.opacity = "1";
    }
    closeTrailer();
  };

  return (
    <LoadingOverlay isLoading={isLoading}>
      {isLoading ? null : (
        <div onLoad={() => window.scrollTo(0, 0)}>
          <div className="container mx-auto flex flex-row justify-center m-4">
            <Breadcrumb aria-label="Default breadcrumb example">
              <Breadcrumb.Item href="#cast">
                <span className="text-sm md:text-xl hover:text-second duration-100 transition-all ease-in">
                  Cast
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#review">
                <span className="text-sm md:text-xl  hover:text-second duration-100 transition-all ease-in">
                  Review
                </span>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="#recommend">
                <span className="text-sm md:text-xl  hover:text-second duration-100 transition-all ease-in">
                  Recommend
                </span>
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div
            className="h-[85vh] relative after:contents[''] after:bg-dark after:opacity-70 after:absolute after:top-0 after:h-[85vh] after:w-full"
            style={{
              backgroundImage: `url(${img + movieDetail.backdrop_path})`,
              backgroundSize: "cover",
              backgroundPosition: "top ",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="container mx-auto flex flex-row h-full w-full text-white">
              <div className="z-[5] flex flex-col lg:flex-row lg:justify-between h-full w-full gap-4">
                {/* poster */}
                <div className="w-full lg:w-1/3 flex flex-col sm:flex-row lg:flex-col lg:justify-start lg:items-center p-4 gap-4 lg:gap-0 lg:p-6">
                  <div className="flex flx-row gap-2 ">
                    <div className="w-1/3 md:h-96 sm:w-full lg:w-full lg:h-full">
                      <img
                        src={img + movieDetail.poster_path}
                        alt="poster of movie"
                        className="w-full h-full object-cover rounded-md"
                        loading="lazy"
                      />
                    </div>

                    {/* detail for mobile */}
                    <div className="sm:hidden w-2/3 flex flex-col">
                      <div>
                        <p className="text-base font-bold text-white">
                          {movieDetail.title}
                        </p>
                        <div className="flex flex-row gap-2 items-center font-light text-gray-300 mt-2 text-sm">
                          <p>{movieDetail.release_date} </p>
                          <span>|</span>
                          <p>{movieMinutesResult}</p>
                          <IoTimeOutline className="text-third text-base" />
                        </div>
                        <div className="flex flex-row flex-wrap  gap-1 mt-2">
                          {movieDetail?.genres?.map((genre) => (
                            <span
                              key={genre.id}
                              className="p-2 bg-second text-white rounded-md text-xs"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-row items-center gap-2 mt-2">
                          <CircularLineProgressSmall
                            value={movieDetail.vote_average}
                          ></CircularLineProgressSmall>
                          <div className="text-xs font-semibold">
                            <p>User </p>
                            <p>score</p>
                          </div>
                          <div className=" text-white text-[10px] bg-main rounded-md p-2 shadow-md">
                            <p>From {movieDetail.vote_count} Votes</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* detail for tablet  */}
                  <div className="w-2/3  lg:hidden">
                    <div className="hidden sm:block">
                      <p className=" text-3xl font-bold text-white">
                        {movieDetail.title}
                      </p>
                      <div className="flex flex-row gap-2 items-center font-light text-gray-300 mt-2 text-lg">
                        <p>{movieDetail.release_date} </p>
                        <span>|</span>
                        <p>{movieDetail.status}</p>
                        <span>|</span>
                        <p>{movieMinutesResult}</p>
                        <IoTimeOutline className="text-third text-3xl" />
                      </div>
                      <div className="flex gap-4 mt-2 ">
                        {movieDetail?.genres?.map((genre) => (
                          <span
                            key={genre.id}
                            className="px-4 py-2 bg-second text-white rounded-md text-lg"
                          >
                            {genre.name}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="hidden sm:flex flex-row items-center mt-2 sm:mt-0">
                      <CircularLineProgress
                        value={movieDetail.vote_average}
                      ></CircularLineProgress>
                      <div className="text-lg font-semibold">
                        <p>User </p>
                        <p>score</p>
                      </div>
                      <div className="border-2 border-main text-white bg-main rounded-full px-4 py-2 ms-4 shadow-md">
                        <p>From {movieDetail.vote_count} Votes</p>
                      </div>
                    </div>

                    <div className="flex flex-row gap-1 sm:gap-2 mt-0 sm:mt-1 ms-0  text-white">
                      <div className="rounded-full bg-main h-full w-full p-4 flex items-center justify-center relative group cursor-pointer hover:text-second duration-200 transition-all ease-in">
                        <FaList />
                        <span
                          className="bg-main w-[90px] text-white absolute top-11 p-2 rounded-md hidden 
                  group-hover:flex text-sm"
                        >
                          Add to list
                        </span>
                      </div>
                      <div className="rounded-full bg-main h-full w-full p-4 flex items-center justify-center relative group cursor-pointer hover:text-second duration-200 transition-all ease-in">
                        <MdFavorite />
                        <span
                          className="bg-main w-32 text-white absolute top-11 p-2 rounded-md hidden 
                  group-hover:flex text-sm"
                        >
                          Mark as favorite
                        </span>
                      </div>
                      <div
                        onClick={showModal}
                        className="flex flex-row gap-1 justify-center items-center ms-2 px-4 py-2 bg-second text-white text-sm sm:text-md rounded-md hover:bg-red-500 duration-200 transition-all ease-in"
                      >
                        <IoMdPlay className="text-2xl cursor-pointer" />
                        <button>Watch Trailer</button>
                      </div>
                      <Link
                        to={`/ticket/showtime/${movieDetail.id}/${movieDetail.title}`}
                      >
                        <div className="flex flex-row gap-1 justify-center items-center ms-2 px-4 py-2 bg-third text-dark text-sm sm:text-md font-semibold rounded-md hover:bg-yellow-400 duration-200 transition-all ease-in">
                          <button>Buy ticket</button>
                          <IoTicketSharp className="text-2xl cursor-pointer text-main" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
                {/* details for desktop */}
                <div className=" text-white w-full lg:w-2/3">
                  <div className="hidden lg:block">
                    <p className="text-4xl font-bold mt-4">
                      {movieDetail.title}
                    </p>
                    <div className="flex flex-row gap-2 items-center font-light text-gray-300 mt-2 text-md">
                      <p>{movieDetail.release_date} </p>
                      <span>|</span>
                      <p>{movieDetail.status}</p>
                      <span>|</span>
                      <p>{movieMinutesResult}</p>
                      <IoTimeOutline className="text-third text-3xl" />
                    </div>
                    <div className="flex gap-2 mt-2">
                      {movieDetail?.genres?.map((genre) => (
                        <span
                          key={genre.id}
                          className="px-4 py-1 bg-second text-white rounded-md text-md"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden lg:flex flex-row items-center mt-2 ">
                    <CircularLineProgress
                      value={movieDetail.vote_average}
                    ></CircularLineProgress>
                    <div className="text-2xl font-semibold">
                      <p>User </p>
                      <p>score</p>
                    </div>
                    <div className="border-2 border-main bg-main rounded-full px-4 py-2 ms-4 shadow-md">
                      <p>From {movieDetail.vote_count} Votes</p>
                    </div>
                  </div>
                  {/* Trailer for desktop */}
                  <div className="hidden lg:flex flex-row gap-4 -mt-4 ms-6">
                    <div className="rounded-full bg-main h-10 w-10 flex items-center justify-center relative group cursor-pointer hover:text-second duration-200 transition-all ease-in">
                      <FaList />
                      <span
                        className="bg-main w-[90px] text-white absolute top-11 p-2 rounded-md hidden 
                  group-hover:flex text-sm"
                      >
                        Add to list
                      </span>
                    </div>
                    <div className="rounded-full bg-main h-10 w-10 flex items-center justify-center relative group cursor-pointer hover:text-second duration-200 transition-all ease-in">
                      <MdFavorite />
                      <span
                        className="bg-main w-32 text-white absolute top-11 p-2 rounded-md hidden 
                  group-hover:flex text-sm"
                      >
                        Mark as favorite
                      </span>
                    </div>
                    <div
                      onClick={showModal}
                      className="flex flex-row gap-2 justify-center items-center ms-8 px-4 py-2 bg-second text-white rounded-md hover:bg-red-500 duration-200 transition-all ease-in"
                    >
                      <IoMdPlay className="text-xl cursor-pointer" />
                      <button>Watch Trailer</button>
                    </div>
                    <Link
                      to={`/ticket/showtime/${movieDetail.id}/${movieDetail.title}`}
                    >
                      <div className="flex flex-row gap-2 justify-center items-center ms-8 px-4 py-2 bg-third text-dark font-semibold rounded-md hover:bg-yellow-400 duration-200 transition-all ease-in">
                        <button>Buy ticket</button>
                        <IoTicketSharp className="text-xl cursor-pointer text-main" />
                      </div>
                    </Link>
                  </div>

                  <p className="mt-0 md:mt-2 lg:mt-4 ms-4 md:ms-0 text-normal text-gray-400 text-md italic">
                    {movieDetail.tagline}
                  </p>
                  <h2 className="text-xl sm:text-2xl ms-4 md:ms-0 font-semibold mt-2">
                    Overview
                  </h2>
                  <p className="text-sm sm:text-md xl:text-lg font-light mt-2 mx-4 md:mx-0">
                    {movieDetail.overview}
                  </p>

                  <div className="flex flex-row gap-4 justify-between mt-4 mx-4 md:mx-0">
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-semibold text-sm sm:text-md">
                        {getProducer?.name}
                      </p>
                      <p className="font-light text-sm">{getProducer?.job}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-semibold text-sm sm:text-md">
                        {getDirector?.name}
                      </p>
                      <p className="font-light text-sm">{getDirector?.job}</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                      <p className="font-semibold text-sm sm:text-md">
                        {getWriter?.name}
                      </p>
                      <p className="font-light text-sm">{getWriter?.job}</p>
                    </div>
                  </div>

                  {/* trailer dialog */}
                  <dialog
                    ref={dialogRef}
                    onClick={clickOutside}
                    className="px-4 py-2 rounded-md shadow-md w-full md:w-1/2 h-3/4 mt-36 md:mt-16 bg-dark overflow-hidden "
                  >
                    <div className="flex flex-row justify-between mb-4">
                      <p className="text-xl font-semibold text-white">
                        {movieDetail.title} Trailer
                      </p>
                      <button onClick={CloseModal}>
                        <IoCloseSharp className="text-white text-2xl hover:text-second" />
                      </button>
                    </div>
                    <div className="flex flex-col justify-center items-center bg-slate-100 w-full h-[450px]">
                      <div className="flex flex-row justify-center items-center w-full h-full box-border">
                        <iframe
                          src={`https://www.youtube.com/embed/${videoTrailer}?si=MlTrTNy10il0v9vF`}
                          title="YouTube video player"
                          frameBorder={0}
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          ref={trailerRef}
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  </dialog>
                  {/* trailer dialog */}
                </div>
              </div>
            </div>
          </div>

          {/* Cast */}
          <Cast id={id} />

          {/* Social */}
          <div
            className="container mx-auto flex flex-col lg:flex-row justify-between mt-8 gap-4"
            id="review"
          >
            <Review id={id} />
            <About id={id} />
          </div>

          {/* Recommend */}
          <RecommendMovie id={id} />
        </div>
      )}
    </LoadingOverlay>
  );
}

export default MovieDetail;
