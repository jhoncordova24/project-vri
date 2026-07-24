const offices = [
  {
    title: "Dirección de Investigación",
    description:
      "Gestión, regulación y fomento de proyectos científicos y desarrollo académico.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Ciencia",
  },
  {
    title: "Dirección de Producción de Bienes y Servicios",
    description:
      "Comercialización de capacidades y servicios técnicos especializados.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Servicios",
  },
  {
    title: "Dirección de Innovación y Transferencia Tecnológica",
    description:
      "Vinculación con la industria, patentes y protección de propiedad intelectual.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Patentes",
  },
  {
    title: "Dirección de Incubadora de Empresas",
    description:
      "Impulso y mentoría para startups tecnológicas y emprendimientos de impacto.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    link: "#",
    badge: "Startups",
  },
];

export default function Offices() {
  return (
    <section className="py-16 lg:py-24 bg-slate-100/70 border-y border-slate-200/60 overflow-hidden">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 order-2 lg:order-1">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-6 sm:mt-8">
                {offices.slice(0, 2).map((office, index) => (
                  <a
                    key={index}
                    href={office.link}
                    className="group block relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm "
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 1)}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={office.image}
                        alt={office.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {office.badge}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-primary transition-colors leading-snug mb-2">
                        {office.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {office.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                        <span>Explorar área</span>
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
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
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="space-y-6">
                {offices.slice(2, 4).map((office, index) => (
                  <a
                    key={index}
                    href={office.link}
                    className="group block relative rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm "
                    data-aos="fade-up"
                    data-aos-delay={100 * (index + 3)}
                  >
                    <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                      <img
                        src={office.image}
                        alt={office.title}
                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                        {office.badge}
                      </span>
                    </div>

                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-800 group-hover:text-brand-primary transition-colors leading-snug mb-2">
                        {office.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                        {office.description}
                      </p>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-primary">
                        <span>Explorar área</span>
                        <svg
                          className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform"
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
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-5 order-1 lg:order-2"
            data-aos="fade-left"
          >
            <span className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-3 block">
              Estructura Orgánica
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight mb-6">
              Nuestras Direcciones Estratégicas
            </h2>
            <p className="text-slate-600 text-base leading-relaxed mb-6">
              El Vicerrectorado de Investigación impulsa el desarrollo
              científico, la producción académica y la innovación aplicada a
              través de cuatro direcciones clave que articulan la generación de
              conocimiento con su transferencia directa a la sociedad.
            </p>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              Promovemos la investigación de alto impacto, la transferencia
              tecnológica y el emprendimiento basado en ciencia, consolidando
              nuestro compromiso con el progreso de Piura.
            </p>

            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center gap-4 text-sm font-semibold text-slate-700 mt-4">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-primary"></span>
                </span>
                Gestión activa e interconectada en la Universidad Nacional de
                Piura
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
