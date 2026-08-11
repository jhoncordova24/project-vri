import React from "react";
import { useProjects } from "../hooks/useProjects";

import PageHero from "../components/common/PageHero";
import ProjectsHero from "../components/Projects/ProjectsHero";
import ConvocationDocs from "../components/Projects/ConvocationDocs";
import ProjectList from "../components/Projects/ProjectList";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1920&q=80";

export default function Projects() {
  const {
    selectedYear,
    setSelectedYear,
    availableYears,
    convocationData,
    loading,
    error,
  } = useProjects(2025);

  return (
    <>
      <PageHero
        title="Proyectos de Investigación"
        subtitle="Conoce las iniciativas científicas, tecnológicas y humanísticas financiadas por nuestra institución."
        badge="Vicerrectorado de Investigación"
        imageSrc={DEFAULT_HERO_IMAGE}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <ProjectsHero
          title={convocationData?.titulo}
          selectedYear={selectedYear}
          availableYears={availableYears}
          onYearChange={setSelectedYear}
        />

        {loading && (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-8 h-8 border-3 border-brand-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Cargando información...
            </p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6 text-center text-sm font-medium my-8">
            {error}
          </div>
        )}

        {!loading && !error && convocationData && (
          <>
            <ConvocationDocs data={convocationData} />
            <ProjectList projects={convocationData.proyectos} />
          </>
        )}
      </div>
    </>
  );
}
