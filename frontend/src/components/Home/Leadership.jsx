import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import Button from "../common/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import zapataImg from "../../assets/leadership/1.webp";
import tumeImg from "../../assets/leadership/2.webp";

const IMAGE_TRANSITION_MS = 700;
const TEXT_FADE_MS = 260;
const AUTOPLAY_MS = 5000;
const KEN_BURNS_MS = 6000;
const HOVER_TIMEOUT_MS = 400;

export default function Leadership() {
  const authorities = useMemo(
    () => [
      {
        id: 1,
        name: "Dr. Orlando Bartolomé Zapata Coloma",
        role: "Vicerrector de Investigación",
        bio: "Doctor en Ciencias con amplia trayectoria en gestión académica. Lidera la estrategia de desarrollo científico, tecnológico y humanístico de la institución.",
        image: zapataImg,
      },
      {
        id: 2,
        name: "Dr. Juan Manuel Tume Ruiz",
        role: "Director de la Dirección de Investigación",
        bio: "Especialista en gestión de la innovación, emprendimiento académico y transferencia tecnológica para el desarrollo regional.",
        image: tumeImg,
      },
      {
        id: 3,
        name: "Mgtr. Robert Moises Montero Timaná",
        role: "Director de la Dirección de Bienes y Servicios",
        bio: "Encargado del monitoreo, evaluación y gestión presupuestal de los fondos concursables e iniciativas de investigación.",
        image:
          "https://static0.gamerantimages.com/wordpress/wp-content/uploads/2025/06/goku-ultra-instinct-featured.jpg?w=1600&h=900&fit=crop",
      },
    ],
    [],
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayIndex, setDisplayIndex] = useState(0);
  const [textFading, setTextFading] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const [isHovering, setIsHovering] = useState(false);
  const [isTabVisible, setIsTabVisible] = useState(true);
  const isPaused = isHovering || !isTabVisible;

  const textTimeoutRef = useRef(null);
  const hoverTimeoutRef = useRef(null);

  const goToIndex = useCallback((getNextIndex) => {
    setCurrentIndex((prev) => {
      const next =
        typeof getNextIndex === "function" ? getNextIndex(prev) : getNextIndex;
      if (next === prev) return prev;

      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
      setTextFading(true);
      textTimeoutRef.current = setTimeout(() => {
        setDisplayIndex(next);
        setTextFading(false);
      }, TEXT_FADE_MS);

      return next;
    });
  }, []);

  const handleNext = useCallback(() => {
    goToIndex((prev) => (prev + 1) % authorities.length);
  }, [goToIndex, authorities.length]);

  const handlePrev = useCallback(() => {
    goToIndex((prev) => (prev - 1 + authorities.length) % authorities.length);
  }, [goToIndex, authorities.length]);

  const handleGoTo = useCallback(
    (index) => {
      goToIndex(index);
    },
    [goToIndex],
  );

  useEffect(() => {
    return () => {
      if (textTimeoutRef.current) clearTimeout(textTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const id = setInterval(handleNext, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [isPaused, currentIndex, handleNext]);

  useEffect(() => {
    const onVisibilityChange = () => setIsTabVisible(!document.hidden);
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    setIsZoomed(false);
    let raf2;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setIsZoomed(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [currentIndex]);
  
  const handleMouseMove = useCallback(() => {
    setIsHovering(true);
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(
      () => setIsHovering(false),
      HOVER_TIMEOUT_MS,
    );
  }, []);

  const handleMouseLeaveImmediate = useCallback(() => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovering(false);
  }, []);

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      }
    },
    [handleNext, handlePrev],
  );

  const display = authorities[displayIndex];

  return (
    <section
      className="w-full bg-brand-dark text-white overflow-hidden relative"
      role="region"
      aria-roledescription="carousel"
      aria-label="Autoridades"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeaveImmediate}
      onFocus={() => setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-2">
        <div
          className="relative w-full aspect-[4/3] md:aspect-auto md:h-[500px] bg-brand-dark overflow-hidden"
          data-aos="fade-in"
          data-aos-duration="800"
        >
          {authorities.map((authority, idx) => {
            const isActive = idx === currentIndex;
            return (
              <div
                key={authority.id}
                className="absolute inset-0 transition-opacity ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  opacity: isActive ? 1 : 0,
                  transitionDuration: `${IMAGE_TRANSITION_MS}ms`,
                }}
                aria-hidden={!isActive}
                role="group"
                aria-roledescription="slide"
                aria-label={`${idx + 1} de ${authorities.length}`}
              >
                <img
                  src={authority.image}
                  alt={authority.name}
                  className="w-full h-full object-cover object-top transition-transform ease-out"
                  style={{
                    transform:
                      isActive && isZoomed ? "scale(1)" : "scale(1.06)",
                    transitionDuration: `${KEN_BURNS_MS}ms`,
                  }}
                  loading={idx === 0 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={idx === 0 ? "high" : "auto"}
                />
              </div>
            );
          })}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent md:hidden pointer-events-none" />
        </div>

        <div
          className="flex flex-col justify-between p-6 sm:p-10 lg:p-12 relative bg-gradient-to-br from-brand-dark via-brand-dark to-brand-primary/80"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="100"
        >
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-secondary/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-[11px] font-mono text-slate-300 tracking-wider uppercase tabular-nums">
              0{displayIndex + 1} / 0{authorities.length}
            </span>

            <div className="flex gap-2">
              <button
                onClick={handlePrev}
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:border-white/30 active:scale-95 transition-all duration-200 text-white backdrop-blur-sm"
                aria-label="Autoridad anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 rounded-full border border-white/15 bg-white/5 flex items-center justify-center hover:bg-brand-primary hover:border-white/30 active:scale-95 transition-all duration-200 text-white backdrop-blur-sm"
                aria-label="Siguiente autoridad"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className="relative z-10 transition-all ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transitionDuration: `${TEXT_FADE_MS}ms`,
              opacity: textFading ? 0 : 1,
              transform: textFading ? "translateY(6px)" : "translateY(0)",
            }}
            aria-live="polite"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-white mb-1">
              {display.name}
            </h3>

            <p className="text-brand-secondary font-medium text-xs sm:text-sm lg:text-base mb-4">
              {display.role}
            </p>

            <p className="text-slate-300 text-xs sm:text-sm lg:text-base leading-relaxed font-light max-w-lg line-clamp-4">
              {display.bio}
            </p>
          </div>

          <div className="mt-6 pt-4 relative z-10 flex items-center justify-between">
            <Button href="#">Ver más</Button>

            <div className="flex gap-1.5">
              {authorities.map((authority, idx) => (
                <button
                  key={authority.id}
                  onClick={() => handleGoTo(idx)}
                  className="h-1.5 rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: idx === currentIndex ? "20px" : "6px",
                    backgroundColor:
                      idx === currentIndex
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.25)",
                  }}
                  aria-label={`Ir a ${authority.name}`}
                  aria-current={idx === currentIndex}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
