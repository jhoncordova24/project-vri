import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/noticias/:id" element={<NewsDetail />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </BrowserRouter>
  );
}
