import { useState, useEffect } from "react";
import { getNewsById, getLatestNews } from "../services/newsService";

export const useNewsDetail = (id) => {
  const [newsItem, setNewsItem] = useState(null);
  const [otherNews, setOtherNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const [detailData, latestData] = await Promise.all([
          getNewsById(id),
          getLatestNews(5),
        ]);

        setNewsItem(detailData);
        setOtherNews(
          latestData.filter((item) => String(item.id) !== String(id)),
        );
      } catch (err) {
        setError("No se pudo cargar la noticia.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchNewsData();
  }, [id]);

  return { newsItem, otherNews, loading, error };
};
