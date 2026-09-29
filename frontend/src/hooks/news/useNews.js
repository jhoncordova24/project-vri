import { useState, useEffect } from "react";
import { getNews } from "../../services/newsService";

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
