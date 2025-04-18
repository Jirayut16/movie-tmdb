import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center h-full p-16">
      <div className="w-48 md:w-96 h-48 md:h-96 p-4">
        <img
          src="/popcorn.png"
          alt="popcorn"
          className="w-full h-full object-cover"
        />
      </div>
      <h1 className="text-2xl md:text-6xl font-semibold">Page not found.</h1>
      <Link to="/">
        <button className="mt-4 text-base md:text-xl text-red-500  hover:text-red-600  duration-150 transition-all ease-in cursor-pointer">
          Return to Home
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
