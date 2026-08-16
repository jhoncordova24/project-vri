import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

import logo from "../../../assets/logo.webp";
import logo2 from "../../../assets/logo-2.webp";

const NAV_LINKS = [
  { to: "/", label: "Inicio", end: true },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/noticias", label: "Noticias" },
];

const DIRECCIONES_ITEMS = [
  {
    type: "submenu",
    label: "Investigación",
    items: [
      {
        label:
          "Unidad de Gestión de Proyectos de Investigación Básica y Aplicada",
        href: "#",
      },
    ],
  },
  {
    type: "link",
    label: "Producción de Bienes y Servicios",
    href: "#",
  },
  {
    type: "link",
    label: "Innovación y Transferencia Tecnológica",
    href: "#",
  },
  {
    type: "link",
    label: "Incubadora de Empresas",
    href: "#",
  },
];

function BrandLogo() {
  return (
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
  );
}

function DireccionesList({
  isSubmenuOpen,
  onToggleSubmenu,
  onCloseAll,
  isMobile = false,
}) {
  return (
    <div className="flex flex-col gap-y-1">
      {DIRECCIONES_ITEMS.map((item) => {
        if (item.type === "submenu") {
          return (
            <div key={item.label}>
              <button
                type="button"
                className={`w-full flex items-center justify-between transition-colors focus:outline-hidden ${
                  isMobile
                    ? "py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                    : "py-2 px-3 text-sm text-gray-800 hover:bg-black/5 rounded-xl"
                }`}
                onClick={onToggleSubmenu}
              >
                <span>{item.label}</span>
                <ChevronDown
                  className={`size-3.5 text-gray-500 transition-transform duration-200 ${
                    isSubmenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isSubmenuOpen
                    ? isMobile
                      ? "max-h-[300px]"
                      : "max-h-36 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pl-3 py-1 flex flex-col border-l-2 border-brand-primary/20 ml-3 my-1">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.label}
                      className={`block leading-relaxed transition-colors focus:outline-hidden ${
                        isMobile
                          ? "py-2 px-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                          : "py-1.5 px-2.5 text-sm text-gray-700 hover:bg-black/5 rounded-lg"
                      }`}
                      href={subItem.href}
                      onClick={onCloseAll}
                    >
                      {subItem.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        }

        return (
          <a
            key={item.label}
            className={`block transition-colors focus:outline-hidden ${
              isMobile
                ? "py-2.5 px-4 rounded-xl text-sm text-gray-700 hover:bg-gray-50"
                : "py-2 px-3 text-sm text-gray-800 hover:bg-black/5 rounded-xl"
            }`}
            href={item.href}
            onClick={onCloseAll}
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [direccionesOpen, setDireccionesOpen] = useState(false);
  const [investigacionOpen, setInvestigacionOpen] = useState(false);

  const [mobileDireccionesOpen, setMobileDireccionesOpen] = useState(false);
  const [mobileInvestigacionOpen, setMobileInvestigacionOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDireccionesOpen(false);
        setInvestigacionOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAll = () => {
    setIsOpen(false);
    setDireccionesOpen(false);
    setInvestigacionOpen(false);
    setMobileDireccionesOpen(false);
    setMobileInvestigacionOpen(false);
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
            <BrandLogo />
          </div>

          <div className="hidden md:flex md:items-center md:ps-7">
            <NavLink className={linkClass} to="/" end>
              Inicio
            </NavLink>
            <NavLink className={linkClass} to="/nosotros">
              Nosotros
            </NavLink>

            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="md:px-3 md:py-4 flex items-center text-sm text-gray-800 hover:text-gray-500 focus:outline-hidden transition-colors"
                aria-expanded={direccionesOpen}
                onClick={() => setDireccionesOpen((prev) => !prev)}
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
                  <DireccionesList
                    isSubmenuOpen={investigacionOpen}
                    onToggleSubmenu={() =>
                      setInvestigacionOpen((prev) => !prev)
                    }
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
              <a
                className="group inline-flex items-center gap-x-2 py-2 px-4 bg-brand-primary text-white font-medium text-sm text-nowrap rounded-[26px] hover:bg-brand-hover focus:outline-hidden transition-colors"
                href="#"
              >
                Contacto
              </a>
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
                className="w-full flex items-center justify-between py-3 px-4 rounded-xl text-[15px] text-gray-800 hover:bg-gray-50 transition-colors"
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
                  <DireccionesList
                    isSubmenuOpen={mobileInvestigacionOpen}
                    onToggleSubmenu={() =>
                      setMobileInvestigacionOpen((v) => !v)
                    }
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
            <a
              className="w-full inline-flex items-center justify-center gap-x-2 py-2.5 px-4 bg-brand-primary text-white font-medium text-sm rounded-[26px] hover:bg-brand-hover focus:outline-hidden transition-colors"
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
