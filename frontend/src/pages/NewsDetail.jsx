import Hero from "../components/common/Hero";
import NewsDetailSection from "../components/NewsDetail/NewsDetail";
import heroNewsImg from "../assets/hero-news.webp"; 

export default function NewsDetail() {
  return (
    <>
      <Hero
        type="image"
        imageSrc={heroNewsImg} 
        title="Noticias y Actualidad"
        subtitle="Entérate de los últimos avances, convocatorias y eventos del Vicerrectorado."
        showButton={false}
      />
      <NewsDetailSection />
    </>
  );
}
