import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../common/Button";

const EASE = [0.22, 1, 0.36, 1];

const heroImages = [
  "https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=75",
  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1600&q=75",
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

  useEffect(() => {
    heroImages.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setImageIndex((i) => (i + 1) % heroImages.length);
    }, 5500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-[500px] h-[100svh] w-full overflow-hidden bg-slate-950">
      <AnimatePresence>
        <motion.img
          key={imageIndex}
          src={heroImages[imageIndex]}
          alt="Vicerrectorado de Investigación"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 0.55, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ willChange: "opacity, transform" }}
          className="absolute inset-0 object-cover w-full h-full pointer-events-none select-none"
        />
      </AnimatePresence>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />

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
