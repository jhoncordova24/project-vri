import heroBg from "../../assets/hero.webp";
export default function Hero() {
  return (
    <div className="relative -mt-20 h-[800px] w-full overflow-hidden bg-slate-900">
      <img
        src={heroBg}
        className="absolute inset-0 object-cover w-full h-full opacity-60 brightness-50"
        alt="Hero Background"
        data-aos="zoom-out"
        data-aos-duration="1200"
      />

      <div className="relative h-full flex items-center pt-28">
        <div className="max-w-7xl w-full mx-auto px-6 sm:px-8 z-10">
          <div className="max-w-xl">
            <span
              className="block mb-2 text-xs sm:text-sm font-bold tracking-widest text-slate-300 uppercase"
              data-aos="fade-down"
              data-aos-delay="100"
            >
              Vicerrectorado de Investigación
            </span>

            <h1
              className="mb-4 font-sans text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Impulsamos <br />
              el conocimiento
            </h1>

            <p
              className="mb-8 text-base text-slate-200 sm:text-lg font-normal leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              Promovemos el desarrollo científico, tecnológico y humanístico
              para el progreso sostenible de la región y el país.
            </p>

            <div data-aos="fade-up" data-aos-delay="400">
              <a
                href="#"
                className="inline-flex items-center gap-2 py-3 px-7 font-semibold text-sm text-white bg-brand-primary hover:bg-brand-hover transition-colors rounded-full shadow-md focus:outline-none"
              >
                Conocer más
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
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
