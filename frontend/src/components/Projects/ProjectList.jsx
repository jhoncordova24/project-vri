import { useState, useMemo } from "react";
import {
  Search,
  User,
  Sparkles,
  CheckCircle2,
  Clock,
  LayoutGrid,
  List,
} from "lucide-react";

export default function ProjectList({ projects = [] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("list");

  const filteredProjects = useMemo(() => {
    if (!searchTerm.trim()) return projects;
    const term = searchTerm.toLowerCase();
    return projects.filter(
      (p) =>
        p.titulo.toLowerCase().includes(term) ||
        p.investigador_principal.toLowerCase().includes(term) ||
        p.linea_investigacion?.toLowerCase().includes(term),
    );
  }, [projects, searchTerm]);

  return (
    <section className="space-y-6" data-aos="fade-up">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark tracking-tight">
            Proyectos Aprobados
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
            Mostrando {filteredProjects.length} de {projects.length} registros
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por título, investigador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-2xs"
            />
          </div>

          <div className="hidden sm:inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200/80 shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                viewMode === "grid"
                  ? "bg-white text-brand-primary shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Vista en Grid"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg transition-all duration-200 ${
                viewMode === "list"
                  ? "bg-white text-brand-primary shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              title="Vista en Lista"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            No se encontraron proyectos coincidentes con tu búsqueda.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl p-5 border border-slate-200/90 border-l-4 border-l-brand-primary shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between space-y-4 h-full"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-brand-dark font-black text-xs flex items-center justify-center border border-slate-200/80 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300">
                    {project.numero || "00"}
                  </span>

                  <div>
                    {project.culminado ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                        Culminado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        En Ejecución
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="text-sm sm:text-base font-bold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors duration-200">
                  {project.titulo}
                </h3>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-600 truncate min-w-0 flex-1">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {project.investigador_principal}
                  </span>
                </div>

                {project.linea_investigacion && (
                  <span className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50/80 text-indigo-900 font-bold text-[11px] border border-indigo-100 shadow-2xs max-w-[50%] truncate">
                    <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                    <span className="truncate">
                      {project.linea_investigacion}
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 border-l-4 border-l-brand-primary shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between gap-3"
            >
              {/* Fila superior: Número + Título completo sin comprimir */}
              <div className="flex items-start gap-3.5 min-w-0 w-full">
                <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-brand-dark font-black text-xs flex items-center justify-center border border-slate-200/80 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 mt-0.5">
                  {project.numero || "00"}
                </span>

                <h3 className="text-xs sm:text-sm font-bold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors duration-200 flex-1">
                  {project.titulo}
                </h3>
              </div>

              {/* Fila inferior: Autor a la izquierda, badges alineados a la derecha */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
                <div className="flex items-center gap-1.5 font-medium text-slate-600 min-w-0">
                  <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">
                    {project.investigador_principal}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                  {project.linea_investigacion && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50/80 text-indigo-900 font-bold text-[11px] border border-indigo-100 shadow-2xs">
                      <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
                      <span>{project.linea_investigacion}</span>
                    </span>
                  )}

                  {project.culminado ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80">
                      <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                      Culminado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs">
                      <Clock className="w-3.5 h-3.5 text-emerald-600" />
                      En Ejecución
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
