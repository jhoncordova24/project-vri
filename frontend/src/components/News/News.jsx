import { useState, useEffect } from "react";
import AOS from "aos";
import { Search } from "lucide-react";
import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import { useNews } from "../../hooks/useNews";
import { useDebounce } from "../../hooks/useDebounce";
import NewsCard from "../common/NewsCard";
import NewsPagination from "./NewsPagination";

const CATEGORIES = [
  { id: "Todas", label: "Todas" },
  { id: "INVESTIGACIÓN", label: "Investigación" },
  { id: "RECONOCIMIENTO", label: "Reconocimiento" },
  { id: "CONVOCATORIA", label: "Convocatorias" },
  { id: "RECURSOS", label: "Recursos" },
  { id: "CAPACITACIÓN", label: "Capacitación" },
  { id: "EVENTOS", label: "Eventos" },
];

export default function News() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  const debouncedSearch = useDebounce(search, 300);

  const { news, loading, error, totalPages, totalCount } = useNews({
    initialPage: page,
    pageSize: 6,
    search: debouncedSearch,
    search,
    category: selectedCategory,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    AOS.refresh();
  }, [page, selectedCategory]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setPage(1);
  };

  const currentCategoryLabel =
    CATEGORIES.find((c) => c.id === selectedCategory)?.label || "Todas";

  return (
    <section className="py-16 bg-slate-50/60 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8" data-aos="fade-up">
          <SectionLabel>Actualidad Institucional</SectionLabel>
          <SectionTitle>Noticias y Novedades</SectionTitle>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Explora las últimas noticias, anuncios, eventos y publicaciones
            científicas del Vicerrectorado de Investigación.
          </p>
        </div>

        <div
          className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200/80"
          data-aos="fade-up"
        >
          <div className="relative w-full lg:w-80 shrink-0">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar noticias..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-brand-dark placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition shadow-xs"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <div className="flex items-center gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-brand-primary text-white shadow-xs"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-brand-primary hover:text-brand-primary"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {!loading && (
          <div className="mb-6 flex justify-between items-center text-xs text-slate-400">
            <span>
              Categoría:{" "}
              <strong className="text-brand-dark">
                {currentCategoryLabel}
              </strong>
            </span>
            <span>
              {totalCount}{" "}
              {totalCount === 1 ? "noticia encontrada" : "noticias encontradas"}
            </span>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-slate-200/60 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 bg-red-50/80 border border-red-100 rounded-2xl p-4 text-sm">
            Ocurrió un error al cargar las noticias: {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-xs border border-slate-200/80">
            <p className="text-slate-500 text-base">
              No se encontraron noticias en la categoría{" "}
              <strong className="text-brand-dark">
                {currentCategoryLabel}
              </strong>
              {search && ` que coincidan con "${search}"`}.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}

        {!loading && !error && totalPages > 1 && (
          <NewsPagination
            currentPage={page}
            totalPages={totalPages}
            totalCount={totalCount}
            pageSize={6}
            onPageChange={setPage}
          />
        )}
      </div>
    </section>
  );
}
