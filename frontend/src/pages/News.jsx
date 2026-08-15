import React from "react";
import NewsSection from "../components/News/News";
import PageHero from "../components/common/PageHero";
import heroBg from "../assets/news/hero.webp";

export default function News() {
  return (
    <>
      <PageHero
        title="Noticias y Actualidad"
        subtitle="Explora los últimos avances, eventos, convocatorias y logros de nuestra comunidad científica."
        badge="Comunicación Institucional"
        imageSrc={heroBg}
      />
      <NewsSection />
    </>
  );
}
