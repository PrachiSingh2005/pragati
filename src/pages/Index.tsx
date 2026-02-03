import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ValuePrinciples from "@/components/ValuePrinciples";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Import images
import heroImage from "@/assets/hero-interior.jpg";
import beforeImage from "@/assets/before-renovation.jpg";
import afterImage from "@/assets/after-renovation.jpg";

const Index = () => {
  const [heroData, setHeroData] = useState<any>(null);
  const [beforeAfterData, setBeforeAfterData] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/hero`)
      .then(res => res.json())
      .then(data => setHeroData(data))
      .catch(err => console.error(err));

    fetch(`${import.meta.env.VITE_API_URL}/before-after`)
      .then(res => res.json())
      .then(data => setBeforeAfterData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero heroImage={heroData ? `/assets/${heroData.image_url}` : heroImage} />
      <ValuePrinciples />
      <BeforeAfterSlider
        beforeImage={beforeAfterData ? `/assets/${beforeAfterData.before_image}` : beforeImage}
        afterImage={beforeAfterData ? `/assets/${beforeAfterData.after_image}` : afterImage}
      />
      <ContactForm />
      <Footer />
    </div>
  );
};

export default Index;
