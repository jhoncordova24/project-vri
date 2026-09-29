import { useState, useEffect } from "react";
import { getLatestNews } from "../../services/newsService";

export const useLatestNews = (limit = 3) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getLatestNews(limit);
        if (isMounted) setNews(data);
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al cargar las últimas noticias");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, [limit]);

  return { news, loading, error };
};
