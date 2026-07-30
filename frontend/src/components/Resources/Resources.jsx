import {
  BookOpen,
  Search,
  FileText,
  Atom,
  ShieldCheck,
  Library,
  ChevronRight,
} from "lucide-react";

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
    { title: "IOPscience", icon: Atom, link: "https://iopscience.iop.org/" },
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
    <section className="py-16 bg-white">
      <div className="px-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div
          className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
          data-aos="fade-up"
        >
          <span className="text-xs font-bold tracking-widest text-brand-primary uppercase block mb-2">
            Recursos Digitales
          </span>
          <h2 className="max-w-lg mb-4 text-2xl font-bold tracking-tight text-brand-dark sm:text-3xl md:mx-auto">
            Plataformas e Información
          </h2>
          <p className="text-sm text-slate-600 md:text-base">
            Acceso directo a las principales herramientas y bases de datos
            científicas de la universidad.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-10 sm:grid-cols-3 lg:grid-cols-6">
          {resources.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a
                key={index}
                href={item.link}
                data-aos="fade-up"
                data-aos-delay={index * 50}
                className="group text-center flex flex-col items-center justify-center p-3 rounded-2xl transition-colors duration-200"
              >
                <div className="flex items-center justify-center w-16 h-16 mb-3 rounded-full bg-slate-100 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-colors duration-200 sm:w-20 sm:h-20">
                  <IconComponent className="w-8 h-8 sm:w-9 sm:h-9" />
                </div>
                <h3 className="font-semibold text-xs sm:text-sm text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                  {item.title}
                </h3>
              </a>
            );
          })}
        </div>

        <div className="text-center" data-aos="fade-up">
          <a
            href="#"
            className="inline-flex items-center justify-center h-11 px-6 font-semibold text-xs tracking-wide text-white transition-colors duration-200 rounded-full bg-brand-primary hover:bg-brand-hover focus:outline-none"
          >
            Ver todos los servicios
            <ChevronRight className="w-4 h-4 ml-1 -mr-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
