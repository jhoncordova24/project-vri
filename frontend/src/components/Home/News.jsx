import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import NewsCard from "../common/NewsCard";
import { useLatestNews } from "../../hooks/useNews";

export default function News() {
  const { news, loading, error } = useLatestNews(3);

  return (
    <section className="py-16 bg-slate-50/60">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
          data-aos="fade-up"
        >
          <div>
            <SectionLabel>Actualidad Institucional</SectionLabel>
            <SectionTitle>Últimas noticias</SectionTitle>
          </div>
          <p className="mt-2 md:mt-0 text-sm text-slate-500 max-w-md">
            Entérate de los últimos avances, eventos y logros científicos de
            nuestra comunidad universitaria.
          </p>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-80 bg-slate-200/60 animate-pulse rounded-2xl"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-red-500 py-8">
            Ocurrió un error al obtener las noticias.
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((item, index) => (
              <NewsCard key={item.id} item={item} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 text-center" data-aos="fade-up">
          <Button href="/noticias">Ver todas las noticias</Button>
        </div>
      </div>
    </section>
  );
}
