import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePortfolio, Project } from "@/contexts/PortfolioContext";
import ImageCarousel from "@/components/ImageCarousel";
import DetailModal from "@/components/DetailModal";

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch from new public API
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/portfolio`)
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch portfolio:", err);
        setLoading(false);
      });
  }, []);

  // Extract categories dynamically from the fetched projects + "All"
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category)))];

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 md:pt-32">
        <section ref={sectionRef} className="section-padding">
          <div className="container-editorial">
            <div className={`mb-12 md:mb-16 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}>
              <h1 className="editorial-heading text-4xl md:text-5xl lg:text-6xl mb-6">
                Our Portfolio
              </h1>
              <p className="body-text text-muted-foreground max-w-2xl">
                A curated collection of our finest work, showcasing thoughtful design
                solutions across residential, commercial, and hospitality spaces.
              </p>
            </div>

            {loading ? (
              <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : (
              <>
                {/* Category Filter */}
                {categories.length > 1 && (
                  <div className={`flex flex-wrap gap-3 mb-12 ${isVisible ? 'animate-fade-up' : 'opacity-0'}`}
                    style={{ animationDelay: '100ms' }}>
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-5 py-2 text-sm tracking-widest uppercase transition-all duration-300
                            ${activeCategory === category
                            ? 'bg-foreground text-background'
                            : 'bg-transparent border border-border text-muted-foreground hover:border-foreground hover:text-foreground'
                          }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}

                {/* Projects Grid */}
                {filteredProjects.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-8 md:gap-10">
                    {filteredProjects.map((project, index) => (
                      <div
                        key={project.id}
                        onClick={() => setSelectedProject(project)}
                        className={`group cursor-pointer ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                        style={{ animationDelay: `${index * 150 + 200}ms` }}
                      >
                        <div className="relative mb-5">
                          <ImageCarousel
                            images={project.images}
                            alt={project.title}
                            aspectRatio="aspect-[4/3]"
                            className="transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                          />
                          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 
                            transition-colors duration-500 pointer-events-none" />
                        </div>
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="editorial-heading text-xl md:text-2xl mb-1 
                              group-hover:text-accent transition-colors duration-300">
                              {project.title}
                            </h3>
                            <p className="body-text text-muted-foreground text-sm">
                              {project.location}
                            </p>
                          </div>
                          <span className="text-xs tracking-widest uppercase text-muted-foreground/70">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="body-text text-muted-foreground">No projects available.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <Footer />

      {/* Detail Modal */}
      <DetailModal
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title || ""}
        subtitle={selectedProject?.location}
        description={selectedProject?.description || ""}
        images={selectedProject?.images || []}
        badge={selectedProject?.category}
      />
    </div>
  );
};

export default Portfolio;
