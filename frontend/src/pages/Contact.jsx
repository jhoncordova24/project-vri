import PageHero from "../components/common/PageHero";
import ContactMainSection from "../components/Contact/ContactMainSection";

export default function Contact() {
  const tempHeroBg =
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80&fm=webp";

  return (
    <>
      <PageHero
        title="Contacto Institucional"
        subtitle="Canales oficiales de comunicación y orientación para investigadores, docentes y tesistas."
        badge="Atención a la Comunidad Universitaria"
        imageSrc={tempHeroBg}
      />
      <ContactMainSection />
    </>
  );
}
