import { useState, useEffect } from "react";
import { getProjectGallery } from "../../services/projectsService";

export const useProjectGallery = ({
  projectId,
  page = 1,
  pageSize = 3,
} = {}) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchGalleryData = async () => {
      if (!projectId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const result = await getProjectGallery({
          projectId,
          page,
          pageSize,
        });

        if (isMounted) {
          setImages(result.data || []);
          setTotalPages(result.totalPages || 1);
          setTotalCount(result.totalCount || 0);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "Error al cargar la galería");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchGalleryData();

    return () => {
      isMounted = false;
    };
  }, [projectId, page, pageSize]);

  return { images, loading, error, totalPages, totalCount };
};
