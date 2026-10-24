import { Target, Compass, CheckCircle2 } from "lucide-react";
import AmbientSection from "../common/AmbientSection";

const STATEMENTS = [
  {
    id: "mission",
    label: "Misión",
    icon: Target,
    title: "Excelencia científica, innovación y articulación productiva",
    description:
      "Gestionar y liderar la investigación científica, el desarrollo tecnológico y la incubación de emprendimientos, articulando las unidades productivas y transfiriendo soluciones efectivas a la sociedad.",
    highlights: [
      "Investigación básica y aplicada",
      "Incubación de empresas y startups (Nexora)",
      "Transferencia tecnológica y propiedad intelectual",
      "Unidades productivas y puesta en valor científico",
    ],
  },
  {
    id: "vision",
    label: "Visión",
    icon: Compass,
    title: "Liderazgo en ciencia, emprendimiento e impacto regional",
    description:
      "Ser un vicerrectorado referente nacional e internacional por su sólida producción científica, formación temprana de investigadores y capacidad de generar spin-offs y servicios de alto valor.",
    highlights: [
      "Ecosistema consolidado de innovación y patentes",
      "Redes y alianzas estratégicas globales",
      "Semilleros y formación científica continua",
      "Sostenibilidad a través de bienes y servicios",
    ],
  },
];

export default function MissionVision() {
  return (
    <AmbientSection
      className="text-slate-800 py-12 sm:py-16"
      containerClassName="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100/80 min-h-0 md:min-h-[480px]">
        {STATEMENTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12 transition-colors duration-500 hover:bg-blue-50/30 rounded-2xl"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 150}
              data-aos-easing="ease-out-cubic"
            >
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand-primary text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-brand-primary">
                    {item.label}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug sm:leading-tight group-hover:text-brand-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="pt-5 mt-6 sm:pt-8 sm:mt-8 border-t border-blue-100/80 space-y-2.5 sm:space-y-3">
                {item.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-brand-primary" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base text-slate-700 font-medium leading-normal">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AmbientSection>
  );
}
