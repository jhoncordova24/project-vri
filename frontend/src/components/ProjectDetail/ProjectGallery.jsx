import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SectionContainer from "../common/SectionContainer";
import Pagination from "../common/Pagination";
import { useProjectGallery } from "../../hooks/projects/useProjectGallery";

const PAGE_SIZE = 4;

export default function ProjectGallery({ projectId }) {
  const [page, setPage] = useState(1);
  const [modalIndex, setModalIndex] = useState(null);

  const { images, loading, error, totalPages, totalCount } = useProjectGallery({
    projectId,
    page,
    pageSize: PAGE_SIZE,
  });

  const isModalOpen = modalIndex !== null;
  const currentImage = isModalOpen ? images[modalIndex] : null;

  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((img) => {
      if (img.imagen_url) {
        const imageObj = new Image();
        imageObj.src = img.imagen_url;
      }
    });
  }, [images]);

  const handleClose = () => setModalIndex(null);

  const handlePrev = () => {
    if (!isModalOpen || images.length < 2) return;
    setModalIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    if (!isModalOpen || images.length < 2) return;
    setModalIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleDragEnd = (_, { offset, velocity }) => {
    if (images.length < 2) return;
    if (offset.x < -50 || velocity.x < -300) handleNext();
    else if (offset.x > 50 || velocity.x > 300) handlePrev();
  };

  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    const prevOverflow = document.body.style.overflow;
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [isModalOpen, images.length]);

  return (
    <SectionContainer
      label="EVIDENCIAS DE CAMPO"
      title="Galería del Proyecto"
      action={
        <div className="inline-flex w-fit items-center gap-2.5 text-xs sm:text-sm font-semibold text-slate-700 bg-white border border-slate-200/80 shadow-xs py-2 px-4 rounded-full">
          <Camera className="w-4 h-4 text-brand-primary shrink-0" />
          <span className="whitespace-nowrap">Fotografías registradas:</span>
          <span className="ml-1 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-primary/10 text-brand-primary shrink-0">
            {totalCount}
          </span>
        </div>
      }
    >
      <div className="min-h-[220px]">
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-4/3 w-full rounded-xl sm:rounded-2xl bg-slate-200/60 animate-pulse border border-slate-200/80"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-8 text-red-500 bg-red-50/80 border border-red-100 rounded-2xl p-4 text-sm">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {images.map((item, idx) => (
              <button
                key={item.id || idx}
                type="button"
                onClick={() => setModalIndex(idx)}
                className="group relative aspect-4/3 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-900 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all duration-300 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-primary"
              >
                <img
                  src={item.imagen_url}
                  alt={item.descripcion || `Evidencia ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-3 sm:p-4">
                  <span className="self-end p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-white/20 backdrop-blur-md text-white">
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
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
        )}
      </div>

      {!loading && !error && totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={PAGE_SIZE}
          onPageChange={setPage}
          itemName="fotografías"
        />
      )}

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-md select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                onClick={handleClose}
              >
                <div className="absolute top-5 left-6 z-20 text-white/80 font-mono text-xs sm:text-sm font-semibold tracking-wider">
                  {modalIndex + 1} / {images.length}
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                      className="hidden sm:block absolute left-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
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
                      className="hidden sm:block absolute right-4 z-20 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                      aria-label="Siguiente foto"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                <div
                  className="relative w-full max-w-5xl h-full flex flex-col items-center justify-center px-4 py-16 sm:px-20"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative flex items-center justify-center w-full h-[70vh]">
                    <AnimatePresence initial={false}>
                      {currentImage && (
                        <motion.img
                          key={modalIndex}
                          src={currentImage.imagen_url}
                          alt={
                            currentImage.descripcion || "Evidencia fotográfica"
                          }
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.12, ease: "linear" }}
                          drag="x"
                          dragConstraints={{ left: 0, right: 0 }}
                          dragElastic={0.2}
                          onDragEnd={handleDragEnd}
                          style={{ touchAction: "pan-y" }}
                          draggable={false}
                          className="absolute max-w-full max-h-full w-auto h-auto object-contain rounded-xl shadow-2xl cursor-grab active:cursor-grabbing will-change-[opacity]"
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  {currentImage?.descripcion && (
                    <p className="text-center text-slate-300 text-xs sm:text-sm mt-4 max-w-2xl px-4 pointer-events-none">
                      {currentImage.descripcion}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </SectionContainer>
  );
}
