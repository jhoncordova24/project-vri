import { Calendar, ArrowRight } from "lucide-react";

export default function News() {
  const news = [
    {
      id: 1,
      title: "UNP impulsa nuevos proyectos de investigación en biotecnología",
      date: "24 Jul 2026",
      category: "Investigación",
      image:
        "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=600&q=80",
      link: "/noticias/1",
    },
    {
      id: 2,
      title: "Docentes investigadores son reconocidos en ranking internacional",
      date: "18 Jul 2026",
      category: "Reconocimiento",
      image:
        "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=600&q=80",
      link: "/noticias/2",
    },
    {
      id: 3,
      title: "Abren convocatoria para semilleros de investigación 2026-II",
      date: "10 Jul 2026",
      category: "Convocatoria",
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80",
      link: "/noticias/3",
    },
  ];

  return (
    <section className="py-16 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          data-aos="fade-up"
        >
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-2">
              Actualidad Institucional
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
              Últimas Noticias
            </h2>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-500 max-w-md">
            Entérate de los últimos avances, eventos y logros científicos de
            nuestra comunidad universitaria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item, index) => (
            <article
              key={item.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm  transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="aspect-[16/10] overflow-hidden bg-slate-100 relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {item.category}
                  </span>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="font-bold text-brand-dark text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                    {item.title}
                  </h3>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2">
                <a
                  href={item.link}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary group-hover:text-brand-hover transition-colors"
                >
                  <span>Leer noticia</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center" data-aos="fade-up">
          <a
            href="/noticias"
            className="inline-flex items-center justify-center h-11 px-7 font-semibold text-xs tracking-wide text-white transition-colors duration-200 rounded-full bg-brand-primary hover:bg-brand-hover shadow-md focus:outline-none"
          >
            Ver todas las noticias
            <ArrowRight className="w-4 h-4 ml-2 -mr-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
