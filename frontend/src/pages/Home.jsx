import Hero from "../components/Hero/Hero";
import Stats from "../components/Stats/Stats";
import Offices from "../components/Offices/Offices";
import Banner from "../components/Banner/Banner";
import Footer from "../components/Footer/Footer";
import Resources from "../components/Resources/Resources";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Offices />
      <Resources />
      <Banner />
      <Footer />
    </>
  );
}
