import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../common/Button";

import hero1Desktop from "../../assets/home/hero-1-desktop.avif";
import hero1Mobile from "../../assets/home/hero-1-mobile.avif";
import hero2Desktop from "../../assets/home/hero-2-desktop.avif";
import hero2Mobile from "../../assets/home/hero-2-mobile.avif";
import hero3Desktop from "../../assets/home/hero-3-desktop.avif";
import hero3Mobile from "../../assets/home/hero-3-mobile.avif";

const EASE = [0.22, 1, 0.36, 1];

const heroSlides = [
  { desktop: hero1Desktop, mobile: hero1Mobile },
  { desktop: hero2Desktop, mobile: hero2Mobile },
  { desktop: hero3Desktop, mobile: hero3Mobile },
];

const rotatingWords = [
  "el conocimiento",
  "la innovación",
  "la ciencia",
  "el futuro",
];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={rotatingWords[index]}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="inline-block text-white"
      >
        {rotatingWords[index]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function HomeHero() {
  const [imageIndex, setImageIndex] = useState(0);
  const [heroHeight, setHeroHeight] = useState("100svh");

  useEffect(() => {
    let prevWidth = window.innerWidth;

    const setHeight = () => {
      setHeroHeight(`${window.innerHeight}px`);
    };

    setHeight();

    const handleResize = () => {
      if (window.innerWidth !== prevWidth) {
        prevWidth = window.innerWidth;
        setHeight();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    heroSlides.forEach((slide) => {
      const imgD = new Image();
      imgD.src = slide.desktop;
      const imgM = new Image();
      imgM.src = slide.mobile;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % heroSlides.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  const currentSlide = heroSlides[imageIndex];

  return (
    <div
      style={{ height: heroHeight }}
      className="relative min-h-[500px] md:!h-screen w-full overflow-hidden bg-slate-950"
    >
      <AnimatePresence>
        <motion.div
          key={imageIndex}
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: 0.75,
            scale: 1.15,
            transition: {
              opacity: { duration: 1.2, ease: EASE },
              scale: { duration: 8, ease: "linear" },
            },
          }}
          exit={{ opacity: 0, transition: { duration: 1.2, ease: EASE } }}
          style={{ willChange: "opacity, transform" }}
          className="absolute inset-0 w-full h-full pointer-events-none select-none transform-gpu"
        >
          <picture className="w-full h-full block">
            <source media="(min-width: 768px)" srcSet={currentSlide.desktop} />
            <img
              src={currentSlide.mobile}
              alt="Vicerrectorado de Investigación"
              className="w-full h-full object-cover"
            />
          </picture>
        </motion.div>
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-black/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/60" />

      <div className="relative h-full flex items-center pt-28">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 z-10">
          <div className="max-w-xl">
            <span
              data-aos="fade-up"
              data-aos-duration="850"
              className="block mb-2 text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase"
            >
              Vicerrectorado de Investigación
            </span>

            <h1
              data-aos="fade-up"
              data-aos-duration="850"
              data-aos-delay="150"
              className="mb-4 font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
            >
              Impulsamos <br />
              <RotatingWord />
            </h1>

            <p
              data-aos="fade-up"
              data-aos-duration="850"
              data-aos-delay="300"
              className="mb-8 text-base text-slate-200 sm:text-lg font-normal leading-relaxed"
            >
              Promovemos el desarrollo científico, tecnológico y humanístico
              para el progreso sostenible de la región y el país.
            </p>

            <div
              data-aos="fade-up"
              data-aos-duration="850"
              data-aos-delay="450"
              className="flex flex-row items-center gap-2.5 sm:gap-4 flex-wrap"
            >
              <Button to="/proyectos">Ver proyectos</Button>
              <Button to="/nosotros" variant="secondary" icon={null}>
                Conócenos
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
