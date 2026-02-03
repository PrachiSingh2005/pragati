import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import philosophyImage from "@/assets/philosophy-materials.jpg";

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const [philosophyData, setPhilosophyData] = useState<any>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/philosophy`)
      .then(res => res.json())
      .then(data => setPhilosophyData(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-32">
        {/* Hero Section with Full-Width Image */}
        <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80"
            alt="Elegant interior design showcasing our aesthetic"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
            <div className="container-editorial">
              <h1 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-foreground">
                About Pragati Studio
              </h1>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <section ref={sectionRef} className="section-padding">
          <div className="container-editorial">
            <div className={`max-w-3xl ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              <p className="body-text text-muted-foreground text-lg md:text-xl leading-relaxed">
                We are a design studio rooted in the belief that spaces should tell stories.
                Every project we undertake is a dialogue between form and function,
                tradition and innovation.
              </p>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="section-padding pt-0">
          <div className="container-editorial">
            <div className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 
              ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '200ms' }}>
              <div>
                <h2 className="editorial-heading text-3xl md:text-4xl mb-6">
                  {philosophyData ? philosophyData.title : "Our Philosophy"}
                </h2>
                <div className="space-y-4 body-text text-muted-foreground">
                  <p>
                    {philosophyData ? philosophyData.content :
                      `At Pragati Interior Studio, we believe that exceptional design emerges 
                    from a deep understanding of how people live, work, and connect with 
                    their environments.`}
                  </p>
                  {!philosophyData && (
                    <>
                      <p>
                        Our approach is rooted in restraint—choosing quality over quantity,
                        timelessness over trends. We work with natural materials, honest
                        craftsmanship, and a palette that breathes with its surroundings.
                      </p>
                      <p>
                        Every space we create is a meditation on balance: the interplay of
                        light and shadow, texture and smoothness, openness and intimacy.
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="relative">
                <img
                  src={philosophyData ? `/assets/${philosophyData.image_url}` : philosophyImage}
                  alt="Our design philosophy - natural materials and textures"
                  className="w-full aspect-[4/5] object-cover"
                />
              </div>
            </div>

            {/* Values Section */}
            <div className={`${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
              style={{ animationDelay: '400ms' }}>
              <h2 className="editorial-heading text-3xl md:text-4xl mb-12 text-center">
                What Guides Us
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    title: "Intentional Design",
                    description: "Every element serves a purpose. We eliminate the superfluous to amplify what matters.",
                    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=600&q=80"
                  },
                  {
                    title: "Timeless Aesthetic",
                    description: "We create spaces that transcend trends, aging gracefully with the passage of time.",
                    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80"
                  },
                  {
                    title: "Human-Centered",
                    description: "Spaces exist for people. Comfort, functionality, and emotional resonance drive every decision.",
                    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80"
                  }
                ].map((value) => (
                  <div
                    key={value.title}
                    className="group overflow-hidden border border-border/30 hover:border-foreground/20 
                      transition-colors duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={value.image}
                        alt={value.title}
                        className="w-full h-full object-cover transition-transform duration-500 
                          group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 text-center">
                      <h3 className="editorial-heading text-xl mb-3">{value.title}</h3>
                      <p className="body-text text-muted-foreground text-sm">
                        {value.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
