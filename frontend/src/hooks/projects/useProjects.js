import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProjectsByYear } from "../../services/projectsService";

// Lista declarativa centralizada: cuando toque 2026, solo agregas el número aquí
export const AVAILABLE_YEARS = [2025, 2024];
export const DEFAULT_YEAR = AVAILABLE_YEARS[0];

export function useProjects(defaultYear = DEFAULT_YEAR) {
  const { year } = useParams();
  const navigate = useNavigate();

  const parsedYear = Number(year);
  const selectedYear = AVAILABLE_YEARS.includes(parsedYear)
    ? parsedYear
    : defaultYear;

  const [convocationData, setConvocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadConvocationData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getProjectsByYear(selectedYear);
        if (isMounted) {
          setConvocationData(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(`No se pudo cargar la información del año ${selectedYear}`);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadConvocationData();

    return () => {
      isMounted = false;
    };
  }, [selectedYear]);

  const handleYearChange = (newYear) => {
    if (newYear !== selectedYear) {
      navigate(`/proyectos/${newYear}`, { preventScrollReset: true });
    }
  };

  const projects = useMemo(() => {
    if (!convocationData?.proyectos) return [];

    return convocationData.proyectos.map((proyecto) => {
      const principalRelation = proyecto.proyecto_investigadores?.find(
        (pi) => pi.rol === "Investigador Principal",
      );

      return {
        ...proyecto,
        gestor: proyecto.gestores || null,
        investigadorPrincipal: principalRelation?.investigadores || null,
      };
    });
  }, [convocationData]);

  return {
    selectedYear,
    setSelectedYear: handleYearChange,
    availableYears: AVAILABLE_YEARS,
    convocationData,
    projects, 
    loading,
    error,
  };
}
