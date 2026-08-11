import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import heroVideo from "../../assets/hero-home.mp4";
import Button from "../common/Button";

const EASE = [0.22, 1, 0.36, 1];

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
    }, 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={rotatingWords[index]}
        initial={{ y: 24, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        exit={{ y: -24, opacity: 0, filter: "blur(10px)" }}
        transition={{ duration: 0.65, ease: EASE }}
        className="inline-block bg-white bg-clip-text text-transparent"
      >
        {rotatingWords[index]}
      </motion.span>
    </AnimatePresence>
  );
}

export default function HomeHero() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative -mt-20 h-[800px] w-full overflow-hidden bg-slate-900">
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedData={() => setIsVideoLoaded(true)}
        onError={() => setIsVideoLoaded(true)}
        className={`
          absolute inset-0 object-cover w-full h-full
          brightness-40
          transition-all duration-[1500ms] ease-out
          ${isVideoLoaded ? "opacity-60 scale-100" : "opacity-0 scale-105"}
        `}
      >
        <source src={heroVideo} type="video/mp4" />
      </video>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/5 to-slate-950/40" />

      <div className="relative h-full flex items-center pt-28">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 z-10">
          <div className="max-w-xl">
            <span
              data-aos="fade-up"
              data-aos-duration="850"
              data-aos-delay="0"
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
              className="inline-block"
            >
              <Button
                href="#nosotros"
                className="transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
              >
                Conocer más
              </Button>
            </div>
          </div>
        </div>

        <svg
          className="absolute inset-x-0 bottom-0 text-white w-full h-20 sm:h-28 z-10"
          viewBox="0 0 1440 120"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32L60,42.7C120,53,240,75,360,80C480,85,600,75,720,58.7C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
}
