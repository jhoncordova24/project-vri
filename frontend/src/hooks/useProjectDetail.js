import { useState, useEffect } from "react";
import { getProjectById } from "../services/projectsService";

/**
 * Custom hook to fetch a single project's details by ID
 */
export const useProjectDetail = (id) => {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setError("No se pudo cargar la información del proyecto.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProjectData();
  }, [id]);

  return { project, loading, error };
};
