import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef, MouseEventHandler } from "react";
import { Breadcrumb, BreadcrumbItem } from "flowbite-react";
import { useNowPlayingMovieData } from "../data/NowPlayingData";
import { IoTimeOutline } from "react-icons/io5";
import { CgDetailsMore } from "react-icons/cg";
import { FaAngleDoubleDown } from "react-icons/fa";
import { useMovieShowtime } from "../data/MovieShowtimeData";
import { PiSpeakerHigh } from "react-icons/pi";
import useFetchMovieDetail from "../data/MovieDetail";
import { convertMinutesToTime } from "../function/convertMiniutes";
import { useBookingStore } from "../store/bookingDetail";

function ShowTime() {
  const { id, title } = useParams();
  const img = "https://image.tmdb.org/t/p/original/";
  const nowPlayingModal = useRef<HTMLDialogElement>(null);
  const nowPlayingData = useNowPlayingMovieData();
  const [selectedDate, setSelectedDate] = useState<number>(0);
  const [selectedShowtime, setSelectedShowtime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();
  const movieDetail = useFetchMovieDetail({ id }).movieDetail;
  const isLoading = useFetchMovieDetail({ id }).isLoading;
  const movieMinutesResult = convertMinutesToTime(movieDetail.runtime);
  const movieShowtime = useMovieShowtime();

  const openModal = async () => {
    nowPlayingModal.current?.showModal();
    document.body.style.overflow = "hidden";
    document.body.style.opacity = "0.8";
  };

  const clickOutside: MouseEventHandler<HTMLDialogElement> = (e) => {
    if (e.target === nowPlayingModal.current) {
      nowPlayingModal.current?.close();
      document.body.style.overflow = "visible";
      document.body.style.opacity = "1";
    }
  };

  const handleChangeUrlAndReload = (id: number, title: string) => {
    window.location.href = `/ticket/showtime/${id}/${title}`;
  };

  //Date picker
  const getThaiDayName = (date: Date) => {
    const thaiDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return thaiDays[date.getDay()]; //index 0-6 start with current date
  };

  const getThaiMonthName = (date: number) => {
    const thaiMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return thaiMonths[date]; //index 0-11 start with current month
  };

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i); //วันที่ปัจจุบัน + เพิ่มไปอีก 7
    const month = new Date().getMonth(); //index ของเดือนปัจจุบัน

    return {
      Day: getThaiDayName(date),
      Month: getThaiMonthName(month),
      date: date.getDate(),
      year: date.getFullYear(),
      fullDate: date,
    };
    //Output => dates [{}, {}, {}, {}, {}, {}, {}] current date + 7
  });

  //disable button
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const isTimePassedForDate = (date: Date, time: string) => {
    const [hours, minutes] = time.split(":");
    const showTime = new Date(date);
    showTime.setHours(parseInt(hours), parseInt(minutes), 0);
    return showTime < currentTime;
  };

  const handleTimeClick = (screen: string, time: string) => {
    const BookingData = {
      time: time,
      date: dates[selectedDate].date,
      day: dates[selectedDate].Day,
      month: dates[selectedDate].Month,
      year: dates[selectedDate].year,
      screen: screen,
      picture: movieDetail.poster_path,
    };
    useBookingStore.getState().setBookingData(BookingData);

    navigate(`/ticket/theater/${id}/${title}`);
  };

  return (
    <div>
      <div className="container mx-auto">
        <div className="mt-4 mx-8 lg:mx-0 flex flex-row justify-center items-center">
          <Breadcrumb>
            <BreadcrumbItem>
              {" "}
              <Link to={"/"} className="text-xs lg:text-lg hover:text-main">
                Home
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {" "}
              <Link
                to={"/nowplaying"}
                className="text-xs lg:text-lg  hover:text-main"
              >
                Select Movie
              </Link>
            </BreadcrumbItem>
            <BreadcrumbItem>
              {" "}
              <button disabled className="text-xs lg:text-lg text-second">
                Select Showtime
              </button>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <button
                disabled
                className="text-xs lg:text-lg cursor-not-allowed"
              >
                {" "}
                Select Seat
              </button>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <button
                disabled
                className="text-xs lg:text-lg cursor-not-allowed"
              >
                {" "}
                Payment
              </button>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>

        {/* Select movie Section */}
        <div>
          <div className="justify-center items-center flex  mt-4 bg-gradient-to-tr from-[#2F80ED] to-[#56CCF2] p-2 rounded-md shadow-md">
            <button
              className="outline outline-1 outline-gray-600 flex flex-row justify-between  items-center text-white font-semibold text-lg px-4 py-2 rounded-md w-2/3 lg:w-1/3 hover:bg-white hover:text-main transition-all ease-in duration-200"
              onClick={openModal}
            >
              {isLoading ? (
                <div className="animate-pulse">Loading</div>
              ) : (
                `${movieDetail.title}`
              )}
              <FaAngleDoubleDown />
            </button>
          </div>
          <dialog ref={nowPlayingModal} onClick={clickOutside}>
            <div className="flex flex-row flex-wrap  justify-center gap-4 p-4 max-w-[90vw] lg:max-w-[60vw] max-h-[60vh]">
              {nowPlayingData.map((movie) => (
                <div
                  key={movie.id}
                  className="bg-[#f4f4f4] rounded-md shadow-md w-32 hover:scale-105 transition-all ease-in cursor-pointer"
                  onClick={() =>
                    handleChangeUrlAndReload(movie.id, movie.title)
                  }
                >
                  <div className="w-full">
                    <img
                      src={`${img}${movie.poster_path}`}
                      alt="poster logo"
                      loading="lazy"
                      className="w-full h-full object-cover rounded-md shadow-md"
                    />
                  </div>
                  <div className="p-2 text-sm">
                    <p className="text-gray-500 font-light text-xs">
                      {movie.release_date}
                    </p>
                    <p>{movie.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </dialog>
        </div>
        {/* End Select movie Section */}

        {/* Detail Section */}
        <div className="flex flex-col lg:flex-row gap-1 lg:gap-4 justify-between bg-[#f4f4f4] rounded-md shadow-md mt-4">
          <div className="flex w-full lg:w-1/3 justify-end items-center">
            <div className="w-full h-full py-4 flex flex-row justify-center lg:justify-end items-center">
              <img
                src={`${img}${movieDetail.poster_path}`}
                alt="poster logo"
                loading="lazy"
                className="w-64 h-full object-cover rounded-md shadow-md"
              />
            </div>
          </div>
          <div className="flex w-full lg:w-2/3 text-dark ">
            <div className="flex flex-col justify-center p-4 gap-4 ">
              <h1 className="text-xl md:text-4xl font-semibold">
                {movieDetail.title}
              </h1>
              <div className="flex flex-row  gap-2 text-gray-500 font-light items-center">
                <p>{movieDetail.release_date}</p>
                <span>|</span>
                <p>{movieMinutesResult}</p>
                <IoTimeOutline></IoTimeOutline>
              </div>
              <div className="flex flex-row flex-wrap space-x-2 items-center">
                <p className="font-semibold text-lg">Genres:</p>
                {movieDetail?.genres?.map((genre) => (
                  <p
                    className="bg-second text-white mt-1 px-2 py-1 rounded-md"
                    key={genre.id}
                  >
                    {genre.name}
                  </p>
                ))}
              </div>
              <div>
                <h4 className="font-semibold text-lg mt-2">Overview:</h4>
                <p className="font-light">{movieDetail.overview}</p>
              </div>
              <div>
                <Link to={`/movie/${movieDetail.id}`} key={movieDetail.id}>
                  <button className="outline text-gray-400 outline-2 px-2 py-1 mt-4 rounded-md hover:bg-second hover:text-white duration-200 transition-all ease-in flex flex-row items-center gap-2">
                    Read More
                    <CgDetailsMore></CgDetailsMore>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* End Detail Section */}

        {/* Date pickup */}
        <div className="flex flex-row overflow-x-scroll xl:overflow-hidden mx-4 lg:mx-0 justify-between items-center mt-4 px-2 lg:px-8 py-2 bg-gradient-to-tr from-[#2F80ED] to-[#56CCF2] rounded-md shadow-md">
          {dates.map((date, index) => (
            <div key={index} onClick={() => setSelectedShowtime(index)}>
              <div
                onClick={() => setSelectedDate(index)}
                className={`   ${
                  selectedDate === index
                    ? "flex flex-col justify-center items-center text-main bg-white px-4 py-2 rounded-md hover:bg-white hover:text-main transition-all ease-in duration-200 cursor-pointer"
                    : "flex flex-col justify-center items-center text-white px-4 py-2 rounded-md hover:bg-white hover:text-main transition-all ease-in duration-200 cursor-pointer"
                }`}
              >
                <p className="font-semibold text-md lg:text-lg">
                  {date.date === new Date().getDate() ? "Today" : date.Day}
                </p>
                <div className=" flex flex-row justify-center items-center font-light text-sm">
                  <p>{date.date}/</p>
                  <p>{date.Month}/</p>
                  <p>{date.year}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* End Date pickup */}

        {/* Showtime Section */}
        <div key={selectedShowtime}>
          {movieShowtime[selectedShowtime].movie.map((movie, index) => (
            <div
              key={index}
              className="bg-white flex flex-col mt-4 my-4 mx-4 lg:mx-0 px-4 py-6 rounded-md shadow-md"
            >
              <div className="font-semibold text-sm lg:text-lg flex flex-row gap-2 lg:gap-4 items-center">
                <div>Screen: {movie.screen}</div>
                <span className="text-gray-400 text-xl font-light">|</span>
                <div className="flex flex-row items-center gap-2">
                  <PiSpeakerHigh></PiSpeakerHigh>
                  <p className="font-light text-sm border border-gray-400 px-2 py-1">
                    Eng
                  </p>
                </div>
              </div>
              <div className=" flex flex-row flex-wrap  gap-4 mt-4 mx-0 lg:mx-8">
                {movie.times.map((time, index) => {
                  const isPassed = isTimePassedForDate(
                    dates[selectedDate].fullDate,
                    time
                  );

                  return (
                    <button
                      key={index}
                      disabled={isPassed}
                      onClick={() => handleTimeClick(movie.screen, time)}
                      className={`px-8 py-2 rounded-md shadow-md font-medium transition-all
                      ${
                        isPassed
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#2F80ED] to-[#56CCF2] text-white cursor-pointer hover:bg-gradient-to-tr hover:from-[#56CCF2] hover:to-[#2F80ED] "
                      }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        {/* EndShowtime Section */}
      </div>
    </div>
  );
}

export default ShowTime;
