import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Button from "../common/Button";

export default function ProjectDetailHero({
  title,
  subtitle,
  imageSrc,
  heightClass = "min-h-[520px] h-[75vh] sm:h-[85vh]",
  year = 2025,
  loading = false,
}) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div
      className={`relative -mt-20 ${heightClass} w-full overflow-hidden bg-slate-900 flex items-center`}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt={title ? `Banner de ${title}` : "Banner del proyecto"}
          loading="eager"
          fetchPriority="high"
          onLoad={() => setIsImageLoaded(true)}
          className={`
            absolute inset-0 object-cover w-full h-full
            brightness-75
            transition-all duration-[1200ms] ease-out
            ${isImageLoaded ? "opacity-75 scale-100" : "opacity-0 scale-105"}
          `}
        />
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/60" />

      <div className="relative w-full h-full flex items-center pt-28 pb-12 sm:pt-28 sm:pb-0 z-10">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8">
          <div className="max-w-4xl">
            {loading && !title ? (
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 animate-pulse">
                <div className="h-6 sm:h-10 bg-white/20 rounded-xl w-4/5" />
                <div className="h-6 sm:h-10 bg-white/20 rounded-xl w-3/5" />
                <div className="h-4 sm:h-5 bg-white/10 rounded-lg w-2/5 mt-3 sm:mt-4" />
              </div>
            ) : (
              <>
                {title && (
                  <h1
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="100"
                    className="mb-4 sm:mb-5 font-sans text-base sm:text-2xl md:text-3xl lg:text-4xl font-semibold sm:font-bold text-white leading-relaxed sm:leading-tight text-balance break-words"
                  >
                    {title}
                  </h1>
                )}

                {subtitle && (
                  <div
                    data-aos="fade-up"
                    data-aos-duration="800"
                    data-aos-delay="200"
                    className="mb-6 sm:mb-8 border-l-2 border-brand-secondary pl-3.5 py-0.5"
                  >
                    <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                      <span className="font-semibold text-brand-secondary">
                        Línea de investigación:{" "}
                      </span>
                      {subtitle.replace(/^Línea de investigación:\s*/i, "")}
                    </p>
                  </div>
                )}
              </>
            )}

            <div
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="300"
              className="inline-block"
            >
              <Button
                to={`/proyectos/${year}`}
                icon={ArrowLeft}
                iconPosition="left"
                className="transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.97]"
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
