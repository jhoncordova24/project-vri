import { Target, Compass, CheckCircle2 } from "lucide-react";
import AmbientSection from "../common/AmbientSection";

const STATEMENTS = [
  {
    id: "mission",
    label: "Misión",
    icon: Target,
    title: "Excelencia científica y transferencia tecnológica",
    description:
      "Gestionar la investigación con altos estándares de calidad y ética, conectando el conocimiento con el desarrollo social y productivo.",
    highlights: [
      "Proyectos I+D+i de impacto",
      "Semilleros de investigación",
      "Publicaciones indexadas",
    ],
  },
  {
    id: "vision",
    label: "Visión",
    icon: Compass,
    title: "Liderazgo e innovación con proyección global",
    description:
      "Ser un vicerrectorado referente por su producción científica, generación de patentes y vinculación estratégica internacional.",
    highlights: [
      "Referente en ciencia e innovación",
      "Ecosistema de patentes",
      "Alianzas internacionales",
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
