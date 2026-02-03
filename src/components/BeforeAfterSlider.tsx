import { useState, useRef, useCallback, useEffect } from "react";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider = ({ beforeImage, afterImage }: BeforeAfterSliderProps) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const handleMove = useCallback(
    (clientX: number) => {
      if (!containerRef.current || !isDragging) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = clientX - rect.left;
      const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
      setSliderPosition(percentage);
    },
    [isDragging]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => handleMove(e.clientX),
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => handleMove(e.touches[0].clientX),
    [handleMove]
  );

  const startDragging = () => setIsDragging(true);
  const stopDragging = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mouseup", stopDragging);
      document.addEventListener("touchend", stopDragging);
    }
    return () => {
      document.removeEventListener("mouseup", stopDragging);
      document.removeEventListener("touchend", stopDragging);
    };
  }, [isDragging]);

  return (
    <section ref={sectionRef} className="section-padding">
      <div className="container-editorial">
        <div className={`text-center mb-12 md:mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            From Vision to Reality
          </h2>
          <p className="body-text text-muted-foreground text-lg max-w-2xl mx-auto">
            A quiet transformation shaped by materials, light, and proportion.
          </p>
        </div>

        <div 
          className={`${isVisible ? 'animate-fade-in delay-300' : 'opacity-0'}`}
        >
          <div
            ref={containerRef}
            className="relative w-full aspect-[16/9] max-w-5xl mx-auto overflow-hidden border border-border cursor-ew-resize select-none"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
          >
            {/* After Image (Background) */}
            <div className="absolute inset-0">
              <img
                src={afterImage}
                alt="After transformation"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Before Image (Clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <img
                src={beforeImage}
                alt="Before transformation"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>

            {/* Slider Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-foreground/80"
              style={{ left: `${sliderPosition}%`, transform: "translateX(-50%)" }}
            >
              {/* Slider Handle */}
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-foreground flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg"
                onMouseDown={startDragging}
                onTouchStart={startDragging}
              >
                <svg className="w-5 h-5 text-background" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>
            </div>

            {/* Labels */}
            <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-4 py-2">
              <span className="body-text text-xs tracking-widest uppercase text-foreground">Before</span>
            </div>
            <div className="absolute bottom-6 right-6 bg-background/90 backdrop-blur-sm px-4 py-2">
              <span className="body-text text-xs tracking-widest uppercase text-foreground">After</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
