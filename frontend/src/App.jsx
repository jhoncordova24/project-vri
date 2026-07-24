import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
    });

    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-brand-primary selection:text-white">
      <Navbar />
      <main>
        <Home />
      </main>
    </div>
  );
}
