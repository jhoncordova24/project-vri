"use client";

import { useState } from "react";

const offices = [
  {
    id: "investigacion",
    title: "Dirección de Investigación",
    badge: "Investigación",
    stats: "45+ proyectos activos",
    description:
      "Gestionamos y financiamos proyectos científicos de alto impacto para fortalecer la producción intelectual universitaria.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    link: "#investigacion",
    icon: (
      <svg
        className="shrink-0 mt-1 size-6 md:size-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10 2v7.314a2 2 0 0 0 .293 1.024l3.707 5.561A2 2 0 0 1 12.354 19H11.646a2 2 0 0 1-1.646-.899l-3.707-5.56A2 2 0 0 0 6 11.315V2" />
        <path d="M8 2h8" />
        <path d="M7 16h10" />
      </svg>
    ),
  },
  {
    id: "servicios",
    title: "Dirección de Producción de Bienes y Servicios",
    badge: "Servicios",
    stats: "120+ servicios prestados",
    description:
      "Conectamos las capacidades técnicas de la universidad con el sector productivo mediante servicios especializados.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    link: "#servicios",
    icon: (
      <svg
        className="shrink-0 mt-1 size-6 md:size-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    ),
  },
  {
    id: "transferencia",
    title: "Dirección de Innovación y Transferencia Tecnológica",
    badge: "Patentes",
    stats: "15+ patentes registradas",
    description:
      "Protegemos la propiedad intelectual y facilitamos la transferencia de tecnología al entorno empresarial.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    link: "#transferencia",
    icon: (
      <svg
        className="shrink-0 mt-1 size-6 md:size-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    id: "incubadora",
    title: "Dirección de Incubadora de Empresas",
    badge: "Startups",
    stats: "30+ startups incubadas",
    description:
      "Impulsamos startups y emprendimientos de base tecnológica con mentoría especializada y acompañamiento estratégico.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    link: "#incubadora",
    icon: (
      <svg
        className="shrink-0 mt-1 size-6 md:size-7"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-3.05 11a22.35 22.35 0 0 1-3.95 2z" />
      </svg>
    ),
  },
];

export default function FeaturesPreline() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div
            className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div
              className="max-w-3xl mx-auto text-left mb-4 lg:mb-8"
              data-aos="fade-up"
            >
              <p className="text-xs font-bold tracking-widest text-brand-primary uppercase mb-2 sm:mb-3">
                Nuestras oficinas
              </p>
              <p className="hidden sm:block text-base sm:text-xl font-semibold text-slate-800 leading-snug sm:leading-relaxed tracking-tight">
                Conoce nuestras dependencias encargadas de impulsar la ciencia,
                la innovación y la transferencia tecnológica.
              </p>
            </div>
            <nav
              className="grid gap-3 mt-5 md:mt-8"
              aria-label="Tabs"
              role="tablist"
              aria-orientation="vertical"
            >
              {offices.map((office, idx) => {
                const isActive = activeTab === idx;
                return (
                  <button
                    key={office.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`text-start p-4 md:p-5 rounded-xl outline-none cursor-pointer ${
                      isActive
                        ? "bg-white shadow-md border-transparent text-slate-900"
                        : "hover:bg-slate-200/60 text-slate-700"
                    }`}
                    role="tab"
                    aria-selected={isActive}
                  >
                    <span className="flex items-center md:items-start gap-x-2.5 sm:gap-x-4 md:gap-x-6">
                      <span
                        className={`shrink-0 text-lg sm:text-xl md:text-2xl ${
                          isActive ? "text-brand-primary" : "text-slate-500"
                        }`}
                      >
                        {office.icon}
                      </span>
                      <span className="grow">
                        <span
                          className={`block text-xs sm:text-sm md:text-lg font-semibold ${
                            isActive ? "text-brand-primary" : "text-slate-800"
                          }`}
                        >
                          {office.title}
                        </span>
                        <span className="hidden md:block mt-1 text-sm text-slate-600 leading-relaxed">
                          {office.description}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div
            className="lg:col-span-6 lg:order-1"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="relative">
              <div className="relative min-h-[380px] sm:min-h-[480px]">
                {offices.map((office, idx) => {
                  const isActive = activeTab === idx;
                  return (
                    <div
                      key={office.id}
                      className={`overflow-hidden rounded-xl shadow-xl transition-all duration-500 ease-in-out ${
                        isActive
                          ? "opacity-100 relative z-10 pointer-events-auto"
                          : "opacity-0 absolute inset-0 z-0 pointer-events-none"
                      }`}
                      role="tabpanel"
                    >
                      <img
                        className="w-full h-[380px] sm:h-[480px] object-cover rounded-xl"
                        src={office.image}
                        alt={office.title}
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/90 backdrop-blur-md text-brand-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                          {office.badge}
                        </span>
                        <span className="bg-slate-900/80 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                          {office.stats}
                        </span>
                      </div>

                      <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                        <a
                          href={office.link}
                          className="inline-flex items-center gap-x-2 px-4 py-2.5 bg-brand-primary text-white text-sm font-semibold rounded-lg shadow"
                        >
                          <span>Ir a esta sección</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-slate-100 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full"></div>
        </div>
      </div>
    </div>
  );
}
