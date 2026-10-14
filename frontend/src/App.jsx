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
import AccessibilityZoom from "./components/common/AccessibilityZoom";
import UnderConstruction from "./components/common/UnderConstruction";

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
            element={<Navigate to="/proyectos/2025" replace />}
          />

          {/* Direcciones */}
          <Route
            path="/direcciones/investigacion"
            element={<UnderConstruction title="Dirección de Investigación" />}
          />
          <Route
            path="/direcciones/incubadora-empresas"
            element={
              <UnderConstruction title="Incubadora de Empresas (Nexora)" />
            }
          />
          <Route
            path="/direcciones/innovacion-transferencia"
            element={
              <UnderConstruction title="Innovación y Transferencia Tecnológica" />
            }
          />
          <Route
            path="/direcciones/produccion-bienes-servicios"
            element={
              <UnderConstruction title="Producción de Bienes y Servicios" />
            }
          />

          {/* Desarrollo */}
          <Route
            path="/desarrollo/comite-etica"
            element={
              <UnderConstruction title="Comité de Ética en Investigación" />
            }
          />
          <Route
            path="/desarrollo/propiedad-intelectual-patentes"
            element={
              <UnderConstruction title="Propiedad Intelectual y Patentes" />
            }
          />
          <Route
            path="/desarrollo/oripe"
            element={<UnderConstruction title="ORIPE" />}
          />
          <Route
            path="/desarrollo/ioarr"
            element={<UnderConstruction title="IOARR" />}
          />

          {/* Contacto */}
          <Route
            path="/contacto"
            element={<UnderConstruction title="Contacto" />}
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />

      <AccessibilityZoom />
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
