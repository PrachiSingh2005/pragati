import { useEffect, useRef, useState } from "react";
import ImageCarousel from "@/components/ImageCarousel";

interface Project {
  title: string;
  location: string;
  category: string;
  images: string[];
}

interface FeaturedProjectsProps {
  projects: Project[];
}

const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
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

  return (
    <section ref={sectionRef} id="projects" className="section-padding">
      <div className="container-editorial">
        <div className={`mb-16 md:mb-20 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
          <h2 className="editorial-heading text-4xl md:text-5xl lg:text-6xl">
            Featured Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`group cursor-pointer ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
              style={{ animationDelay: `${index * 150 + 200}ms` }}
            >
              <div className="relative mb-6">
                <ImageCarousel 
                  images={project.images} 
                  alt={project.title}
                  aspectRatio="aspect-[4/3]"
                  className="transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-background/10 group-hover:bg-background/0 transition-colors duration-500 pointer-events-none" />
              </div>
              <div className="space-y-2">
                <span className="body-text text-xs tracking-widest uppercase text-brass">
                  {project.category}
                </span>
                <h3 className="editorial-heading text-2xl md:text-3xl text-foreground group-hover:text-plum transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="body-text text-muted-foreground text-sm">
                  {project.location}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
