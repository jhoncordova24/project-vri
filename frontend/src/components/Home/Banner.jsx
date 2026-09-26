import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import { useState } from "react";
import { TrendingUp, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import AmbientSection from "../common/AmbientSection";

const bannerData = {
  title: "Gestión de proyectos de investigación básica y aplicada",
  subtitle: "NUESTRO COMPROMISO",
  description:
    "Programa institucional para financiar iniciativas alineadas a las prioridades de investigación de la UNP.",

  years: [
    {
      year: "2025",
      status: "En ejecución",
      projects: 13,
      budget: "S/ 2,363,367.84",
      progress: 0,
      progressLabel: "Avance de ejecución presupuestal",
    },
    {
      year: "2024",
      status: "En ejecución",
      projects: 15,
      budget: "S/ 2,084,580.20",
      progress: 80,
      progressLabel: "Avance de ejecución presupuestal",
    },
  ],
};

export default function Banner() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const currentCall = bannerData.years[selectedYearIndex];

  return (
    <AmbientSection className="py-16 sm:py-20 lg:py-24 text-slate-800">
      <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-center">
        <div
          data-aos="fade-up"
          className="lg:col-span-7 space-y-4 sm:space-y-6 text-left pr-0 lg:pr-4"
        >
          <div className="flex items-center justify-between gap-4">
            <SectionLabel>CONVOCATORIAS INTERNAS</SectionLabel>

            <div className="hidden sm:inline-flex p-1 rounded-full border border-slate-200 bg-white/80 shadow-sm backdrop-blur-sm">
              {bannerData.years.map((yearData, idx) => (
                <button
                  key={yearData.year}
                  onClick={() => setSelectedYearIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
                    selectedYearIndex === idx
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-600 hover:text-brand-primary"
                  }`}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
          </div>

          <SectionTitle>{bannerData.title}</SectionTitle>

          <p className="text-slate-600 text-sm sm:text-lg leading-relaxed font-normal max-w-2xl">
            {bannerData.description}
          </p>

          <div className="pt-2 sm:pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="inline-flex sm:hidden bg-slate-200/60 p-1 rounded-full border border-slate-300/70">
              {bannerData.years.map((yearData, idx) => (
                <button
                  key={yearData.year}
                  onClick={() => setSelectedYearIndex(idx)}
                  className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all duration-300 ${
                    selectedYearIndex === idx
                      ? "bg-brand-primary text-white shadow-sm"
                      : "text-slate-600 hover:text-brand-primary"
                  }`}
                >
                  {yearData.year}
                </button>
              ))}
            </div>
            <Button to={`/proyectos/${currentCall.year}`} icon={ArrowRight}>
              Ver proyectos {currentCall.year}
            </Button>
          </div>
        </div>

        <div data-aos="fade-up" data-aos-delay="150" className="lg:col-span-5">
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-xl space-y-5 sm:space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                  Concurso
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-brand-primary leading-none">
                  {currentCall.year}
                </h3>
              </div>

              <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-icon-bg text-brand-primary">
                {currentCall.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-3 overflow-hidden">
              <div className="min-w-0 flex-1">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-800 tracking-tight truncate">
                  {currentCall.budget}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  Presupuesto
                </div>
              </div>

              <div className="text-right shrink-0">
                <div className="text-xl sm:text-2xl font-extrabold text-slate-800">
                  {currentCall.projects}
                </div>
                <div className="text-[10px] sm:text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                  Proyectos
                </div>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-primary" />
                  {currentCall.progressLabel}
                </span>
                <span className="font-extrabold text-brand-primary text-sm">
                  {currentCall.progress}%
                </span>
              </div>

              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/60">
                <div
                  className="h-full bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${currentCall.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <p
        data-aos="fade-up"
        data-aos-delay="200"
        className="mt-10 sm:mt-12 text-center text-slate-400 text-xs"
      >
        * Programas sujetos a disponibilidad presupuestal y evaluación de
        calidad institucional (UNP).
      </p>
    </AmbientSection>
  );
}
