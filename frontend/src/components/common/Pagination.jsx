import { getPaginationRange } from "../../utils/pagination";

export default function Pagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
  itemName = "elementos",
  className = "",
}) {
  if (totalPages <= 1 || totalCount === 0) return null;

  const paginationRange = getPaginationRange(currentPage, totalPages);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-sm text-slate-500 ${className}`}
    >
      <div className="text-center sm:text-left text-xs sm:text-sm">
        Mostrando de{" "}
        <span className="font-semibold text-brand-dark">{startItem}</span> a{" "}
        <span className="font-semibold text-brand-dark">{endItem}</span> de{" "}
        <span className="font-semibold text-brand-dark">{totalCount}</span>{" "}
        {itemName}
      </div>

      <div className="flex items-center gap-1 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:inline-flex px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Primera página"
        >
          «
        </button>

        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
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
              type="button"
              onClick={() => onPageChange(pageNumber)}
              className={`px-3.5 py-1.5 rounded-xl font-semibold transition-all cursor-pointer ${
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
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Página siguiente"
        >
          ›
        </button>

        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="hidden sm:inline-flex px-2.5 py-1.5 rounded-xl border border-slate-200 text-slate-500 hover:border-brand-primary hover:text-brand-primary disabled:opacity-30 disabled:hover:border-slate-200 disabled:hover:text-slate-500 disabled:cursor-not-allowed transition-colors cursor-pointer"
          title="Última página"
        >
          »
        </button>
      </div>
    </div>
  );
}
