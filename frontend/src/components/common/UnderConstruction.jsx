import { NavLink } from "react-router-dom";
import { Hammer, Sparkles, ArrowLeft } from "lucide-react";
import SectionContainer from "./SectionContainer";

export default function UnderConstruction({ title = "Sección en desarrollo" }) {
  return (
    <SectionContainer
      isSinglePage
      className="flex items-center justify-center pt-28 md:pt-36 pb-16"
      dataAos="fade-up"
    >
      <div className="max-w-md w-full mx-auto text-center flex flex-col items-center">
        <div className="relative mb-6">
          <div className="size-24 md:size-28 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-inner">
            <Hammer className="size-10 md:size-12 animate-bounce transition-all duration-700" />
          </div>
          <span className="absolute -top-1 -right-1 p-2 bg-white rounded-full shadow-md text-amber-500">
            <Sparkles className="size-5" />
          </span>
        </div>

        <span className="inline-block bg-brand-primary/10 text-brand-primary text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
          Próximamente
        </span>

        <h1 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">
          {title}
        </h1>
        <p className="text-sm md:text-base text-slate-600 leading-relaxed mb-6 max-w-sm">
          Estamos preparando el contenido de esta sección para brindarte la
          mejor experiencia. Estará disponible muy pronto.
        </p>

        <NavLink
          to="/"
          className="inline-flex items-center gap-x-2 py-2.5 px-5 bg-brand-primary text-white text-sm font-medium rounded-full hover:bg-brand-hover transition-colors shadow-sm"
        >
          <ArrowLeft className="size-4" />
          Volver al inicio
        </NavLink>
      </div>
    </SectionContainer>
  );
}
