import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Offices from "../components/Offices/Offices";
import Resources from "../components/Resources/Resources";
import Banner from "../components/Banner/Banner";
import News from "../components/News/News";
import Footer from "../components/Footer/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Offices />
      <Resources />
      <Banner />
      <News />
      <Footer />
    </>
  );
}
