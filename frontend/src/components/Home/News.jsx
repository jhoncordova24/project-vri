import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";
import NewsCard from "../common/NewsCard";
import { useLatestNews } from "../../hooks/news/useLatestNews";

export default function News() {
  const { news, loading, error } = useLatestNews(3);

  return (
    <SectionContainer
      label="Actualidad Institucional"
      title="Últimas noticias"
      description="Entérate de los últimos avances, eventos y logros científicos de nuestra comunidad universitaria."
      className="bg-slate-50/60"
    >
      {loading && (
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="py-4 md:py-0 border-b border-slate-200/80 md:border md:border-slate-200/80 md:rounded-2xl md:bg-white overflow-hidden flex flex-row md:flex-col gap-3.5 md:gap-0"
            >
              <div className="w-28 h-20 sm:w-36 sm:h-24 md:w-full md:h-auto md:aspect-[16/10] shrink-0 rounded-lg md:rounded-none bg-slate-200/70 animate-pulse" />

              <div className="flex-1 min-w-0 md:p-5 space-y-2 md:space-y-3 flex flex-col justify-center md:justify-start">
                <div className="h-3 w-20 md:w-24 bg-slate-200/70 animate-pulse rounded-full" />
                <div className="h-4 md:h-5 w-full bg-slate-200/70 animate-pulse rounded-md" />
                <div className="h-4 md:h-5 w-3/4 bg-slate-200/70 animate-pulse rounded-md" />
                <div className="hidden md:block h-3.5 w-5/6 bg-slate-100 animate-pulse rounded-md" />
              </div>

              <div className="hidden md:flex p-5 pt-3 border-t border-slate-100 justify-between items-center">
                <div className="h-4 w-32 bg-slate-200/70 animate-pulse rounded-full" />
                <div className="w-7 h-7 rounded-full bg-slate-200/70 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && error && (
        <div className="text-center text-red-500 py-12 text-sm">
          Ocurrió un error al obtener las noticias.
        </div>
      )}

      {!loading && !error && (
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-1 md:gap-6">
          {news.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      <div className="mt-8 md:mt-12 text-center">
        <Button to="/noticias">Ver todas las noticias</Button>
      </div>
    </SectionContainer>
  );
}
