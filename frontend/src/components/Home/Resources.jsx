import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  Library,
} from "lucide-react";
import Button from "../common/Button";

export default function Resources() {
  const resources = [
    {
      title: "Repositorio",
      icon: BookOpen,
      link: "https://repositorio.unp.edu.pe/home",
    },
    {
      title: "Scopus",
      icon: Search,
      link: "https://www.scopus.com/pages/home",
    },
    {
      title: "ScienceDirect",
      icon: FileText,
      link: "https://www.sciencedirect.com/",
    },
    {
      title: "IOPscience",
      icon: Atom,
      link: "https://iopscience.iop.org/",
    },
    {
      title: "Turnitin",
      icon: ShieldCheck,
      link: "https://latam.turnitin.com/",
    },
    {
      title: "CONCYTEC",
      icon: Library,
      link: "https://biblioteca.concytec.gob.pe/",
    },
  ];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto px-4 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
        <div
          className="mb-10 max-w-xl sm:text-center md:mx-auto md:mb-12 lg:max-w-2xl"
          data-aos="fade-up"
        >
          <SectionLabel>Recursos Digitales</SectionLabel>

          <SectionTitle>
            Plataformas e Información
          </SectionTitle>

          <p className="text-sm text-slate-600 md:text-base">
            Acceso directo a las principales herramientas y bases de datos
            científicas de la universidad.
          </p>
        </div>

        <div className="mb-10 grid grid-cols-3 gap-3 sm:gap-6 lg:grid-cols-6">
          {resources.map((item, index) => {
            const IconComponent = item.icon;

            return (
              <div
                key={item.title}
                className="flex flex-col items-center justify-start"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${item.title}`}
                  className="
                    group
                    inline-flex
                    rounded-full
                    outline-none
                    focus-visible:ring-2
                    focus-visible:ring-brand-primary
                    focus-visible:ring-offset-2
                  "
                >
                  <div
                    className="
                      flex
                      h-14
                      w-14
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-slate-100
                      text-brand-primary
                      transition-colors
                      duration-200
                      group-hover:bg-brand-primary
                      group-hover:text-white
                      sm:h-20
                      sm:w-20
                    "
                  >
                    <IconComponent
                      className="h-7 w-7 sm:h-9 sm:w-9"
                      aria-hidden="true"
                    />
                  </div>
                </a>

                <h3 className="mt-2 text-center text-xs font-semibold leading-snug text-brand-dark sm:mt-3 sm:text-sm">
                  {item.title}
                </h3>
              </div>
            );
          })}
        </div>

        <div className="text-center" data-aos="fade-up">
          <Button href="#">Ver todos los servicios</Button>
        </div>
      </div>
    </section>
  );
}
