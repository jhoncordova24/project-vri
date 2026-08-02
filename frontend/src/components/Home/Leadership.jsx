import { useState, useEffect, useRef, useCallback } from "react";
import Button from "../common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Leadership() {
  const authorities = [
    {
      id: 1,
      name: "Dr. Orlando Bartolomé Zapata Coloma",
      role: "Vicerrector de Investigación",
      bio: "Doctor en Ciencias con amplia trayectoria en gestión académica. Lidera la estrategia de desarrollo científico, tecnológico y humanístico de la institución.",
      image: "https://ocri.unp.edu.pe/wp-content/uploads/2025/09/11-1.jpg",
    },
    {
      id: 2,
      name: "Mgtr. Néstor Atarma Montero",
      role: "Coord. de la Dirección de Innovación y Transferencia Tecnológica",
      bio: "Especialista en gestión de la innovación, emprendimiento académico y transferencia tecnológica para el desarrollo regional.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTot5PUQWPx10w-UpHRSu_MYu20gm54hGL6Ut7XaTGhmAYKSuXxOAdLdW1c&s=10",
    },
    {
      id: 3,
      name: "Econ. Elvis Luilly Vértiz Contreras",
      role: "Coord. de la Unidad de Gestión de Proyectos de Investigación Básica y Aplicada",
      bio: "Encargado del monitoreo, evaluación y gestión presupuestal de los fondos concursables e iniciativas de investigación.",
      image:
        "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/06/goku-ultra-instinct-featured.jpg?w=1600&h=900&fit=crop",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const changeSlide = useCallback(
    (nextIndex) => {
      if (isFading) return;
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsFading(false);
      }, 200);
    },
    [isFading],
  );

  const handleNext = useCallback(() => {
    changeSlide((currentIndex + 1) % authorities.length);
  }, [changeSlide, currentIndex, authorities.length]);

  const handlePrev = useCallback(() => {
    changeSlide((currentIndex - 1 + authorities.length) % authorities.length);
  }, [changeSlide, currentIndex, authorities.length]);

  const handleNextRef = useRef(handleNext);
  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNextRef.current();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const current = authorities[currentIndex];

  return (
    <section
      className="w-full bg-brand-dark text-white overflow-hidden relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative w-full aspect-[4/3] md:aspect-auto md:h-[400px] bg-brand-dark overflow-hidden"
          data-aos="fade-in"
          data-aos-duration="800"
        >
          <img
            src={current.image}
            alt={current.name}
            className={`w-full h-full object-cover object-top transition-opacity duration-300 ease-in-out ${
              isFading ? "opacity-20" : "opacity-100"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent md:hidden" />
        </div>

        <div
          className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/80"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[11px] font-mono text-slate-300 tracking-wider uppercase">
              0{currentIndex + 1} / 0{authorities.length}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:border-white/30 transition-all text-white backdrop-blur-sm"
                aria-label="Anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:border-white/30 transition-all text-white backdrop-blur-sm"
                aria-label="Siguiente"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`relative z-10 transition-all duration-300 ease-in-out ${
              isFading ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"
            }`}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">
              {current.name}
            </h3>

            <p className="text-brand-secondary font-medium text-xs sm:text-sm lg:text-base mb-4">
              {current.role}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-lg line-clamp-4">
              {current.bio}
            </p>
          </div>

          <div className="mt-6 pt-4 relative z-10">
            <Button href="#">Ver más</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
