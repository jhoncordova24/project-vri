import { getPaginationRange } from "../../utils/pagination";

export default function NewsPagination({
  currentPage,
  totalPages,
  totalCount,
  pageSize,
  onPageChange,
}) {
  const paginationRange = getPaginationRange(currentPage, totalPages);

  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-10 pt-6 border-t border-gray-100 text-sm text-gray-600">
      <div>
        Mostrando de <span className="font-semibold">{startItem}</span> a{" "}
        <span className="font-semibold">{endItem}</span> de{" "}
        <span className="font-semibold">{totalCount}</span> noticias
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          title="Primera página"
        >
          «
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          title="Página anterior"
        >
          ‹
        </button>

        {paginationRange.map((pageNumber, idx) => {
          if (pageNumber === "...") {
            return (
              <span key={idx} className="px-2 py-1.5 text-gray-400">
                ...
              </span>
            );
          }

          return (
            <button
              key={idx}
              onClick={() => onPageChange(pageNumber)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-colors ${
                currentPage === pageNumber
                  ? "bg-slate-900 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          title="Página siguiente"
        >
          ›
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage >= totalPages}
          className="px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
          title="Última página"
        >
          »
        </button>
      </div>
    </div>
  );
}
