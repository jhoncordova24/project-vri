import CountUp from "../CountUp/CountUp";

const mainStat = {
  number: "40+",
  badge: "Calificados Concytec",
  description: "Docentes investigadores registrados en Concytec.",
};

const secondaryStats = [
  {
    number: "15+",
    label: "Proyectos de investigación vigentes",
  },
  {
    number: "10+",
    label: "Semilleros de investigación activos",
  },
  {
    number: "100%",
    label: "Compromiso con el desarrollo de Piura",
    className: "col-span-2 sm:col-span-1",
  },
];

export default function Stats() {
  return (
    <section className="pt-4 pb-12 lg:pt-6 lg:pb-16 bg-white overflow-hidden">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div
          className="max-w-3xl mx-auto text-center mb-12 lg:mb-16"
          data-aos="fade-up"
        >
          <p className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-3">
            Nuestro Impacto
          </p>
          <h2 className="text-1xl sm:text-3xl md:text-4xl font-semibold text-slate-800 leading-relaxed tracking-tight">
            Transformamos el conocimiento en soluciones reales, impulsando la
            investigación científica y el desarrollo sostenible de nuestra
            región.
          </h2>
        </div>

        <div className="grid items-center lg:grid-cols-12 gap-8 lg:gap-12">
          <div
            className="lg:col-span-5"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <div className="lg:pe-6 xl:pe-12">
              <div className="flex items-center">
                <div className="text-5xl sm:text-7xl font-extrabold tracking-tight text-brand-dark min-w-[130px] sm:min-w-[160px]">
                  <CountUp value={mainStat.number} />
                </div>

                <span className="inline-flex items-center gap-x-1.5 bg-brand-primary/10 text-brand-primary font-semibold text-xs py-1 px-3 rounded-full shrink-0">
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                  {mainStat.badge}
                </span>
              </div>

              <p className="mt-3 text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
                {mainStat.description}
              </p>
            </div>
          </div>

          <div
            className="lg:col-span-7 relative lg:before:absolute lg:before:top-0 lg:before:-start-6 lg:before:w-px lg:before:h-full lg:before:bg-slate-200"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
              {secondaryStats.map((stat, index) => (
                <div
                  key={index}
                  className={stat.className || ""}
                  data-aos="fade-up"
                  data-aos-delay={400 + index * 100}
                >
                  <p className="text-3xl sm:text-4xl font-extrabold text-brand-primary tracking-tight">
                    <CountUp value={stat.number} />
                  </p>
                  <p className="mt-2 text-sm sm:text-base font-medium text-slate-700">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
