import { useState, useEffect } from "react";
import { getLatestNews, getNews } from "../services/newsService";

/**
 * Custom hook to fetch a limited list of latest news for home/preview sections
 */
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

/**
 * Custom hook to handle paginated news with search and category filter state
 */
export const useNews = ({
  initialPage = 1,
  pageSize = 6,
  search = "",
  category = "Todas",
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
        const result = await getNews({
          page: initialPage,
          pageSize,
          search,
          category,
        });

        if (isMounted) {
          setNews(result.data || []);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.totalCount || 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al cargar las noticias");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNewsData();

    return () => {
      isMounted = false;
    };
  }, [initialPage, pageSize, search, category]);

  return { news, loading, error, totalPages, totalCount };
};
