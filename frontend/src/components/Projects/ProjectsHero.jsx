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
        <div className="lg:col-span-7 space-y-2 text-left" data-aos="fade-up">
          <SectionLabel>PROGRAMA INSTITUCIONAL</SectionLabel>

          <SectionTitle>
            Proyectos de Investigación Básica y Aplicada
          </SectionTitle>

          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Consulta resoluciones, bases, presupuestos e investigadores
            principales por año académico.
          </p>
        </div>

        <div
          className="lg:col-span-5 flex justify-start lg:justify-end"
          data-aos="fade"
        >
          <div className="w-fit bg-white/90 backdrop-blur-md p-1.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-sm flex items-center gap-2 sm:gap-4">
            <span className="hidden sm:inline-block text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
              Seleccionar Convocatoria
            </span>

            <div className="inline-flex p-0.5 sm:p-1 rounded-lg sm:rounded-full bg-slate-100/80 border border-slate-200/80 gap-0.5 sm:gap-1">
              {availableYears.map((year) => {
                const isSelected = selectedYear === year;
                return (
                  <button
                    key={year}
                    onClick={() => onYearChange(year)}
                    className={`px-2.5 sm:px-5 py-1 sm:py-1.5 rounded-md sm:rounded-full text-[11px] sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      isSelected
                        ? "bg-brand-primary text-white shadow-xs"
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
