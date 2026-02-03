import { useEffect, useRef, useState } from "react";

interface PhilosophyProps {
  philosophyImage: string;
}

const Philosophy = ({ philosophyImage }: PhilosophyProps) => {
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
    <section ref={sectionRef} id="philosophy" className="section-padding">
      <div className="container-editorial">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Image */}
          <div className={`${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={philosophyImage}
                alt="Material textures and wood details"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
            <h2 className="editorial-heading text-3xl md:text-4xl lg:text-5xl leading-tight">
              Crafting Interiors Where Materials, Light & Life Coexist
            </h2>
            
            <div className="space-y-6">
              <p className="body-text text-muted-foreground text-lg leading-relaxed">
                Pragati Interior Studio approaches design as a dialogue between materials, light, and daily rituals. Our work prioritizes longevity, warm minimalism, and sensory detail over trends.
              </p>
              <p className="body-text text-muted-foreground text-lg leading-relaxed">
                We believe that the most enduring spaces are those that feel both considered and effortless—where every surface, texture, and proportion has been thoughtfully chosen to enhance the way you experience your home.
              </p>
            </div>

            <div className="pt-4">
              <a href="#contact" className="nav-link text-sm tracking-widest uppercase text-brass inline-flex items-center gap-2">
                Learn About Our Process
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
