import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import SectionContainer from "../common/SectionContainer";

export default function ProjectGallery({ images = [] }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const handleClose = () => setSelectedIndex(null);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (selectedIndex === null) return;

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
  }, [selectedIndex, handlePrev, handleNext]);

  if (!images || images.length === 0) return null;

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
            {images.length}
          </span>
        </div>
      }
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((item, idx) => (
            <button
              key={item.id || idx}
              type="button"
              onClick={() => setSelectedIndex(idx)}
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

      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <div className="absolute top-5 left-6 text-white/80 font-mono text-xs sm:text-sm font-semibold tracking-wider">
              {selectedIndex + 1} / {images.length}
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
                key={selectedIndex}
                src={images[selectedIndex]?.imagen_url}
                alt={
                  images[selectedIndex]?.descripcion || "Evidencia fotográfica"
                }
                className="max-h-[75vh] w-auto max-w-full rounded-xl object-contain shadow-2xl"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
              />

              {images[selectedIndex]?.descripcion && (
                <p className="text-center text-slate-300 text-xs sm:text-sm mt-3 max-w-2xl px-4">
                  {images[selectedIndex].descripcion}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}
