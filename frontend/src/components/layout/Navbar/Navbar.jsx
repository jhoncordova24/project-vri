import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import logo from "../../../assets/logo.webp";
import logo2 from "../../../assets/logo-2.webp";

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `md:px-3 md:py-4 text-sm focus:outline-hidden transition-colors ${
      isActive
        ? "text-brand-primary font-semibold"
        : "text-gray-800 hover:text-gray-500"
    }`;

  return (
    <>
      <header className="sticky top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-[26px] before:bg-white before:border before:border-gray-200 before:shadow-xs">
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
                className="hs-collapse-toggle size-9 flex justify-center items-center text-sm font-semibold rounded-full border border-gray-200 text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
                id="hs-pro-an-collapse"
                aria-expanded="false"
                aria-controls="hs-pro-an"
                aria-label="Toggle navigation"
                data-hs-collapse="#hs-pro-an"
              >
                <Menu className="hs-collapse-open:hidden shrink-0 size-4" />
                <X className="hs-collapse-open:block hidden shrink-0 size-4" />
              </button>
            </div>
          </div>

          <div
            id="hs-pro-an"
            className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow
              absolute top-full inset-x-0 mt-2 mx-2 max-w-[calc(100%-1rem)] rounded-2xl bg-white border border-gray-200 shadow-xl z-50
              md:static md:mt-0 md:mx-0 md:max-w-none md:rounded-none md:bg-transparent md:border-0 md:shadow-none md:block"
            aria-labelledby="hs-pro-an-collapse"
            role="region"
          >
            <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-y-3 pt-6 pb-2 px-5 md:px-0 md:py-0 md:ps-7">
                <NavLink className={linkClass} to="/" end>
                  Inicio
                </NavLink>
                <a
                  className="md:px-3 md:py-4 text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                  href="index.html"
                >
                  Nosotros
                </a>
                <div className="hs-dropdown [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover] [--auto-close:inside] md:inline-block">
                  <button
                    id="hs-pro-ancpd"
                    type="button"
                    className="hs-dropdown-toggle md:px-3 md:py-4 w-full md:w-auto flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                    aria-haspopup="menu"
                    aria-expanded="false"
                    aria-label="Dropdown"
                  >
                    Direcciones
                    <ChevronDown className="hs-dropdown-open:-rotate-180 md:hs-dropdown-open:rotate-0 duration-300 ms-auto md:ms-1 shrink-0 size-3.5 text-gray-600" />
                  </button>
                  <div
                    className="hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] lg:duration-150 hs-dropdown-open:opacity-100 opacity-0 relative w-full md:w-50 hidden z-10 top-full rounded-2xl bg-white border border-gray-200 md:shadow-xl before:absolute before:-top-4 before:inset-s-0 before:w-full before:h-5 md:after:hidden mt-2 md:mt-0"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="hs-pro-ancpd"
                  >
                    <div className="p-5 flex flex-col gap-y-3">
                      <a
                        className="text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                        href="#"
                      >
                        Investigación
                      </a>
                      <a
                        className="text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                        href="#"
                      >
                        Producción de Bienes y Servicios
                      </a>
                      <a
                        className="text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
                        href="#"
                      >
                        Innovación y Transferencia Tecnológica
                      </a>
                      <a
                        className="text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden"
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
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
