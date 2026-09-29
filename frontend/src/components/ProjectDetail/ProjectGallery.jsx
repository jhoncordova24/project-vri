import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import Pagination from "../common/Pagination";
import { useProjectGallery } from "../../hooks/projects/useProjectGallery";

export default function ProjectGallery({ projectId }) {
  const [page, setPage] = useState(1);
  const [selectedModalIndex, setSelectedModalIndex] = useState(null);

  const { images, loading, error, totalPages, totalCount } = useProjectGallery({
    projectId,
    page,
    pageSize: 3,
  });

  const handleClose = () => setSelectedModalIndex(null);

  const handlePrev = useCallback(() => {
    setSelectedModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (selectedModalIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedModalIndex, handlePrev, handleNext]);

  if (!loading && totalCount === 0) return null;

  return (
    <SectionContainer
      label="EVIDENCIAS DE CAMPO"
      title="Galería del Proyecto"
      dataAos={null}
      action={
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-1.5 px-3.5 rounded-full">
          <Camera className="w-4 h-4 text-brand-primary" />
          <span>Fotografías registradas:</span>
          <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-brand-icon-bg text-brand-primary font-mono">
            {totalCount}
          </span>
        </div>
      }
    >
      <div className="min-h-[220px]">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="aspect-4/3 w-full rounded-2xl bg-slate-200/60 animate-pulse border border-slate-200/80"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500 bg-red-50/80 border border-red-100 rounded-2xl p-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && images.length > 0 && (
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {images.map((item, idx) => (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => setSelectedModalIndex(idx)}
                  className="group relative aspect-4/3 w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
                >
                  <img
                    src={item.imagen_url}
                    alt={item.descripcion || `Evidencia ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    <span className="self-end p-2 rounded-xl bg-white/20 backdrop-blur-md text-white">
                      <Maximize2 className="w-4 h-4" />
                    </span>

                    {item.descripcion && (
                      <p className="text-xs text-white line-clamp-2 font-medium">
                        {item.descripcion}
                      </p>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={3}
          onPageChange={setPage}
          itemName="fotografías"
        />
      )}

      <AnimatePresence>
        {selectedModalIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <div className="absolute top-5 left-6 text-white/80 font-mono text-xs sm:text-sm font-semibold tracking-wider">
              {selectedModalIndex + 1} / {images.length}
            </div>

            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Foto anterior"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                  aria-label="Siguiente foto"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            <div
              className="relative max-w-5xl max-h-[85vh] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedModalIndex}
                src={images[selectedModalIndex]?.imagen_url}
                alt={
                  images[selectedModalIndex]?.descripcion ||
                  "Evidencia fotográfica"
                }
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              />

              {images[selectedModalIndex]?.descripcion && (
                <p className="text-center text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl px-4">
                  {images[selectedModalIndex].descripcion}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
