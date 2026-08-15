import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

import logo from "../../../assets/logo.webp";
import logo2 from "../../../assets/logo-2.webp";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [direccionesOpen, setDireccionesOpen] = useState(false);
  const [investigacionOpen, setInvestigacionOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const closeAll = () => {
    setIsOpen(false);
    setDireccionesOpen(false);
    setInvestigacionOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `md:px-3 md:py-4 text-sm focus:outline-hidden transition-colors ${
      isActive
        ? "text-brand-primary font-semibold"
        : "text-gray-800 hover:text-gray-500"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 rounded-xl text-[15px] transition-colors ${
      isActive
        ? "text-brand-primary font-semibold bg-brand-primary/5"
        : "text-gray-800 hover:bg-gray-50"
    }`;

  return (
    <>
      <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-[26px] before:bg-white/70 before:backdrop-blur-xl before:backdrop-saturate-150 before:border before:border-white/40 before:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <nav className="relative max-w-5xl w-full flex flex-wrap md:flex-nowrap basis-full items-center justify-between py-2 ps-5 pe-2 md:py-0 mx-2 lg:mx-auto">
          <div className="flex items-center">
            <NavLink
              className="flex-none rounded-md inline-flex items-center gap-x-1 focus:outline-hidden focus:opacity-80"
              to="/"
              aria-label="Inicio"
            >
              <img
                src={logo2}
                alt="Logo institucional"
                className="h-10 md:h-11 w-auto object-contain py-1"
              />
              <img
                src={logo}
                alt="Vicerrectorado de Investigación"
                className="h-10 md:h-12 w-auto object-contain py-1"
              />
              <span className="text-sm md:text-base font-semibold text-gray-800 leading-tight">
                <span className="block md:hidden">VRI</span>
                <span className="hidden md:inline md:ml-2">
                  Vicerrectorado de Investigación
                </span>
              </span>
            </NavLink>
          </div>

          <div className="hidden md:flex md:items-center md:ps-7">
            <NavLink className={linkClass} to="/" end>
              Inicio
            </NavLink>
            <NavLink className={linkClass} to="/nosotros">
              Nosotros
            </NavLink>

            <div className="hs-dropdown [--strategy:fixed] [--adaptive:adaptive] inline-block">
              <button
                id="hs-pro-ancpd"
                type="button"
                className="hs-dropdown-toggle md:px-3 md:py-4 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                aria-haspopup="menu"
                aria-expanded="false"
                aria-label="Dropdown"
              >
                Direcciones
                <ChevronDown className="hs-dropdown-open:rotate-180 duration-300 ms-1 shrink-0 size-3.5 text-gray-600" />
              </button>

              <div
                className="hs-dropdown-menu transition-[opacity,margin] duration-150 hs-dropdown-open:opacity-100 opacity-0 relative w-60 hidden z-10 top-full rounded-2xl bg-white/90 backdrop-blur-xl border border-white/60 shadow-xl before:absolute before:-top-4 before:inset-s-0 before:w-full before:h-5"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="hs-pro-ancpd"
              >
                <div className="p-2 flex flex-col gap-y-0.5">
                  <div className="hs-dropdown [--strategy:absolute] [--trigger:hover] relative">
                    <button
                      id="hs-pro-ancpd-inv"
                      type="button"
                      className="hs-dropdown-toggle w-full py-2 px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                    >
                      Investigación
                      <ChevronDown className="hs-dropdown-open:-rotate-90 -rotate-90 ms-auto shrink-0 size-3.5 text-gray-600" />
                    </button>

                    <div
                      className="hs-dropdown-menu transition-[opacity,margin] duration-150 hs-dropdown-open:opacity-100 opacity-0 relative w-70 hidden z-10 mt-0 top-0 inset-e-full -translate-x-4 bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-xl before:absolute before:-inset-e-5 before:top-0 before:h-full before:w-5"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="hs-pro-ancpd-inv"
                    >
                      <div className="p-2 flex flex-col gap-y-1">
                        <a
                          className="py-1.5 px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                          href="#"
                        >
                          Unidad de Gestión de Proyectos de Investigación Básica
                          y Aplicada
                        </a>
                      </div>
                    </div>
                  </div>

                  <a
                    className="py-2 px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                    href="#"
                  >
                    Producción de Bienes y Servicios
                  </a>
                  <a
                    className="py-2 px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                    href="#"
                  >
                    Innovación y Transferencia Tecnológica
                  </a>
                  <a
                    className="py-2 px-3 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                    href="#"
                  >
                    Incubadora de Empresas
                  </a>
                </div>
              </div>
            </div>

            <NavLink className={linkClass} to="/noticias">
              Noticias
            </NavLink>
          </div>

          <div className="md:order-3 flex items-center gap-x-3">
            <div className="md:ps-3">
              <a
                className="group inline-flex items-center gap-x-2 py-2 px-4 bg-brand-primary text-white font-medium text-sm text-nowrap rounded-[26px] hover:bg-brand-hover focus:outline-hidden"
                href="#"
              >
                Contacto
              </a>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="size-9 flex justify-center items-center text-sm font-semibold rounded-full  text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                aria-expanded={isOpen}
                aria-controls="mobile-sidebar"
                aria-label="Abrir menú"
                onClick={() => setIsOpen(true)}
              >
                <Menu className="shrink-0 size-4" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      <div
        className={`md:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-900/30 backdrop-blur-sm"
          onClick={closeAll}
        />

        <aside
          id="mobile-sidebar"
          className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-4 ">
            <span className="text-sm font-semibold text-gray-800">Menú</span>
            <button
              type="button"
              className="size-9 flex justify-center items-center rounded-full text-gray-800"
              aria-label="Cerrar menú"
              onClick={closeAll}
            >
              <X className="shrink-0 size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-y-1">
            <NavLink className={mobileLinkClass} to="/" end onClick={closeAll}>
              Inicio
            </NavLink>
            <NavLink
              className={mobileLinkClass}
              to="/nosotros"
              onClick={closeAll}
            >
              Nosotros
            </NavLink>

            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] text-gray-800 hover:bg-gray-50"
                onClick={() => setDireccionesOpen((v) => !v)}
              >
                Direcciones
                <ChevronDown
                  className={`shrink-0 size-4 text-gray-500 transition-transform duration-200 ${
                    direccionesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  direccionesOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="pl-3 pt-1 flex flex-col gap-y-1">
                  <div>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setInvestigacionOpen((v) => !v)}
                    >
                      Investigación
                      <ChevronRight
                        className={`shrink-0 size-3.5 text-gray-500 transition-transform duration-200 ${
                          investigacionOpen ? "rotate-90" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        investigacionOpen ? "max-h-[300px]" : "max-h-0"
                      }`}
                    >
                      <a
                        className="block py-2 px-4 ml-3 rounded-xl text-sm text-gray-600 hover:bg-gray-50"
                        href="#"
                        onClick={closeAll}
                      >
                        Unidad de Gestión de Proyectos de Investigación Básica y
                        Aplicada
                      </a>
                    </div>
                  </div>

                  <a
                    className="py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    href="#"
                    onClick={closeAll}
                  >
                    Producción de Bienes y Servicios
                  </a>
                  <a
                    className="py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    href="#"
                    onClick={closeAll}
                  >
                    Innovación y Transferencia Tecnológica
                  </a>
                  <a
                    className="py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    href="#"
                    onClick={closeAll}
                  >
                    Incubadora de Empresas
                  </a>
                </div>
              </div>
            </div>

            <NavLink
              className={mobileLinkClass}
              to="/noticias"
              onClick={closeAll}
            >
              Noticias
            </NavLink>
          </div>

          <div className="px-5 py-4">
            <a
              className="w-full inline-flex items-center justify-center gap-x-2 py-2.5 px-4 bg-brand-primary text-white font-medium text-sm rounded-[26px] hover:bg-brand-hover focus:outline-hidden"
              href="#"
              onClick={closeAll}
            >
              Contacto
            </a>
          </div>
        </aside>
      </div>
    </>
  );
}
