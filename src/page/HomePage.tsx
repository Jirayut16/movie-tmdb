import Trending from "../components/Trending";
import Popular from "../components/Popular";
import NowPlaying from "../components/NowPlaying";
import Promotion from "../components/Promotion";
import Banner from "../components/Banner";

function HomePage() {
  return (
    <>
      <Banner />
      <Trending />
      <Popular />
      <Promotion />
      <NowPlaying />
    </>
  );
}

export default HomePage;
