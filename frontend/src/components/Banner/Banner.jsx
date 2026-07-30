import { useState } from "react";
import { ChevronRight } from "lucide-react";

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
      budget: "S/ 1,850,000",
      deadline: "En curso",
      features: [
        "Investigación básica",
        "Investigación aplicada",
        "Proyectos interdisciplinarios",
        "Gestión Sostenible del Ambiente",
        "Economía y Negocios",
        "Educación, Familia y Sociedad",
      ],
    },
    {
      year: "2024",
      status: "En ejecución",
      projects: 15,
      budget: "S/ 2,084,580",
      deadline: "En curso",
      features: [
        "Informática y Telecomunicaciones",
        "Biodiversidad y M. Genético",
        "Salud Pública",
        "Gestión Sostenible del Ambiente",
        "Economía y Negocios",
        "Educación, Familia y Sociedad",
      ],
    },
  ],
};

export default function Banner() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const currentCall = bannerData.years[selectedYearIndex];

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-100/90 via-blue-50/30 to-white py-16 lg:py-20 text-slate-800 overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-slate-200/40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 sm:gap-16 items-center">
          <div
            className="lg:col-span-7 space-y-6 text-left pr-0 lg:pr-4"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-bold tracking-widest text-brand-primary uppercase">
                CONVOCATORIAS INTERNAS
              </span>

              <div className="hidden sm:inline-flex bg-slate-200/60 p-1 rounded-full border border-slate-300/70">
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
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 tracking-tight leading-tight">
              {bannerData.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              {bannerData.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
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

              <a
                href="#"
                className="inline-flex items-center gap-1.5 md:gap-2 px-4 py-2.5 md:px-7 md:py-3.5 rounded-full bg-brand-primary hover:bg-brand-hover text-white font-medium text-xs md:text-sm transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <span>Ver proyectos {currentCall.year}</span>
                <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4 shrink-0" />
              </a>
            </div>
          </div>

          <div
            className="lg:col-span-5"
            data-aos="fade-left"
            data-aos-duration="600"
            data-aos-delay="100"
          >
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                <div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-0.5">
                      Concurso
                    </span>
                    <h3 className="text-3xl font-black text-brand-primary leading-none">
                      {currentCall.year}
                    </h3>
                  </div>
                </div>

                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary">
                  {currentCall.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                    {currentCall.budget}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Presupuesto
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-800">
                    {currentCall.projects}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Proyectos
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              <div>
                <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  Líneas prioritarias
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentCall.features.map((feature, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p
          className="mt-10 text-center text-slate-400 text-xs"
          data-aos="fade-up"
          data-aos-duration="600"
          data-aos-delay="200"
        >
          * Programas sujetos a disponibilidad presupuestal y evaluación de
          calidad institucional (UNP).
        </p>
      </div>
    </section>
  );
}
