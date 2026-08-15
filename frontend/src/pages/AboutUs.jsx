import React from "react";
import PageHero from "../components/common/PageHero";
import Structure from "../components/About/Structure";
import Identity from "../components/About/Identity";
import MissionVision from "../components/About/MissionVision";
import heroBg from "../assets/about/hero.webp";

const DEFAULT_HERO_IMAGE = heroBg;

export default function AboutUs() {
  return (
    <>
      <PageHero
        title="Nosotros"
        subtitle="Conoce más sobre nuestra institución y su compromiso con la investigación y la innovación."
        badge="Vicerrectorado de Investigación"
        imageSrc={DEFAULT_HERO_IMAGE}
      />
      <Identity />
      <Structure />
      <MissionVision />
    </>
  );
}