import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  Library,
  ExternalLink,
  Sparkles,
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
      title: "CONCYTEC",
      description: "Biblioteca virtual de ciencia, tecnología e innovación",
      icon: Library,
      link: "https://biblioteca.concytec.gob.pe/",
      category: "Institucional",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-18">
      <div className="absolute inset-0" />
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-5xl px-3 sm:px-6 lg:px-8">
        <div
          className="mx-auto max-w-2xl text-center"
          data-aos="fade-down"
          data-aos-duration="600"
        >
          <SectionLabel>Recursos Digitales</SectionLabel>
          <SectionTitle>
            Plataformas e información científica a tu alcance
          </SectionTitle>

          <div
            className="mt-6 flex items-center justify-center gap-6 border-y border-slate-200/60 py-4"
            data-aos="fade-in"
            data-aos-delay="150"
          >
            <div>
              <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                6
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Plataformas
              </div>
            </div>
            <div className="w-px h-7 bg-slate-200/60" />
            <div>
              <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                4
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Categorías
              </div>
            </div>
            <div className="w-px h-7 bg-slate-200/60" />
            <div>
              <div className="text-xl sm:text-2xl font-bold text-brand-dark">
                ∞
              </div>
              <div className="text-[11px] sm:text-xs text-slate-500">
                Acceso libre
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {resources.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <a
                key={item.title}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Abrir ${item.title}`}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                data-aos-duration="500"
                className="
                  group relative flex flex-col justify-between rounded-xl
                  border border-slate-200/80 bg-white p-3.5 sm:p-4.5
                  transition-colors duration-200
                  hover:border-brand-primary/40 hover:bg-slate-50/50
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
                "
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-brand-primary/10 text-brand-primary transition-colors duration-200 group-hover:bg-brand-primary group-hover:text-white">
                      <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-medium uppercase tracking-wider text-slate-500 bg-slate-100/80 px-2 py-0.5 rounded-full border border-slate-200/60 truncate">
                      {item.category}
                    </span>
                  </div>

                  <div className="mt-3">
                    <h3 className="text-xs sm:text-sm font-semibold text-brand-dark transition-colors duration-200 group-hover:text-brand-primary line-clamp-1">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[11px] sm:text-xs text-slate-500 leading-snug line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-2.5 flex items-center justify-between border-t border-slate-100 text-[11px] sm:text-xs font-medium text-slate-400 transition-colors duration-200 group-hover:text-brand-primary">
                  <span>Acceder</span>
                  <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                </div>
              </a>
            );
          })}
        </div>

        <div
          className="mt-8 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <Button href="#" className="group text-xs sm:text-sm">
            Explorar todos los servicios
          </Button>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-slate-500"
          data-aos="fade-in"
          data-aos-delay="350"
        >
          <span className="flex items-center gap-1.5">
            <Sparkles className="size-3.5 text-brand-primary" />
            Acceso institucional
          </span>
          <span className="w-px h-3.5 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5 text-brand-primary" />
            Verificado
          </span>
          <span className="w-px h-3.5 bg-slate-200" />
          <span className="flex items-center gap-1.5">
            <Library className="size-3.5 text-brand-primary" />
            Recursos académicos
          </span>
        </div>
      </div>
    </section>
  );
}
