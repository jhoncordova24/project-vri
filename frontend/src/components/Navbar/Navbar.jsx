import { useState } from "react";
import logo from "../../assets/logo.webp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
      <nav className="mt-4 relative max-w-5xl w-full bg-white/80 backdrop-blur-md border border-white/20 shadow-sm rounded-2xl md:rounded-full mx-2 flex flex-wrap md:flex-nowrap items-center justify-between p-2 px-5 sm:mx-auto transition-all">
        <div className="flex items-center">
          <a
            className="flex items-center gap-3 rounded-md text-xl font-semibold focus:outline-none"
            href="#"
            aria-label="Logo"
          >
            <img
              src={logo}
              alt="Logo Vicerrectorado"
              className="h-9 w-auto shrink-0"
            />

            <div className="flex flex-col justify-center leading-tight">
              <span className="text-brand-dark font-bold text-sm block sm:hidden whitespace-nowrap">
                VRI
              </span>
              <span className="text-brand-dark font-bold text-sm md:text-base hidden sm:block whitespace-nowrap">
                Vicerrectorado de Investigación
              </span>
              <span className="text-slate-500 font-normal text-[10px] md:text-xs hidden sm:block">
                Universidad Nacional de Piura
              </span>
            </div>
          </a>
        </div>

        <div className="flex items-center gap-2 md:order-4 md:ms-4">
          <a
            className="whitespace-nowrap py-2 px-5 inline-flex justify-center items-center text-xs font-semibold rounded-full bg-brand-primary border border-transparent text-white hover:bg-brand-hover focus:outline-none transition-colors"
            href="#"
          >
            Contacto
          </a>

          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex justify-center items-center size-8 bg-slate-100 border border-slate-200 text-slate-600 rounded-full hover:bg-slate-200 focus:outline-none transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? (
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg
                  className="shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <line x1="3" x2="21" y1="12" y2="12" />
                  <line x1="3" x2="21" y1="18" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:block overflow-hidden transition-all duration-300 basis-full grow`}
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-5 mt-3 md:mt-0 pt-2 md:pt-0  md:border-t-0">
            <a
              className="py-0.5 px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-slate-700 hover:text-brand-primary transition-colors ps-2 md:ps-0"
              href="#"
            >
              Inicio
            </a>
            <a
              className="py-0.5 px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-slate-700 hover:text-brand-primary transition-colors ps-2 md:ps-0"
              href="#"
            >
              Nosotros
            </a>
            <a
              className="py-0.5 px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-slate-700 hover:text-brand-primary transition-colors ps-2 md:ps-0"
              href="#"
            >
              Noticias
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
