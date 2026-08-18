import HomeHero from "../components/Home/HomeHero";
import Stats from "../components/Home/Stats";
import Offices from "../components/Home/Offices";
import Resources from "../components/Home/Resources";
import Banner from "../components/Home/Banner";
import Leadership from "../components/Home/Leadership";
import News from "../components/Home/News";

export default function Home() {
  return (
    <>
      <HomeHero />
      <Stats />
      <Offices />
      <Resources />
      <Banner />
      <Leadership />
      <News />
    </>
  );
}
