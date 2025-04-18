import { Outlet } from "react-router-dom";
import MainFooter from "../components/MainFooter";
import MainNavbar from "../components/MainNavbar";

function MainLayout() {
  return (
    <>
      <MainNavbar></MainNavbar>
      <main>
        <Outlet></Outlet>
      </main>
      <MainFooter></MainFooter>
    </>
  );
}

export default MainLayout;
