import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";
import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  BookMarked,
  Globe2,
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
    {
      title: "PeruCRIS",
      description:
        "Plataforma que visibiliza la producción científica de los investigadores de la universidad",
      icon: Globe2,
      link: "https://perucris.concytec.gob.pe/",
      category: "Nacional",
    },
  ];

  const totalPlatforms = resources.length;
  const totalCategories = new Set(resources.map((item) => item.category)).size;
  const marqueeItems = [...resources, ...resources];

  return (
    <SectionContainer
      label="Recursos Digitales"
      title="Plataformas e información científica a tu alcance"
      centered={true}
      className="bg-white overflow-hidden"
      dataAos="fade-up"
      headerBottom={
        <div className="flex items-center justify-center gap-6 py-2 max-w-lg mx-auto">
          <div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 text-center">
              {totalPlatforms}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500">
              Plataformas
            </div>
          </div>

          <div className="w-px h-7 bg-slate-200" />

          <div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 text-center">
              {totalCategories}
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500">
              Categorías
            </div>
          </div>

          <div className="w-px h-7 bg-slate-200" />

          <div>
            <div className="text-xl sm:text-2xl font-black font-mono text-slate-900 text-center">
              ∞
            </div>
            <div className="text-[11px] sm:text-xs text-slate-500">
              Acceso libre
            </div>
          </div>
        </div>
      }
    >
      <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] overflow-hidden py-3">
        <div className="absolute left-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 inset-y-0 w-20 sm:w-36 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

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
                    <h3 className="text-sm sm:text-base font-bold text-slate-700 transition-colors duration-200 group-hover:text-slate-900 line-clamp-1">
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

      <div className="mt-10 flex justify-center">
        <Button href="#" className="group text-xs sm:text-sm">
          Explorar todos los servicios
        </Button>
      </div>
    </SectionContainer>
  );
}
