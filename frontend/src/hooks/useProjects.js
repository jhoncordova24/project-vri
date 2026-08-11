import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAvailableYears,
  getProjectsByYear,
} from "../services/projectsService";

export function useProjects(defaultYear = 2025) {
  const { year } = useParams();
  const navigate = useNavigate();

  const selectedYear = year ? Number(year) : defaultYear;

  const [availableYears, setAvailableYears] = useState([]);
  const [convocationData, setConvocationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function loadYears() {
      try {
        const years = await getAvailableYears();
        if (isMounted) {
          setAvailableYears(years);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load available years");
        }
      }
    }

    loadYears();

    return () => {
      isMounted = false;
    };
  }, []);

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
          setError(`Failed to load data for year ${selectedYear}`);
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

  return {
    selectedYear,
    setSelectedYear: handleYearChange,
    availableYears,
    convocationData,
    loading,
    error,
  };
}
