import React from "react";
import {
  Cpu,
  HandCoins,
  FileCode2,
  Users2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

const PILLARS = [
  {
    icon: Cpu,
    title: "Innovación y Desarrollo",
    description:
      "Impulso a proyectos de I+D+i enfocados en solucionar desafíos regionales.",
  },
  {
    icon: HandCoins,
    title: "Fondos Concursables",
    description:
      "Financiamiento y convocatorias para docentes y semilleros de investigación.",
  },
  {
    icon: FileCode2,
    title: "Propiedad Intelectual",
    description:
      "Gestión de patentes, derechos de autor y transferencia tecnológica directa.",
  },
  {
    icon: Users2,
    title: "Comunidad Científica",
    description:
      "Formación de investigadores éticos y redes de cooperación internacional.",
  },
];

export default function Identity() {
  return (
    <section className="relative w-full py-16 sm:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div
            className="lg:col-span-5 flex flex-col justify-between space-y-8"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-easing="ease-out-cubic"
          >
            <div className="space-y-4">
              <SectionLabel>IDENTIDAD INSTITUCIONAL</SectionLabel>
              <SectionTitle>
                Una visión compartida, excelencia científica y compromiso con el
                impacto real
              </SectionTitle>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed pt-2">
                El Vicerrectorado de Investigación (VRI) es el órgano de más
                alto nivel encargado de planificar, dirigir, coordinar y
                ejecutar la política general de investigación institucional.
                Fomentamos la innovación tecnológica y la transferencia del
                conocimiento hacia la sociedad.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2 text-slate-700">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                  Ley Universitaria N° 30220
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-brand-primary shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-slate-800 leading-tight">
                  Fomento a la Innovación I+D+i
                </span>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-7 flex flex-col space-y-8"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="150"
            data-aos-easing="ease-out-cubic"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
              {PILLARS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-xl bg-brand-icon-bg text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm sm:text-base font-semibold text-slate-900 group-hover:text-brand-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="relative w-full h-48 sm:h-56 rounded-2xl overflow-hidden border border-slate-200/80 group">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200"
                alt="Comunidad Universitaria de Investigación"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-5 right-5">
                <span className="text-white/80 text-[11px] font-bold uppercase tracking-wider block">
                  Comunidad Universitaria
                </span>
                <p className="text-white text-xs sm:text-sm font-medium leading-snug">
                  Investigación rigurosa con vocación humanística y social.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
