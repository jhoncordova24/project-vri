import SectionContainer from "../common/SectionContainer";
import Button from "../common/Button";
import NewsCard from "../common/NewsCard";
import { useLatestNews } from "../../hooks/useNews";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col justify-between p-0"
            >
              <div className="aspect-[16/10] bg-slate-200/70 animate-pulse" />
              <div className="p-5 space-y-3">
                <div className="h-3.5 w-24 bg-slate-200/70 animate-pulse rounded-full" />
                <div className="h-5 w-full bg-slate-200/70 animate-pulse rounded-md" />
                <div className="h-5 w-3/4 bg-slate-200/70 animate-pulse rounded-md" />
                <div className="h-3.5 w-5/6 bg-slate-100 animate-pulse rounded-md" />
              </div>
              <div className="p-5 pt-3 border-t border-slate-100 flex justify-between items-center">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item, index) => (
            <NewsCard key={item.id} item={item} index={index} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center" data-aos="fade-up">
        <Button to="/noticias">Ver todas las noticias</Button>
      </div>
    </SectionContainer>
  );
}
