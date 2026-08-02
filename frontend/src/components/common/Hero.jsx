import { useState } from "react";
import heroVideo from "../../assets/hero-home.mp4";
import Button from "./Button";

export default function Hero({
  title = (
    <>
      Impulsamos <br /> el conocimiento
    </>
  ),
  subtitle = "Promovemos el desarrollo científico, tecnológico y humanístico para el progreso sostenible de la región y el país.",
  badge = "Vicerrectorado de Investigación",
  showButton = true,
  buttonText = "Conocer más",
  buttonHref = "#nosotros",
  type = "video",
  imageSrc,
  posterSrc,
}) {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="relative -mt-20 h-[800px] w-full overflow-hidden bg-slate-900">
      {type === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster={posterSrc}
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
      ) : (
        <img
          src={imageSrc}
          alt="Banner de sección"
          loading="eager"
          fetchpriority="high"
          data-aos="zoom-out"
          data-aos-duration="1000" 
          className="absolute inset-0 object-cover w-full h-full brightness-40 opacity-60"
        />
      )}

      <div className="relative h-full flex items-center pt-28">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 z-10">
          <div className="max-w-xl">
            {badge && (
              <span
                className="block mb-2 text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase"
                data-aos="fade-down"
                data-aos-delay="100"
              >
                {badge}
              </span>
            )}

            <h1
              className="mb-4 font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              {title}
            </h1>

            {subtitle && (
              <p
                className="mb-8 text-base text-slate-200 sm:text-lg font-normal leading-relaxed"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                {subtitle}
              </p>
            )}

            {showButton && (
              <div data-aos="fade-up" data-aos-delay="400">
                <Button href={buttonHref}>{buttonText}</Button>
              </div>
            )}
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
