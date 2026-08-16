import React from "react";
import ProjectReview from "./ProjectReview";

export default function ProjectDetailContent({ project, loading, error }) {
  if (loading) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center py-16">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-primary"></div>
        <p className="text-xs sm:text-sm text-slate-500 font-medium mt-4">
          Cargando detalles del proyecto...
        </p>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[40vh] flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="bg-red-50 text-red-700 px-4 py-3 rounded-xl border border-red-200 text-sm max-w-md">
          {error || "No se encontró la información del proyecto solicitado."}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50/50">
      <ProjectReview resenia={project.resenia} />

    </div>
  );
}
