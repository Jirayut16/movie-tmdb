import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import MainLayout from "./Layout/MainLayout";
import HomePage from "./page/HomePage";
import Upcoming from "./page/Upcoming";
import NowPlaying from "./page/NowPlaying";
import NotFound from "./page/NotFound";
import MovieDetail from "./page/MovieDetail";
import Theater from "./page/Theater";
import Payment from "./page/Payment";
import ShowTime from "./page/ShowTime";
import NowPlayingData from "./data/NowPlayingData";
import MovieShowtimeData from "./data/MovieShowtimeData";

function App() {
  const route = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout></MainLayout>}>
        <Route index element={<HomePage></HomePage>} />
        <Route
          path="/nowplaying"
          element={
            <NowPlayingData>
              <NowPlaying></NowPlaying>
            </NowPlayingData>
          }
        />
        <Route path="/upcoming" element={<Upcoming></Upcoming>} />
        <Route path="/movie/:id" element={<MovieDetail></MovieDetail>} />
        <Route
          path="/ticket/showtime/:id/:title"
          element={
            <NowPlayingData>
              <MovieShowtimeData>
                <ShowTime></ShowTime>
              </MovieShowtimeData>
            </NowPlayingData>
          }
        />
        <Route
          path="/ticket/theater/:id/:title"
          element={<Theater></Theater>}
        />
        <Route
          path="/ticket/:id/:title/payment"
          element={<Payment></Payment>}
        />
        <Route path="*" element={<NotFound></NotFound>} />
      </Route>
    )
  );
  return (
    <>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
