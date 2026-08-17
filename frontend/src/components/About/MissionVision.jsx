import React from "react";
import { Target, Compass, CheckCircle2 } from "lucide-react";

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
    <section className="relative w-full bg-white text-slate-800 overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/80 via-blue-50/40 to-white pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl pointer-events-none z-0" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl pointer-events-none z-0" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-blue-100 min-h-0 md:min-h-[500px]">
        {STATEMENTS.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="group flex flex-col justify-between p-5 sm:p-8 md:p-12 lg:p-16 xl:p-20 transition-colors duration-500 hover:bg-blue-50/30"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay={index * 150}
              data-aos-easing="ease-out-cubic"
            >
              <div className="space-y-3 sm:space-y-6">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[1.8]" />
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-widest uppercase text-brand-primary">
                    {item.label}
                  </span>
                </div>

                <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-slate-900 leading-snug sm:leading-tight group-hover:text-brand-primary transition-colors duration-300">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>

              <div className="pt-4 mt-5 sm:pt-8 sm:mt-8 border-t border-blue-100 space-y-2 sm:space-y-3">
                {item.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-2 sm:gap-3">
                    <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand-primary" />
                    </div>
                    <span className="text-xs sm:text-sm lg:text-base text-slate-700 font-medium leading-tight">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
