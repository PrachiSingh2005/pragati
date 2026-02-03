import { useEffect, useRef, useState } from "react";
import { useServices } from "@/contexts/ServicesContext";
import ImageCarousel from "@/components/ImageCarousel";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { services } = useServices();

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

  return (
    <section ref={sectionRef} id="services" className="section-padding">
      <div className="container-editorial">
        <div className={`mb-16 md:mb-20 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl">
            Our Services
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`group relative rounded-sm cursor-pointer overflow-hidden
                bg-card border border-border/30
                transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10
                hover:border-foreground/20 hover:bg-card/80
                md:hover:-translate-y-2 
                ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              {/* Service Image Carousel */}
              {service.images && service.images.length > 0 && (
                <div className="relative">
                  <ImageCarousel 
                    images={service.images} 
                    alt={service.title}
                    aspectRatio="aspect-[4/3]"
                  />
                </div>
              )}

              {/* Subtle inner glow on hover */}
              <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 
                transition-opacity duration-[400ms] pointer-events-none
                bg-gradient-to-b from-foreground/[0.02] to-transparent" />
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-10">
                <h3 className="editorial-heading text-xl md:text-2xl mb-4 text-foreground
                  transition-all duration-300 ease-out
                  group-hover:translate-y-[-2px] group-hover:scale-[1.02] origin-left">
                  {service.title}
                </h3>
                <p className="body-text text-muted-foreground text-sm leading-relaxed
                  transition-all duration-300 delay-75
                  group-hover:text-muted-foreground/90">
                  {service.description}
                </p>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-px 
                bg-gradient-to-r from-transparent via-accent/50 to-transparent
                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
