import { useState, useEffect, useRef } from "react";



const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/testimonials`)
      .then(res => res.json())
      .then(data => setTestimonials(data))
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
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 lg:py-40 bg-plum">
      <div className="container-editorial">
        <div className={`text-center ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-16 md:mb-20">
            Words of Trust
          </h2>

          <div className="max-w-4xl mx-auto relative min-h-[200px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${index === currentIndex
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4 pointer-events-none"
                  }`}
              >
                <blockquote className="editorial-heading text-2xl md:text-3xl lg:text-4xl text-foreground font-light leading-relaxed mb-8">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="body-text text-foreground/80 not-italic">
                  <span className="text-brass">— {testimonial.author}</span>, {testimonial.location}
                </cite>
              </div>
            ))}
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-3 mt-16">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                  ? "bg-foreground w-8"
                  : "bg-foreground/40 hover:bg-foreground/60"
                  }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
