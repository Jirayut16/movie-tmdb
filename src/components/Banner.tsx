import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";

const Banner = () => {
  return (
    <div
      className="relative h-[94vh] bg-no-repeat bg-cover bg-bottom bg-[url('/banner.jpg')] 
      // after:contents[''] after:bg-dark after:opacity-50 after:absolute after:top-0 after:h-[94vh] after:w-full"
    >
      <div className="container mx-auto h-full ">
        <div className="flex flex-col sm:items-center sm:justify-center h-full">
          <div className="text-center z-[5]">
            <div
              id="overlay"
              className="flex flex-col justify-center items-center"
            >
              <div className="flex flex-col mt-32 sm:mt-0 md:flex-row md:gap-4 gap-y-4 p-4 justify-center items-center">
                <h1 className="text-6xl md:text-5xl lg:text-6xl font-bold text-white">
                  Welcome
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  to
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                  EZTicket.com
                </h1>
              </div>
              <div className="flex flex-col md:flex-row md:gap-2 md:mt-4 md:mb-8 gap-y-2 justify-center items-center">
                <p className=" text-xl md:text-2xl lg:text-3xl text-white mt-4 md:mt-0">
                  Find the perfect movie and
                </p>
                <p className=" text-xl md:text-2xl lg:text-3xl text-white mb-8 md:mb-0">
                  book your tickets with us easily.
                </p>
              </div>

              <Link to="/nowplaying">
                <button className="bg-gradient-to-r from-[#fc00ff]  to-[#00dbde] text-white font-semibold text-xl cursor-pointer hover:bg-gradient-to-tr hover:from-[#00dbde] hover:to-[#fc00ff] hover:scale-105 duration-200 transition-all ease-in px-8 py-2 rounded-full">
                  <div className="flex flex-row justify-center items-center gap-2">
                    <p>I Need ticket Now</p>
                    <IoMdArrowRoundForward className="text-main" />
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
