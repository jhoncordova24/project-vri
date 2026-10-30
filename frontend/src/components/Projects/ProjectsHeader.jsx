import {
  FileText,
  Award,
  DollarSign,
  Wallet,
  ExternalLink,
} from "lucide-react";
import SectionContainer from "../common/SectionContainer";

const DOC_CONFIG = [
  {
    key: "reglamento",
    label: "Reglamento",
    resKey: "reglamento_resolucion",
    urlKey: "reglamento_pdf_url",
    icon: FileText,
  },
  {
    key: "bases",
    label: "Bases de Concurso",
    resKey: "bases_resolucion",
    urlKey: "bases_pdf_url",
    icon: FileText,
  },
  {
    key: "ganadores",
    label: "Proyectos Ganadores",
    resKey: "ganadores_resolucion",
    urlKey: "ganadores_pdf_url",
    icon: Award,
  },
  {
    key: "presupuesto",
    label: "Presupuesto",
    resKey: "presupuesto_resolucion",
    urlKey: "presupuesto_pdf_url",
    icon: DollarSign,
  },
  {
    key: "fuente",
    label: "Fuente Financiamiento",
    resKey: "fuente_financiamiento",
    urlKey: null,
    icon: Wallet,
  },
];

export default function ProjectsHeader({
  selectedYear,
  availableYears = [],
  onYearChange,
  convocationData,
  isLoading,
}) {
  return (
    <SectionContainer
      label="PROGRAMA INSTITUCIONAL"
      title="Proyectos de Investigación Básica y Aplicada"
      description="Consulta resoluciones, bases, presupuestos e investigadores principales por año académico."
      className="border-b border-slate-200/80"
      action={
        <div className="w-fit self-start md:self-auto bg-white/90 backdrop-blur-md px-3 py-1.5 sm:px-5 sm:py-3 rounded-xl sm:rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-2 sm:gap-4">
          <span className="inline-block text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
            Seleccionar Convocatoria
          </span>

          <div className="inline-flex p-0.5 sm:p-1 rounded-lg sm:rounded-full bg-slate-100/80 border border-slate-200/80 gap-0.5 sm:gap-1">
            {availableYears.map((year) => {
              const isSelected = selectedYear === year;
              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => onYearChange(year)}
                  className={`px-2.5 sm:px-5 py-1 sm:py-1.5 rounded-md sm:rounded-full text-[11px] sm:text-sm font-bold whitespace-nowrap transition-all duration-300 cursor-pointer ${
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
      }
    >
      {isLoading ? (
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          {DOC_CONFIG.map((item) => (
            <div
              key={item.key}
              className="relative overflow-hidden h-full bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between animate-pulse"
            >
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-slate-200" />
                <div className="w-3.5 h-3.5 rounded-md bg-slate-200" />
              </div>

              <div>
                <div className="h-2.5 bg-slate-200 rounded-sm w-20 mb-2" />
                <div className="h-4 bg-slate-200 rounded-sm w-4/5" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-200" />
            </div>
          ))}
        </div>
      ) : (
        convocationData && (
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
            {DOC_CONFIG.map((item) => {
              const Icon = item.icon;
              const resolution = convocationData[item.resKey] || "-";
              const url = item.urlKey ? convocationData[item.urlKey] : null;

              const Wrapper = url ? "a" : "div";
              const wrapperProps = url
                ? {
                    href: url,
                    target: "_blank",
                    rel: "noreferrer",
                    className:
                      "block h-full group cursor-pointer md:hover:-translate-y-0.5 transition-transform duration-200",
                  }
                : { className: "h-full cursor-default" };

              return (
                <Wrapper key={item.key} {...wrapperProps}>
                  <div
                    className={`relative overflow-hidden h-full bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between transform-gpu ${
                      url
                        ? "md:group-hover:shadow-md md:group-hover:border-brand-primary/40 transition-all duration-200"
                        : ""
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center bg-blue-50 text-brand-primary ${
                          url
                            ? "md:group-hover:bg-brand-primary md:group-hover:text-white transition-colors duration-150"
                            : ""
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>

                      {url && (
                        <ExternalLink className="w-3.5 h-3.5 text-slate-400 md:group-hover:text-brand-primary transition-colors duration-150" />
                      )}
                    </div>

                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                        {item.label}
                      </span>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2 leading-snug">
                        {resolution}
                      </p>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-hover" />
                  </div>
                </Wrapper>
              );
            })}
          </div>
        )
      )}
    </SectionContainer>
  );
}
