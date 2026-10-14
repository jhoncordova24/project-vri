import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import logo from "../../../assets/logo.webp";
import logo2 from "../../../assets/logo-2.webp";

const DIRECCIONES_ITEMS = [
  {
    label: "Dirección de Investigación",
    to: "/direcciones/investigacion",
  },
  {
    label: "Incubadora de Empresas (Nexora)",
    to: "/direcciones/incubadora-empresas",
  },
  {
    label: "Innovación y Transferencia Tecnológica",
    to: "/direcciones/innovacion-transferencia",
  },
  {
    label: "Producción de Bienes y Servicios",
    to: "/direcciones/produccion-bienes-servicios",
  },
];

const DESARROLLO_ITEMS = [
  {
    label: "Comité de Ética",
    to: "/desarrollo/comite-etica",
  },
  {
    label: "Propiedad Intelectual y Patentes",
    to: "/desarrollo/propiedad-intelectual-patentes",
  },
  {
    label: "ORIPE",
    to: "/desarrollo/oripe",
  },
  {
    label: "IOARR",
    to: "/desarrollo/ioarr",
  },
];

function BrandLogo() {
  return (
    <NavLink
      className="flex-none rounded-md inline-flex items-center gap-x-1.5 focus:outline-hidden focus:opacity-80"
      to="/"
      aria-label="Inicio"
    >
      <span className="h-10 md:h-11 w-9 md:w-10 shrink-0 flex items-center justify-center">
        <img
          src={logo2}
          alt="Logo institucional"
          width="40"
          height="44"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="h-full w-full object-contain py-1"
        />
      </span>

      <span className="h-10 md:h-12 w-9 md:w-11 shrink-0 flex items-center justify-center">
        <img
          src={logo}
          alt="Vicerrectorado de Investigación"
          width="44"
          height="48"
          loading="eager"
          decoding="sync"
          fetchPriority="high"
          className="h-full w-full object-contain py-1"
        />
      </span>

      <span className="text-sm md:text-base font-semibold text-gray-800 leading-tight shrink-0">
        <span className="block md:hidden">VRI</span>
        <span className="hidden md:inline md:ml-2 whitespace-nowrap">
          Vicerrectorado de Investigación
        </span>
      </span>
    </NavLink>
  );
}

function DropdownMenuList({ items, onCloseAll, isMobile = false }) {
  return (
    <div className="flex flex-col gap-y-1">
      {items.map((item) => (
        <NavLink
          key={item.label}
          to={item.to}
          className={({ isActive }) =>
            `block transition-colors focus:outline-hidden ${
              isMobile
                ? `py-2.5 px-4 rounded-xl text-sm ${
                    isActive
                      ? "text-brand-primary font-semibold"
                      : "text-gray-700"
                  }`
                : `py-2 px-3 text-sm rounded-xl ${
                    isActive
                      ? "text-brand-primary font-semibold bg-black/5"
                      : "text-gray-800 hover:bg-black/5"
                  }`
            }`
          }
          onClick={onCloseAll}
        >
          {item.label}
        </NavLink>
      ))}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [direccionesOpen, setDireccionesOpen] = useState(false);
  const [desarrolloOpen, setDesarrolloOpen] = useState(false);

  const [mobileDireccionesOpen, setMobileDireccionesOpen] = useState(false);
  const [mobileDesarrolloOpen, setMobileDesarrolloOpen] = useState(false);

  const direccionesDropdownRef = useRef(null);
  const desarrolloDropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        direccionesDropdownRef.current &&
        !direccionesDropdownRef.current.contains(e.target)
      ) {
        setDireccionesOpen(false);
      }
      if (
        desarrolloDropdownRef.current &&
        !desarrolloDropdownRef.current.contains(e.target)
      ) {
        setDesarrolloOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setIsOpen(false);
    setDireccionesOpen(false);
    setDesarrolloOpen(false);
    setMobileDireccionesOpen(false);
    setMobileDesarrolloOpen(false);
  };

  const linkClass = ({ isActive }) =>
    `md:px-3 md:py-4 text-sm focus:outline-hidden transition-colors ${
      isActive
        ? "text-brand-primary font-semibold"
        : "text-gray-800 hover:text-gray-500"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block py-3 px-4 rounded-xl text-[15px] transition-colors ${
      isActive ? "text-brand-primary font-semibold" : "text-gray-800"
    }`;

  return (
    <>
      <header className="fixed top-4 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full before:absolute before:inset-0 before:max-w-5xl before:mx-2 lg:before:mx-auto before:rounded-[26px] before:bg-white/70 before:backdrop-blur-xl before:backdrop-saturate-150 before:border before:border-white/40 before:shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <nav className="relative max-w-5xl w-full flex flex-wrap md:flex-nowrap basis-full items-center justify-between py-2 ps-5 pe-2 md:py-0 mx-2 lg:mx-auto">
          <div className="flex items-center">
            <BrandLogo />
          </div>

          <div className="hidden md:flex md:items-center md:ps-7">
            <NavLink className={linkClass} to="/" end>
              Inicio
            </NavLink>
            <NavLink className={linkClass} to="/nosotros">
              Nosotros
            </NavLink>

            <div className="relative" ref={direccionesDropdownRef}>
              <button
                type="button"
                className="md:px-3 md:py-4 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden transition-colors cursor-pointer"
                aria-expanded={direccionesOpen}
                onClick={() => {
                  setDireccionesOpen((prev) => !prev);
                  setDesarrolloOpen(false);
                }}
              >
                Direcciones
                <ChevronDown
                  className={`duration-200 ms-1 shrink-0 size-3.5 text-gray-600 transition-transform ${
                    direccionesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-72 z-10 rounded-2xl bg-white/90 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-200 origin-top overflow-hidden ${
                  direccionesOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-2">
                  <DropdownMenuList
                    items={DIRECCIONES_ITEMS}
                    onCloseAll={closeAll}
                  />
                </div>
              </div>
            </div>

            <div className="relative" ref={desarrolloDropdownRef}>
              <button
                type="button"
                className="md:px-3 md:py-4 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden transition-colors cursor-pointer"
                aria-expanded={desarrolloOpen}
                onClick={() => {
                  setDesarrolloOpen((prev) => !prev);
                  setDireccionesOpen(false);
                }}
              >
                Desarrollo
                <ChevronDown
                  className={`duration-200 ms-1 shrink-0 size-3.5 text-gray-600 transition-transform ${
                    desarrolloOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute top-full left-0 mt-2 w-72 z-10 rounded-2xl bg-white/90 backdrop-blur-xl backdrop-saturate-150 border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-200 origin-top overflow-hidden ${
                  desarrolloOpen
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-95 pointer-events-none"
                }`}
              >
                <div className="p-2">
                  <DropdownMenuList
                    items={DESARROLLO_ITEMS}
                    onCloseAll={closeAll}
                  />
                </div>
              </div>
            </div>

            <NavLink className={linkClass} to="/noticias">
              Noticias
            </NavLink>
          </div>

          <div className="md:order-3 flex items-center gap-x-3">
            <div className="md:ps-3">
              <NavLink
                to="/contacto"
                className="group inline-flex items-center gap-x-2 py-2 px-4 bg-brand-primary text-white font-medium text-sm text-nowrap rounded-[26px] hover:bg-brand-hover focus:outline-hidden transition-colors"
              >
                Contacto
              </NavLink>
            </div>

            <div className="md:hidden">
              <button
                type="button"
                className="size-9 flex justify-center items-center text-sm font-semibold rounded-full text-gray-800 disabled:opacity-50 disabled:pointer-events-none"
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
          <div className="flex items-center justify-between px-5 py-4">
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
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] text-gray-800 transition-colors"
                onClick={() => setMobileDireccionesOpen((v) => !v)}
              >
                Direcciones
                <ChevronDown
                  className={`shrink-0 size-4 text-gray-500 transition-transform duration-200 ${
                    mobileDireccionesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileDireccionesOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="pl-3 pt-1">
                  <DropdownMenuList
                    items={DIRECCIONES_ITEMS}
                    onCloseAll={closeAll}
                    isMobile={true}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] text-gray-800 transition-colors"
                onClick={() => setMobileDesarrolloOpen((v) => !v)}
              >
                Desarrollo
                <ChevronDown
                  className={`shrink-0 size-4 text-gray-500 transition-transform duration-200 ${
                    mobileDesarrolloOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  mobileDesarrolloOpen ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="pl-3 pt-1">
                  <DropdownMenuList
                    items={DESARROLLO_ITEMS}
                    onCloseAll={closeAll}
                    isMobile={true}
                  />
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
            <NavLink
              to="/contacto"
              className="w-full inline-flex items-center justify-center gap-x-2 py-2.5 px-4 bg-brand-primary text-white font-medium text-sm rounded-[26px] hover:bg-brand-hover focus:outline-hidden transition-colors"
              onClick={closeAll}
            >
              Contacto
            </NavLink>
          </div>
        </aside>
      </div>
    </>
  );
}
