import { useEffect, useRef, useState } from "react";

interface HeroProps {
  heroImage: string;
}

const Hero = ({ heroImage }: HeroProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section ref={heroRef} className="min-h-screen flex items-center pt-24 md:pt-0">
      <div className="container-editorial w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
            <h1 className="editorial-heading text-5xl md:text-6xl lg:text-7xl xl:text-8xl leading-[1.1]">
              Crafting Spaces
              <br />
              <span className="text-plum">That Breathe</span>
            </h1>
            
            <p className="body-text text-muted-foreground text-lg md:text-xl max-w-md leading-relaxed">
              Designing warm, contemporary interiors rooted in material, light, and everyday living.
            </p>
            
            <div className={`flex flex-wrap gap-4 pt-4 ${isVisible ? 'animate-fade-up delay-200' : 'opacity-0'}`}>
              <a href="#projects" className="btn-primary">
                View Portfolio
              </a>
              <a href="#contact" className="btn-outline">
                Book a Call
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div 
            className={`relative h-[500px] md:h-[600px] lg:h-[700px] ${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={heroImage}
                alt="Luxury interior design by Pragati Interior Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/30 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
