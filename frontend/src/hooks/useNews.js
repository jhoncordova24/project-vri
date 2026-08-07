import { useState, useEffect } from "react";
import { getLatestNews, getNews } from "../services/newsService";

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

export const useNews = ({
  initialPage = 1,
  pageSize = 6,
  search = "",
} = {}) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchNewsData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getNews({ page: initialPage, pageSize, search });

        if (isMounted) {
          setNews(result.data);
          setTotalPages(result.totalPages);
          setTotalCount(result.totalCount);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al cargar las noticias");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchNewsData();
    }, 300);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [initialPage, pageSize, search]);

  return { news, loading, error, totalPages, totalCount };
};
