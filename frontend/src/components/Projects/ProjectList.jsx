import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  User,
  Layers,
  CheckCircle2,
  Clock,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function ProjectList({ projects = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const normalizedProjects = useMemo(() => {
    return projects.map((project) => {
      const principal =
        project.investigadorPrincipal?.nombres_apellidos ||
        project.proyecto_investigadores?.find(
          (pi) => pi.rol === "Investigador Principal",
        )?.investigadores?.nombres_apellidos ||
        "No asignado";

      const gestor =
        project.gestor?.nombres_apellidos ||
        project.gestores?.nombres_apellidos ||
        null;

      return {
        ...project,
        investigadorPrincipalNombre: principal,
        gestorNombre: gestor,
      };
    });
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();

    const filtered = !term
      ? normalizedProjects
      : normalizedProjects.filter(
          (p) =>
            p.titulo?.toLowerCase().includes(term) ||
            p.investigadorPrincipalNombre.toLowerCase().includes(term) ||
            p.gestorNombre?.toLowerCase().includes(term) ||
            p.linea_investigacion?.toLowerCase().includes(term),
        );

    return [...filtered].sort((a, b) =>
      a.titulo.localeCompare(b.titulo, "es", { sensitivity: "base" }),
    );
  }, [normalizedProjects, searchTerm]);

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
              placeholder="Buscar por título, investigador, gestor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary transition-all shadow-2xs"
            />
          </div>
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="text-center py-16 bg-white/60 rounded-2xl border border-dashed border-slate-200">
          <p className="text-sm text-slate-500 font-medium">
            No se encontraron proyectos coincidentes con tu búsqueda.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {filteredProjects.map((project, index) => (
            <Link
              key={project.id}
              to={`/proyectos/detalle/${project.id}`}
              className="group block bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/90 border-l-4 border-l-brand-primary shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col justify-between gap-3">
                <div className="flex items-start justify-between gap-3.5 min-w-0 w-full">
                  <div className="flex items-start gap-3.5 min-w-0 flex-1">
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-slate-100 text-brand-dark font-black text-xs flex items-center justify-center border border-slate-200/80 group-hover:bg-brand-primary group-hover:text-white transition-colors duration-300 mt-0.5">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="text-xs sm:text-sm font-semibold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors duration-200 flex-1">
                      {project.titulo}
                    </h3>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all duration-200 shrink-0 mt-1" />
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2.5 pt-2 border-t border-slate-100 text-xs">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 min-w-0">
                    <div className="flex items-center gap-1.5 truncate max-w-full">
                      <User className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="text-brand-primary font-semibold shrink-0">
                        Investigador principal:
                      </span>
                      <span className="font-semibold text-slate-800 truncate">
                        {project.investigadorPrincipalNombre}
                      </span>
                    </div>

                    {project.gestorNombre && (
                      <div className="flex items-center gap-1.5 truncate max-w-full text-slate-500 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="text-slate-400 font-normal shrink-0">
                          Gestionado por:
                        </span>
                        <span className="text-slate-600 font-normal truncate">
                          {project.gestorNombre}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-start md:self-auto max-w-full">
                    {project.linea_investigacion && (
                      <span
                        title={project.linea_investigacion}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-50/80 text-indigo-900 font-bold text-[11px] border border-indigo-100 shadow-2xs max-w-[180px] sm:max-w-[280px] md:max-w-xs truncate"
                      >
                        <Layers className="w-3 h-3 text-indigo-500 shrink-0" />
                        <span className="truncate">
                          {project.linea_investigacion}
                        </span>
                      </span>
                    )}

                    {project.culminado ? (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-700 border border-slate-200/80 shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-500" />
                        Culminado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/80 shadow-2xs shrink-0">
                        <Clock className="w-3.5 h-3.5 text-emerald-600" />
                        En Ejecución
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
