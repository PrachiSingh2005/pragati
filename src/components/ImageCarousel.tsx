import { useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  className?: string;
  aspectRatio?: string;
}

const ImageCarousel = ({ 
  images, 
  alt, 
  className,
  aspectRatio = "aspect-[4/3]" 
}: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const validImages = images.filter(Boolean);
  
  // Fallback to placeholder if no images
  if (validImages.length === 0) {
    validImages.push("/placeholder.svg");
  }

  const goToNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % validImages.length);
  }, [validImages.length]);

  const goToPrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  }, [validImages.length]);

  const goToSlide = useCallback((index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  }, []);

  return (
    <div 
      className={cn("relative overflow-hidden", aspectRatio, className)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Images */}
      <div 
        className="flex transition-transform duration-500 ease-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {validImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`${alt} - Image ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {validImages.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className={cn(
              "absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "text-foreground hover:bg-background transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              isHovering ? "opacity-100" : "opacity-0"
            )}
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goToNext}
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full",
              "bg-background/80 backdrop-blur-sm border border-border/50",
              "text-foreground hover:bg-background transition-all duration-300",
              "opacity-0 group-hover:opacity-100",
              isHovering ? "opacity-100" : "opacity-0"
            )}
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </>
      )}

      {/* Dot Indicators - Only show if multiple images */}
      {validImages.length > 1 && (
        <div className={cn(
          "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5",
          "transition-opacity duration-300",
          isHovering ? "opacity-100" : "opacity-70"
        )}>
          {validImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => goToSlide(index, e)}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                index === currentIndex 
                  ? "bg-foreground w-4" 
                  : "bg-foreground/50 hover:bg-foreground/80"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;
