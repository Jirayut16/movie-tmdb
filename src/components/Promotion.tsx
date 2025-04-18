import { Carousel } from "flowbite-react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundForward } from "react-icons/io";
function Promotion() {
  return (
    <>
      <div className="h-56 sm:h-64 xl:h-96 container mx-auto mt-16">
        <Carousel>
          {/* item 1 */}
          <div
            className="bg-no-repeat bg-cover bg-center bg-[url('/pro1.jpg')] 
      // after:contents[''] after:bg-dark after:opacity-40 after:absolute after:top-0 after:h-screen after:w-full"
          >
            <div className="flex flex-col items-center justify-center h-screen">
              <div
                id="overlay"
                className="flex flex-col justify-center items-center text-white"
              >
                <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                  Get a medium size of popcorn
                </h4>
                <p className="mt-2 md:mt-4 text-lg md:text-2xl ">
                  and 1 cup of soft-drink
                </p>
                <p className="mt-2 md:mt-4 text-md md:text-lg mb-2">
                  for every 500฿ purchased.
                </p>

                <Link to="/nowplaying">
                  <button className=" bg-gradient-to-br mt-0 md:mt-4 from-[#fc00ff]  to-[#00dbde] text-third font-semibold text-base md:text-xl w-[300px] md:w-[200px] py-1 md:py-2 rounded-full duration-200 hover:scale-105 transition-all ease-in hover:bg-gradient-to-tr hover:from-[#00dbde] hover:to-[#fc00ff]">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <p>Book Now</p>
                      <IoMdArrowRoundForward className="text-cream" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* end item 1 */}

          {/* item 2 */}
          <div
            className="bg-no-repeat bg-cover bg-center bg-[url('/pro2.jpg')] 
      // after:contents[''] after:bg-dark after:opacity-40 after:absolute after:top-0 after:h-screen after:w-full"
          >
            <div className="flex flex-col items-center justify-center h-screen">
              <div
                id="overlay"
                className="flex flex-col justify-center items-center text-white"
              >
                <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                  Happy Friday night
                </h4>
                <p className="mt-2 md:mt-4 text-lg md:text-2xl ">
                  get discount 50% for 1 ticket
                </p>
                <p className="mt-2 md:mt-4 text-md md:text-lg mb-2">
                  on Friday night from 9:00 PM to 12:00 AM
                </p>

                <Link to="/nowplaying">
                  <button className="bg-gradient-to-br mt-0 md:mt-4 from-[#fc00ff]  to-[#00dbde] text-third font-semibold text-base md:text-xl w-[300px] md:w-[200px] py-1 md:py-2 rounded-full duration-200 hover:scale-105 transition-all ease-in hover:bg-gradient-to-tr hover:from-[#00dbde] hover:to-[#fc00ff]">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <p>Book Now</p>
                      <IoMdArrowRoundForward className="text-cream" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* end item 2 */}

          {/* item 3 */}
          <div
            className="bg-no-repeat bg-cover bg-center bg-[url('/pro3.jpg')] 
      // after:contents[''] after:bg-dark after:opacity-40 after:absolute after:top-0 after:h-screen after:w-full"
          >
            <div className="flex flex-col items-center justify-center h-screen">
              <div
                id="overlay"
                className="flex flex-col justify-center items-center text-white"
              >
                <h4 className="text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold">
                  Buy 1 get 1
                </h4>
                <p className="mt-2 md:mt-4 text-lg md:text-2xl  ">
                  on every Wednesday
                </p>
                <p className="mt-2 md:mt-4 text-md md:text-lg mb-2">
                  during 3:00 PM to 6:00 PM
                </p>

                <Link to="/nowplaying">
                  <button className="bg-gradient-to-br mt-0 md:mt-4 from-[#fc00ff]  to-[#00dbde] text-third font-semibold text-base md:text-xl w-[300px] md:w-[200px] py-1 md:py-2 rounded-full duration-200 hover:scale-105 transition-all ease-in hover:bg-gradient-to-tr hover:from-[#00dbde] hover:to-[#fc00ff]">
                    <div className="flex flex-row justify-center items-center gap-2">
                      <p>Book Now</p>
                      <IoMdArrowRoundForward className="text-cream" />
                    </div>
                  </button>
                </Link>
              </div>
            </div>
          </div>
          {/* end item 3 */}
        </Carousel>
      </div>
    </>
  );
}

export default Promotion;
