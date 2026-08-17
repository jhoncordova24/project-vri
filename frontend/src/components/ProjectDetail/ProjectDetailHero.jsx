import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../common/Button";

export default function ProjectDetailHero({
  title,
  subtitle,
  imageSrc,
  heightClass = "min-h-[500px] h-[75vh] sm:h-[85vh]",
  year = 2025,
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

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/60" />

      <div className="relative w-full pt-32 pb-14 sm:pt-36 sm:pb-18 z-10">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8">
          <div className="max-w-4xl">
            {title && (
              <h1
                data-aos="fade-in"
                data-aos-duration="900"
                data-aos-delay="100"
                className="mb-3 sm:mb-4 font-sans text-1xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-snug sm:leading-tight"
              >
                {title}
              </h1>
            )}

            {subtitle && (
              <p
                data-aos="fade-in"
                data-aos-duration="700"
                data-aos-delay="200"
                className="text-sm sm:text-base text-slate-200 font-normal leading-relaxed max-w-2xl mb-6 sm:mb-8"
              >
                {subtitle}
              </p>
            )}

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="500"
            >
              <Button
                to={`/proyectos/${year}`}
                icon={ArrowLeft}
                iconPosition="left"
              >
                Volver a proyectos ({year})
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
