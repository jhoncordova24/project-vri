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
import identityImg from "../../assets/about/identity.webp";

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-8">
        <div
          className="max-w-3xl space-y-4"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-out-cubic"
        >
          <SectionLabel>IDENTIDAD INSTITUCIONAL</SectionLabel>
          <SectionTitle>
            Una visión compartida, excelencia científica y compromiso con el
            impacto real
          </SectionTitle>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <div
            className="lg:col-span-5 space-y-6"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="100"
            data-aos-easing="ease-out-cubic"
          >
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              El Vicerrectorado de Investigación (VRI) es el órgano de más alto
              nivel encargado de planificar, dirigir, coordinar y ejecutar la
              política general de investigación institucional. Fomentamos la
              innovación tecnológica y la transferencia del conocimiento hacia
              la sociedad.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-slate-700">
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
            className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-delay="200"
            data-aos-easing="ease-out-cubic"
          >
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
        </div>

        <div
          className="relative w-full h-64 sm:h-80 lg:h-96 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200/80 group mt-7"
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-delay="300"
          data-aos-easing="ease-out-cubic"
        >
          <img
            src={identityImg}
            alt="Comunidad Universitaria de Investigación"
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
            <span className="text-white/80 text-xs font-bold uppercase tracking-wider block mb-1">
              Comunidad Universitaria
            </span>
            <p className="text-white text-sm sm:text-base font-medium max-w-xl leading-snug">
              Investigación rigurosa con vocación humanística, científica y
              compromiso social.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
