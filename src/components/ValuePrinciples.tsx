import { useEffect, useRef, useState } from "react";

// Import principle images
import principleSpatial from "@/assets/principle-spatial.jpg";
import principleMaterials from "@/assets/principle-materials.jpg";
import principleLuxury from "@/assets/principle-luxury.jpg";
import principleLifestyle from "@/assets/principle-lifestyle.jpg";



const ValuePrinciples = () => {
  const [principles, setPrinciples] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/principles`)
      .then(res => res.json())
      .then(data => {
        setPrinciples(data.map((p: any) => ({
          ...p,
          image: `/assets/${p.image_url}`
        })));
      })
      .catch(err => console.error(err));
  }, []);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-editorial">
        <div className={`text-center mb-16 md:mb-24 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl">
            Design as a Dialogue
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {principles.map((principle, index) => (
            <div
              key={principle.title}
              className={`group card-elevated overflow-hidden ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {/* Image */}
              <div className="relative h-40 overflow-hidden">
                <img
                  src={principle.image}
                  alt={principle.title}
                  className="w-full h-full object-cover transition-transform duration-500 
                    group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8 md:p-10">
                <h3 className="editorial-heading text-xl md:text-2xl mb-4 text-foreground">
                  {principle.title}
                </h3>
                <p className="body-text text-muted-foreground text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuePrinciples;
