import { Navbar, NavbarCollapse, NavbarToggle } from "flowbite-react";

import { Link, NavLink } from "react-router-dom";
function MainNavbar() {
  function activeLink({ isActive }: { isActive: boolean }) {
    return isActive
      ? "text-lg md:text-xl font-semibold text-third"
      : "text-lg md:text-xl font-normal hover:text-third/90 cursor-pointer duration-200 transition-all ease-in ";
  }

  return (
    <div className=" bg-main text-white">
      <div className="container mx-auto">
        <Navbar className="bg-main">
          <Link to={"/"}>
            <span className="self-center whitespace-nowrap text-2xl font-semibold">
              EZTicket.com
            </span>
          </Link>

          <NavbarToggle />
          <NavbarCollapse className="text-white">
            <NavLink to={"/nowplaying"} className={activeLink}>
              Now Playing
            </NavLink>
            <NavLink to={"/upcoming"} className={activeLink}>
              Upcoming
            </NavLink>
          </NavbarCollapse>
        </Navbar>
      </div>
    </div>
  );
}

export default MainNavbar;
