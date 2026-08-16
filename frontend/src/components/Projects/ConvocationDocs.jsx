import {
  FileText,
  Award,
  DollarSign,
  Wallet,
  ExternalLink,
} from "lucide-react";

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

export default function ConvocationDocs({ data }) {
  if (!data) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 mb-12 sm:mb-16">
      {DOC_CONFIG.map((item) => {
        const Icon = item.icon;
        const resolution = data[item.resKey] || "-";
        const url = item.urlKey ? data[item.urlKey] : null;

        const CardContent = (
          <div
            className={`relative overflow-hidden h-full bg-white rounded-2xl p-3.5 sm:p-5 border border-slate-200/90 shadow-xs flex flex-col justify-between group transform-gpu ${
              url
                ? "md:hover:shadow-md md:hover:border-brand-primary/40 md:hover:-translate-y-0.5 md:transition-all md:duration-200 cursor-pointer"
                : "cursor-default"
            }`}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div
                className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center ${
                  url
                    ? "bg-blue-50 text-brand-primary md:group-hover:bg-brand-primary md:group-hover:text-white transition-colors duration-150"
                    : "bg-blue-50 text-brand-primary"
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
        );

        return url ? (
          <a
            key={item.key}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="block h-full"
          >
            {CardContent}
          </a>
        ) : (
          <div key={item.key} className="h-full">
            {CardContent}
          </div>
        );
      })}
    </div>
  );
}
