import { useState, useEffect } from "react";
import { getLatestNews } from "../services/newsService";

export const useLatestNews = (limit = 3) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const data = await getLatestNews(limit);
        setNews(data);
      } catch (err) {
        setError(err.message || "Error al cargar las noticias");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [limit]);

  return { news, loading, error };
};
