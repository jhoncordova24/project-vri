import { useState } from "react";

export default function ProjectDetailHero({
  title,
  subtitle,
  badge = "Proyecto de Investigación",
  imageSrc,
  heightClass = "min-h-[420px] sm:min-h-[500px]",
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`relative -mt-20 ${heightClass} w-full overflow-hidden bg-slate-900 flex items-center`}
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

      <div className="relative w-full pt-28 pb-12 sm:pt-32 sm:pb-16 z-10">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8">
          <div className="max-w-4xl">
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
                className="mb-3 sm:mb-4 font-sans text-1xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug sm:leading-tight"
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                data-aos="fade-up"
                data-aos-duration="700"
                data-aos-delay="200"
                className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl"
              >
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
