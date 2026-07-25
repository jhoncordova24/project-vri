const offices = [
  {
    title: "Dirección de Investigación",
    description:
      "Impulsamos la generación de conocimiento científico a través de la gestión y financiamiento de proyectos de investigación de alto impacto, fortaleciendo las capacidades académicas y la producción intelectual de nuestra comunidad universitaria.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Investigación",
    stats: "45+ proyectos activos",
  },
  {
    title: "Dirección de Producción de Bienes y Servicios",
    description:
      "Articulamos las capacidades técnicas y científicas de la universidad con el sector productivo, ofreciendo servicios especializados que generan valor y transferencia de conocimiento al ecosistema empresarial.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Servicios",
    stats: "120+ servicios prestados",
  },
  {
    title: "Dirección de Innovación y Transferencia Tecnológica",
    description:
      "Protegemos y gestionamos la propiedad intelectual generada en la universidad, facilitando la transferencia de tecnología al sector productivo y promoviendo la cultura de la innovación aplicada.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Patentes",
    stats: "15+ patentes registradas",
  },
  {
    title: "Dirección de Incubadora de Empresas",
    description:
      "Transformamos ideas innovadoras en empresas sostenibles, brindando mentoría especializada, acceso a redes de contacto y acompañamiento estratégico para emprendedores con base tecnológica.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Startups",
    stats: "30+ startups incubadas",
  },
];

export default function Offices() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-slate-100/70 to-white overflow-hidden">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div
            className="lg:col-span-5 lg:sticky lg:top-28 space-y-6"
            data-aos="fade-right"
          >
            <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-3.5 py-1.5 rounded-full">
              <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase">
                Estructura Orgánica
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-800 tracking-tight leading-[1.15]">
              Direcciones que{" "}
              <span className="block text-brand-primary mt-1 sm:mt-2">
                Transforman el Conocimiento
              </span>
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed border-l-4 border-brand-primary pl-4">
              El Vicerrectorado de Investigación articula la generación de
              conocimiento con su aplicación práctica a través de cuatro
              direcciones estratégicas que impulsan el desarrollo científico y
              tecnológico de la región.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-2">
              {["Impacto Social", "Innovación", "Excelencia"].map(
                (item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-primary shrink-0" />
                    <span className="text-xs text-slate-600 font-medium">
                      {item}
                    </span>
                  </div>
                ),
              )}
            </div>

            <div className="pt-2">
              <a
                href="#"
                className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-brand-primary text-white rounded-full font-semibold text-sm hover:bg-brand-hover transition-all hover:shadow-lg hover:shadow-brand-primary/30 group"
              >
                <span>Conoce nuestra estructura</span>
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {offices.map((office, index) => {
                const isOddColumn = index % 2 === 0;

                return (
                  <a
                    key={index}
                    href={office.link}
                    className={`group block relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm ${
                      isOddColumn ? "sm:mt-8" : "sm:-mt-0"
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 1)}
                  >
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-900">
                      <img
                        src={office.image}
                        alt={office.title}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                      <span className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-white/95 backdrop-blur-sm text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        {office.badge}
                      </span>

                      <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4">
                        <span className="text-white/90 text-[10px] font-medium bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
                          {office.stats}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <h3 className="text-base font-bold text-slate-800 group-hover:text-brand-primary transition-colors leading-snug mb-2 line-clamp-2">
                        {office.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {office.description}
                      </p>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
