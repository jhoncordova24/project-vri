import SectionLabel from "../common/SectionLabel";
import SectionTitle from "../common/SectionTitle";
import { Calendar, ArrowRight } from "lucide-react";
import Button from "../common/Button";
import { useLatestNews } from "../../hooks/useNews";
import { formatDate } from "../../utils/formatDate";
import { Link } from "react-router-dom";

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
            <SectionTitle>Últimas Noticias</SectionTitle>
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
              <article
                key={item.id}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100 relative">
                    <img
                      src={item.imagen_url}
                      alt={item.titulo}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-brand-primary text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                      {item.categoria}
                    </span>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{formatDate(item.creado_en)}</span>
                    </div>

                    <h3 className="font-bold text-brand-dark text-base group-hover:text-brand-primary transition-colors line-clamp-2 leading-snug">
                      {item.titulo}
                    </h3>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-2">
                  <Link
                    to={`/noticias/${item.id}`}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary group-hover:text-brand-hover transition-colors"
                  >
                    <span>Leer noticia</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </article>
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
