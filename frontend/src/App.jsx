import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";

import Home from "./pages/Home";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <div>
      <Navbar />

      <main>
        <Home />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
