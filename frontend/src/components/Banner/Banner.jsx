import { useState } from "react";

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
      budget: "S/ 850,000",
      deadline: "En curso",
      features: [
        "Investigación básica",
        "Investigación aplicada",
        "Proyectos interdisciplinarios",
      ],
    },
    {
      year: "2024",
      status: "Finalizado",
      projects: 15,
      budget: "S/ 920,000",
      deadline: "Finalizado",
      features: [
        "Investigación básica",
        "Investigación aplicada",
        "Transferencia tecnológica",
      ],
    },
  ],
};

export default function Banner() {
  const [selectedYearIndex, setSelectedYearIndex] = useState(0);
  const currentCall = bannerData.years[selectedYearIndex];

  return (
    <section className="relative w-full bg-gradient-to-br from-slate-100/90 via-blue-50/30 to-white py-16 lg:py-20 text-slate-800 overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

      <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-slate-200/40 rounded-full blur-2xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <div
            className="lg:col-span-7 space-y-6 text-left"
            data-aos="fade-right"
            data-aos-duration="600"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold tracking-widest text-blue-900 uppercase">
                CONVOCATORIAS INSTITUCIONALES
              </span>

              <div className="inline-flex bg-white p-1 rounded-full border border-slate-200 shadow-sm ml-auto sm:ml-0">
                {bannerData.years.map((yearData, idx) => (
                  <button
                    key={yearData.year}
                    onClick={() => setSelectedYearIndex(idx)}
                    className={`px-4 py-1 rounded-full text-xs font-bold transition-all duration-300 ${
                      selectedYearIndex === idx
                        ? "bg-blue-900 text-white shadow-sm"
                        : "text-slate-500 hover:text-blue-900"
                    }`}
                  >
                    {yearData.year}
                  </button>
                ))}
              </div>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              {bannerData.title}
            </h2>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal max-w-2xl">
              {bannerData.description}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-blue-900 hover:bg-blue-800 text-white font-medium text-sm transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <span>Ver proyectos {currentCall.year}</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
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
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-blue-900 leading-none">
                    {currentCall.year}
                  </span>
                  <div className="flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200/60">
                    <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                      {currentCall.deadline}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-900">
                  {currentCall.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900">
                    {currentCall.budget}
                  </div>
                  <div className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                    Presupuesto
                  </div>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-blue-900">
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
