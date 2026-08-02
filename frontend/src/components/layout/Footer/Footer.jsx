import logo from "../../../assets/logo.webp";

export default function Footer() {
  return (
    <footer
      className="relative  bg-white border-t border-slate-200/80 text-slate-700"
      data-aos="fade"
      data-aos-duration="800"
    >
      <div className="px-4 pt-12 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8">
        <div className="grid gap-16 row-gap-10 mb-10 lg:grid-cols-6">
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
              <span className="text-sm font-bold  text-brand-dark uppercase">
                Vicerrectorado de Investigación
              </span>
            </a>
            <div className="mt-4 lg:max-w-sm">
              <p className="text-sm text-slate-500 leading-relaxed">
                Promovemos el desarrollo científico, tecnológico y humanístico
                para el progreso sostenible de la región y el país.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5 row-gap-8 lg:col-span-4 md:grid-cols-4">
            <div>
              <p className="font-bold text-xs tracking-widest text-brand-primary uppercase">
                Navegación
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="/"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Inicio
                  </a>
                </li>
                <li>
                  <a
                    href="/nosotros"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Nosotros
                  </a>
                </li>
                <li>
                  <a
                    href="/noticias"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Noticias
                  </a>
                </li>
                <li>
                  <a
                    href="/contacto"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Contacto
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-xs tracking-widest text-brand-primary uppercase">
                Investigación
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Proyectos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Publicaciones
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Semilleros
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Convocatorias
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-xs tracking-widest text-brand-primary uppercase">
                Recursos
              </p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Repositorio
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Reglamentos
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-slate-600 hover:text-brand-primary transition-colors"
                  >
                    Formatos
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-bold text-xs tracking-widest text-brand-primary uppercase">
                Contacto
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-primary transition-colors"
                  >
                    Universidad Nacional de Piura
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:vrinvestigacion@unp.edu.pe"
                    className="hover:text-brand-primary transition-colors truncate block"
                  >
                    vrinvestigacion@unp.edu.pe
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-between pt-6 pb-10 border-t border-slate-200/80 sm:flex-row items-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Vicerrectorado de Investigación - UNP.
            Todos los derechos reservados.
          </p>
          <div className="flex items-center mt-4 space-x-4 sm:mt-0">
            <a
              href="https://www.facebook.com/share/199WQScC3r/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-brand-primary transition-colors p-2 rounded-full bg-slate-100"
              aria-label="Facebook"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M22,0H2C0.895,0,0,0.895,0,2v20c0,1.105,0.895,2,2,2h11v-9h-3v-4h3V8.413c0-3.1,1.893-4.788,4.659-4.788 c1.325,0,2.463,0.099,2.795,0.143v3.24l-1.918,0.001c-1.504,0-1.795,0.715-1.795,1.763V11h4.44l-1,4h-3.44v9H22c1.105,0,2-0.895,2-2 V2C24,0.895,23.105,0,22,0z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
