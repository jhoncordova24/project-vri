import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import ScrollToTopButton from "./components/common/ScrollToTopButton";
import ScrollToTop from "./components/common/ScrollToTop";

import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
    AOS.refresh();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/noticias" element={<News />} />
          <Route path="/noticias/:id" element={<NewsDetail />} />

          <Route path="/proyectos/detalle/:id" element={<ProjectDetail />} />
          <Route path="/proyectos/:year" element={<Projects />} />
          <Route
            path="/proyectos"
            element={<Navigate to="/proyectos/2026" replace />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

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
      <AppContent />
    </BrowserRouter>
  );
}
