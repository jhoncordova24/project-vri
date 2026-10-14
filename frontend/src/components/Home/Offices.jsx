import { useState } from "react";
import { Microscope, Compass, Lightbulb, Rocket } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

import investigacionImg from "../../assets/offices/investigacion.webp";
import bienesImg from "../../assets/offices/bienes.webp";
import incubadoraImg from "../../assets/offices/incubadora.webp";

const OFFICES = [
  {
    id: "investigacion",
    title: "Dirección de Investigación",
    badge: "Investigación",
    stats: "25+ proyectos activos",
    description:
      "Gestionamos y respaldamos proyectos de investigación básica y aplicada, velando por la integridad académica y la producción científica universitaria.",
    image: investigacionImg,
    link: "#investigacion",
    icon: Microscope,
  },
  {
    id: "incubadora",
    title: "Dirección de Incubadora de Empresas (Nexora)",
    badge: "Emprendimiento",
    stats: "70+ equipos capacitados",
    description:
      "Impulsamos startups y emprendimientos de base tecnológica con mentoría especializada y acompañamiento estratégico.",
    image: incubadoraImg,
    link: "#incubadora",
    icon: Rocket,
  },
  {
    id: "transferencia",
    title: "Dirección de Innovación y Transferencia Tecnológica",
    badge: "Innovación",
    stats: "10+ semilleros activos",
    description:
      "Fomentamos la formación científica temprana y fortalecemos la articulación de capacidades tecnológicas con el entorno.",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&q=80&w=800",
    link: "#transferencia",
    icon: Lightbulb,
  },
  {
    id: "servicios",
    title: "Dirección de Producción de Bienes y Servicios",
    badge: "Paleontología",
    stats: "Instituto de Paleontología",
    description:
      "Articulamos las unidades productivas universitarias y la puesta en valor del patrimonio científico a través del Instituto de Paleontología.",
    image: bienesImg,
    link: "#servicios",
    icon: Compass,
  },
];

export default function FeaturesPreline() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-12 mx-auto">
      <div className="relative p-6 md:p-16">
        <div className="relative z-10 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-center">
          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="mb-10 lg:mb-0 lg:col-span-6 lg:col-start-7 lg:order-2"
          >
            <div className="max-w-3xl mx-auto text-left mb-4 lg:mb-8">
              <SectionLabel>Nuestras oficinas</SectionLabel>
              <SectionTitle>Conoce nuestras dependencias</SectionTitle>
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

          <div data-aos="fade-up" className="lg:col-span-6 lg:order-1">
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
                      className={`group overflow-hidden rounded-xl shadow-xl transition-all duration-500 ease-in-out ${
                        isActive
                          ? "opacity-100 relative z-10 pointer-events-auto"
                          : "opacity-0 absolute inset-0 z-0 pointer-events-none"
                      }`}
                    >
                      <img
                        className="w-full h-auto aspect-[4/3] sm:aspect-auto sm:h-[480px] object-contain sm:object-cover object-center rounded-xl transition-transform duration-700 ease-out group-hover:scale-105 will-change-transform"
                        src={office.image}
                        alt={office.title}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent transition-opacity duration-500 group-hover:from-slate-950/90" />

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
          <div className="col-span-full lg:col-span-7 lg:col-start-6 bg-brand-primary/7 w-full h-5/6 rounded-xl sm:h-3/4 lg:h-full" />
        </div>
      </div>
    </section>
  );
}
