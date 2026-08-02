import Hero from "../components/common/Hero";
import Stats from "../components/Home/Stats";
import Offices from "../components/Home/Offices";
import Resources from "../components/Home/Resources";
import Leadership from "../components/Home/Leadership";
import Banner from "../components/Home/Banner";
import News from "../components/Home/News";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Offices />
      <Resources />
      <Leadership />
      <News />
      <Banner />
    </>
  );
}
