import { useEffect, useRef, useState } from "react";

const FinalCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-24 md:py-32 lg:py-40 bg-plum">
      <div className="container-editorial">
        <div className={`text-center max-w-3xl mx-auto ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-8">
            Transform Your Space with
            <br />
            Thoughtful Design
          </h2>
          
          <a 
            href="mailto:hello@pragatiinteriors.com" 
            className="inline-block btn-primary bg-foreground text-background hover:bg-foreground/90 mt-4"
          >
            Schedule Consultation
          </a>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
