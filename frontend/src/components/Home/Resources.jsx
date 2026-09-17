import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  BookMarked,
  ExternalLink,
} from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "Repositorio UNP",
      description: "Tesis y publicaciones institucionales de acceso abierto",
      icon: BookOpen,
      link: "https://repositorio.unp.edu.pe/home",
      category: "Institucional",
    },
    {
      title: "Scopus",
      description: "Citas y literatura científica revisada por pares",
      icon: Search,
      link: "https://www.scopus.com/pages/home",
      category: "Base de datos",
    },
    {
      title: "ScienceDirect",
      description: "Artículos y libros científicos de Elsevier",
      icon: FileText,
      link: "https://www.sciencedirect.com/",
      category: "Base de datos",
    },
    {
      title: "IOPscience",
      description: "Revistas especializadas en física y ciencias exactas",
      icon: Atom,
      link: "https://iopscience.iop.org/",
      category: "Base de datos",
    },
    {
      title: "Turnitin",
      description: "Verificación de similitud y originalidad académica",
      icon: ShieldCheck,
      link: "https://latam.turnitin.com/",
      category: "Herramienta",
    },
    {
      title: "Revistas UNP",
      description:
        "Portal de revistas científicas y académicas de la institución",
      icon: BookMarked,
      link: "https://revistas.unp.edu.pe/index.php/index/es",
      category: "Institucional",
    },
  ];

  const marqueeItems = [...resources, ...resources];

  return (
    <section className="relative overflow-hidden py-14 sm:py-20 bg-white">
      <div className="absolute top-0 left-0 w-[400px] h-[250px] bg-brand-primary/10 blur-[100px] pointer-events-none rounded-full hidden sm:block" />
      <div className="absolute top-0 right-0 w-[400px] h-[250px] bg-brand-primary/10 blur-[100px] pointer-events-none rounded-full hidden sm:block" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f020_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f020_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div
          className="mx-auto max-w-2xl text-center mb-10 sm:mb-4"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <SectionLabel>Recursos Digitales</SectionLabel>
          <SectionTitle>
            Plataformas e información científica a tu alcance
          </SectionTitle>

          <div
            className="mt-6 flex items-center justify-center gap-6 py-4 max-w-lg mx-auto"
            data-aos="fade-in"
            data-aos-delay="150"
          >
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                6
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Plataformas
              </div>
            </div>
            <div className="w-px h-7 bg-slate-200" />
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                4
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Categorías
              </div>
            </div>
            <div className="w-px h-7 bg-slate-200" />
            <div>
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-900">
                ∞
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Acceso libre
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-2">
        <div className="absolute left-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-5 px-3">
          {marqueeItems.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <a
                key={`${item.title}-${index}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${item.title}`}
                className="
                  group relative flex flex-col justify-between rounded-2xl
                  border border-slate-200/80 bg-white p-5 sm:p-6
                  w-[280px] sm:w-[320px] shrink-0
                  transition-all duration-300
                  hover:border-brand-primary/40 hover:bg-slate-50/50 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-brand-icon-bg text-brand-primary transition-all duration-300 group-hover:bg-brand-primary group-hover:text-white group-hover:scale-110">
                      <IconComponent className="h-5 w-5" />
                    </div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60 truncate">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-4">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 transition-colors duration-200 group-hover:text-brand-primary line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-3 flex items-center justify-between border-t border-slate-100 text-xs font-semibold text-slate-400 transition-colors duration-200 group-hover:text-brand-primary">
                  <span>Acceder plataforma</span>
                  <ExternalLink className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </a>
            );
          })}
        </div>
      </div>

      <div
        className="mt-12 flex justify-center relative z-10"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <Button href="#" className="group text-xs sm:text-sm">
          Explorar todos los servicios
        </Button>
      </div>
    </section>
  );
}
