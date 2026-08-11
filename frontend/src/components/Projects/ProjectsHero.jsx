import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";

export default function ProjectsHero({
  title,
  selectedYear,
  availableYears,
  onYearChange,
}) {
  return (
    <div className="py-6 sm:py-8 border-b border-slate-200/80 mb-8 sm:mb-10">
      <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-center">
        <div
          className="lg:col-span-7 space-y-2 text-left"
          data-aos="fade-up"
        >
          <SectionLabel>PROGRAMA INSTITUCIONAL DE INVESTIGACIÓN</SectionLabel>

          <SectionTitle>
            Proyectos de Investigación Básica y Aplicada
          </SectionTitle>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Explora los proyectos financiados, sus resoluciones oficiales,
            investigadores principales y líneas de desarrollo científico.
          </p>
        </div>

        <div
          className="lg:col-span-5 flex justify-start lg:justify-end"
          data-aos="fade"
        >
          <div className="w-fit bg-white/90 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-slate-200/90 shadow-sm flex flex-col items-start lg:items-end gap-1.5 sm:gap-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">
              Seleccionar Convocatoria
            </span>

            <div className="inline-flex p-1 rounded-full bg-slate-100/80 border border-slate-200/80 gap-1">
              {availableYears.map((year) => {
                const isSelected = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={`px-3.5 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isSelected
                        ? "bg-brand-primary text-white"
                        : "text-slate-600 hover:text-brand-primary hover:bg-white/70"
                    }`}
                  >
                    {year}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
