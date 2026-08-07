import { useState } from "react";
import { Link } from "react-router-dom";
import { useNews } from "../../hooks/useNews";
import NewsPagination from "./NewsPagination";

export default function News() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { news, loading, error, totalPages, totalCount } = useNews({
    initialPage: page,
    pageSize: 6,
    search,
  });

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <section className="py-12 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10" data-aos="fade-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Noticias y Novedades
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explora las últimas noticias, anuncios y actualizaciones publicadas.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-10" data-aos="fade-up">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Buscar por título o contenido..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {totalCount > 0 && (
            <p className="text-xs text-gray-500 mt-2 text-right">
              Resultados encontrados: {totalCount}
            </p>
          )}
        </div>

        {loading && (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-3">Cargando noticias...</p>
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-red-500 bg-red-50 rounded-lg p-4">
            Ocurrió un error al cargar las noticias: {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">
              No se encontraron noticias que coincidan con tu búsqueda.
            </p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <article
                key={item.id}
                data-aos="fade-up"
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  {item.imagen_url && (
                    <img
                      src={item.imagen_url}
                      alt={item.titulo}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <span className="text-xs text-blue-600 font-medium bg-blue-50 px-2.5 py-1 rounded-full">
                      {new Date(item.creado_en).toLocaleDateString("es-ES", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <h2 className="font-bold text-xl text-gray-900 mt-3 mb-2 line-clamp-2">
                      {item.titulo}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {item.contenido}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2">
                  <Link
                    to={`/noticias/${item.id}`}
                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    Leer noticia completa
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
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
