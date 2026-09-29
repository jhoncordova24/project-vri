import { getPaginationRange } from "../../utils/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  itemName = "elementos", // flexible para 'noticias', 'fotografías', etc.
  className = "",
}) {
  // Si no hay páginas suficientes, no renderizar nada
  if (totalPages <= 1 || totalCount === 0) return null;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-slate-200/80 text-sm text-slate-500 ${className}`}
    >
      <div>
        Mostrando de{" "}
        <span className="font-semibold text-brand-dark">{startItem}</span> a{" "}
        <span className="font-semibold text-brand-dark">{endItem}</span> de{" "}
        <span className="font-semibold text-brand-dark">{totalCount}</span>{" "}
        {itemName}
      </div>

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
          title="Primera página"
        >
          «
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
          title="Página anterior"
        >
          ‹
        </button>

        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === "...") {
            return (
              <span
                key={`ellipsis-${idx}`}
                className="px-2 py-1.5 text-slate-400"
              >
                ...
              </span>
            );
          }

          const isActive = currentPage === pageNumber;

          return (
            <button
              key={pageNumber}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all ${
                isActive
                  ? "bg-brand-primary text-white shadow-xs"
                  : "text-brand-dark hover:bg-slate-200/60 hover:text-brand-primary"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
          title="Página siguiente"
        >
          ›
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors"
          title="Última página"
        >
          »
        </button>
      </div>
    </div>
  );
}
