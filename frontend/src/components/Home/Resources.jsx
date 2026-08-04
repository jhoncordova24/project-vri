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
} from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "Repositorio UNP",
      description: "Tesis y publicaciones",
      icon: BookOpen,
      link: "https://repositorio.unp.edu.pe/home",
    },
    {
      title: "Scopus",
      description: "Citas y literatura peer-reviewed",
      icon: Search,
      link: "https://www.scopus.com/pages/home",
    },
    {
      title: "ScienceDirect",
      description: "Artículos y libros científicos",
      icon: FileText,
      link: "https://www.sciencedirect.com/",
    },
    {
      title: "IOPscience",
      description: "Revistas de física y ciencias",
      icon: Atom,
      link: "https://iopscience.iop.org/",
    },
    {
      title: "Turnitin",
      description: "Verificación de similitud",
      icon: ShieldCheck,
      link: "https://latam.turnitin.com/",
    },
    {
      title: "CONCYTEC",
      description: "Biblioteca virtual CTI",
      icon: Library,
      link: "https://biblioteca.concytec.gob.pe/",
    },
  ];

  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div
        className="pointer-events-none absolute -left-20 top-1/2 -z-10 h-72 w-72 -translate-y-1/2 rounded-full bg-brand-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <div
            className="w-full lg:sticky lg:top-28 lg:w-5/12"
            data-aos="fade-right"
          >
            <SectionLabel>Recursos Digitales</SectionLabel>

            <SectionTitle>
              Plataformas e información científica a tu alcance
            </SectionTitle>

            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
              Ofrecemos acceso directo a las principales bases de datos,
              repositorios y herramientas de verificación académica.
            </p>

            <div className="mt-6 hidden sm:flex sm:items-center">
              <Button href="#">Ver todos los servicios</Button>
            </div>
          </div>

          <div className="w-full lg:w-7/12">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
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
                    data-aos-delay={index * 40}
                    className="
                      group relative flex items-center justify-between gap-3 rounded-xl
                      border border-slate-200/80 bg-white p-4 
                      transition-colors duration-200
                      hover:border-brand-primary/40 hover:shadow-md
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary
                    "
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className="
                          flex h-10 w-10 shrink-0 items-center justify-center rounded-lg
                          bg-brand-primary/10 text-brand-primary
                          transition-colors duration-200
                          group-hover:bg-brand-primary group-hover:text-white
                        "
                      >
                        <IconComponent className="h-5 w-5" aria-hidden="true" />
                      </div>

                      <div className="truncate">
                        <h3 className="truncate text-sm font-semibold text-slate-900 transition-colors duration-200 group-hover:text-brand-primary">
                          {item.title}
                        </h3>
                        <p className="truncate text-xs text-slate-500">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-slate-400 transition-colors duration-200 group-hover:text-brand-primary">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    </div>
                  </a>
                );
              })}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Button href="#">Ver todos los servicios</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
