import SectionLabel from "../common/SectionLabel";
import { useState } from "react";
import { Microscope, Wrench, Lightbulb, Rocket } from "lucide-react";
import Button from "../common/Button";

const OFFICES = [
  {
    id: "investigacion",
    title: "Dirección de Investigación",
    badge: "Investigación",
    stats: "25+ proyectos activos",
    description:
      "Gestionamos y financiamos proyectos científicos de alto impacto para fortalecer la producción intelectual universitaria.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    link: "#investigacion",
    icon: Microscope,
  },
  {
    id: "servicios",
    title: "Dirección de Producción de Bienes y Servicios",
    badge: "Servicios",
    stats: "12+ servicios prestados",
    description:
      "Conectamos las capacidades técnicas de la universidad con el sector productivo mediante servicios especializados.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    link: "#servicios",
    icon: Wrench,
  },
  {
    id: "transferencia",
    title: "Dirección de Innovación y Transferencia Tecnológica",
    badge: "Patentes",
    stats: "10+ patentes registradas",
    description:
      "Protegemos la propiedad intelectual y facilitamos la transferencia de tecnología al entorno empresarial.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    link: "#transferencia",
    icon: Lightbulb,
  },
  {
    id: "incubadora",
    title: "Dirección de Incubadora de Empresas",
    badge: "Startups",
    stats: "70+ emprendimientos capacitados",
    description:
      "Impulsamos startups y emprendimientos de base tecnológica con mentoría especializada y acompañamiento estratégico.",
    image:
      "https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800",
    link: "#incubadora",
    icon: Rocket,
  },
];

export default function FeaturesPreline() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div
            className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            <div className="max-w-3xl mx-auto text-left mb-4 lg:mb-8">
              <SectionLabel>Nuestras oficinas</SectionLabel>
              <p className="text-sm sm:text-base md:text-base font-medium text-slate-600 leading-normal sm:leading-relaxed tracking-tight">
                Conoce nuestras dependencias encargadas de impulsar la ciencia,
                la innovación y la transferencia tecnológica.
              </p>
            </div>

            <nav
              className="grid gap-3 mt-5 md:mt-8"
              aria-label="Oficinas"
              role="tablist"
              aria-orientation="vertical"
            >
              {OFFICES.map((office, idx) => {
                const isActive = activeTab === idx;
                const IconComponent = office.icon;

                return (
                  <button
                    key={office.id}
                    id={`tab-${office.id}`}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`text-start p-4 md:p-5 rounded-xl outline-none transition-colors duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white shadow-md border-transparent text-slate-900"
                        : "hover:bg-slate-200/60 text-slate-700"
                    }`}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${office.id}`}
                  >
                    <span className="flex items-center md:items-start gap-x-2.5 sm:gap-x-4 md:gap-x-6">
                      <span
                        className={`shrink-0 ${
                          isActive ? "text-brand-primary" : "text-slate-500"
                        }`}
                      >
                        <IconComponent className="shrink-0 mt-1 size-6 md:size-7" />
                      </span>
                      <span className="grow">
                        <span
                          className={`block text-xs sm:text-sm md:text-base font-semibold ${
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
              <div className="relative min-h-[180px] sm:min-h-[480px]">
                {OFFICES.map((office, idx) => {
                  const isActive = activeTab === idx;

                  return (
                    <div
                      key={office.id}
                      id={`panel-${office.id}`}
                      role="tabpanel"
                      aria-labelledby={`tab-${office.id}`}
                      className={`overflow-hidden rounded-xl shadow-xl transition-all duration-500 ease-in-out ${
                        isActive
                          ? "opacity-100 relative z-10 pointer-events-auto"
                          : "opacity-0 absolute inset-0 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        className="w-full h-[240px] sm:h-[480px] object-cover rounded-xl"
                        src={office.image}
                        alt={office.title}
                        loading="lazy"
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
                        <Button href={office.link}>Ir a esta sección</Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 grid grid-cols-12 size-full">
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-brand-primary/10 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full" />
        </div>
      </div>
    </div>
  );
}
