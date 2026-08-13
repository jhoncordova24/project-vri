import { useState } from "react";
import Button from "./Button";

export default function PageHero({
  title,
  subtitle,
  badge = "Vicerrectorado de Investigación",
  showButton = false,
  buttonText = "Ver información",
  buttonHref = "#",
  imageSrc,
  heightClass = "h-[480px] sm:h-[650px]",
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`relative -mt-20 ${heightClass} w-full overflow-hidden bg-slate-900`}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Banner de sección"
          loading="eager"
          fetchPriority="high"
          onLoad={() => setIsImageLoaded(true)}
          className={`
            absolute inset-0 object-cover w-full h-full
            brightness-50
            transition-all duration-[1200ms] ease-out
            ${isImageLoaded ? "opacity-60 scale-100" : "opacity-0 scale-105"}
          `}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-slate-950/50" />

      <div className="relative h-full flex items-center pt-20 sm:pt-24">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 z-10">
          <div className="max-w-2xl">
            {badge && (
              <span
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="0"
                className="block mb-2 text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase"
              >
                {badge}
              </span>
            )}

            {title && (
              <h1
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="100"
                className="mb-3 sm:mb-4 font-sans text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="200"
                className="mb-6 text-sm sm:text-base text-slate-200 font-normal leading-relaxed"
              >
                {subtitle}
              </p>
            )}

            {showButton && (
              <div
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="300"
                className="inline-block"
              >
                <Button
                  href={buttonHref}
                  className="transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
                >
                  {buttonText}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
