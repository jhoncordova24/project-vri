import logo from "../../assets/logo.webp";

export default function Footer() {
  return (
    <footer
      className="relative mt-16 bg-brand-dark text-slate-100"
      data-aos="fade"
      data-aos-duration="800"
    >
      <svg
        className="absolute top-0 w-full h-6 -mt-5 sm:-mt-10 sm:h-16 text-brand-dark"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-8 lg:grid-cols-6">
          <div className="md:max-w-md lg:col-span-2">
            <a
              href="/"
              aria-label="Ir al inicio"
              title="Vicerrectorado de Investigación"
              className="inline-flex items-center gap-3"
            >
              <img
                src={logo}
                alt="Logo Vicerrectorado de Investigación"
                className="w-10 h-auto object-contain"
              />
              <span className="text-md font-bold tracking-wide text-white uppercase">
                Vicerrectorado de Investigación
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-slate-300">
                Promovemos el desarrollo científico, tecnológico y humanístico
                para el progreso sostenible de la región y el país.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-semibold tracking-wide text-brand-secondary">
                Navegación
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="/"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="/nosotros"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="/noticias"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Noticias
                  </a>
                </li>
                <li>
                  <a
                    href="/contacto"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-brand-secondary">
                Investigación
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Proyectos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Publicaciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Semilleros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Convocatorias
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-brand-secondary">
                Recursos
              </p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Repositorio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Reglamentos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="transition-colors duration-300 text-slate-300 hover:text-brand-secondary"
                  >
                    Formatos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold tracking-wide text-brand-secondary">
                Contacto
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors duration-300 hover:text-brand-secondary"
                  >
                    Universidad Nacional de Piura
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vrinvestigacion@unp.edu.pe"
                    className="transition-colors duration-300 hover:text-brand-secondary"
                  >
                    vrinvestigacion@unp.edu.pe
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-5 pb-10 border-t border-slate-800 sm:flex-row">
          <p className="text-sm text-slate-400">
            © {new Date().getFullYear()} Vicerrectorado de Investigación - UNP.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="https://www.facebook.com/share/199WQScC3r/"
              className="transition-colors duration-300 text-slate-400 hover:text-brand-secondary"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
