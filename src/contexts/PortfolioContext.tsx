import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface Project {
  id: string;
  title: string;
  category: string; // Display name
  category_id?: number; // Backend ID
  image_url: string; // Main/First image
  images?: string[]; // All images
  location: string;
  description?: string;
  is_active: boolean; // Visibility toggle
}

export interface Category {
  id: number;
  name: string;
  is_default: boolean;
}

interface PortfolioContextType {
  projects: Project[];
  categories: string[]; // Legacy List of names for strings
  categoryList: Category[]; // Full objects
  loading: boolean;
  addProject: (project: Omit<Project, "id" | "display_order">) => void;
  toggleProjectVisibility: (id: string) => void;
  addCategory: (name: string) => Promise<void>;
  updateCategory: (id: number, name: string) => Promise<void>;
  deleteCategory: (id: number) => Promise<void>;
  getActiveProjects: () => Project[];
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Derived simple list for dropdowns if needed, though we should prefer full objects
  const categories = ["All", ...categoryList.map(c => c.name)];

  const getImageUrl = (path: string) => {
    if (!path) return '';
    if (path.startsWith('http')) return path;
    if (path.startsWith('/assets')) {
      return `${import.meta.env.VITE_API_URL.replace('/api', '')}${path}`;
    }
    return `${import.meta.env.VITE_API_URL.replace('/api', '')}/assets/${path}`;
  };

  const fetchCategories = () => {
    fetch(`${import.meta.env.VITE_API_URL}/admin/categories`)
      .then(res => res.json())
      .then(data => {
        setCategoryList(data);
      })
      .catch(err => console.error("Failed to fetch categories:", err));
  };

  useEffect(() => {
    // Fetch Categories
    fetchCategories();

    // Fetch Projects
    fetch(`${import.meta.env.VITE_API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        const transformedData = data.map((p: any) => {
          let images: string[] = [];
          try {
            if (p.images) {
              const parsed = JSON.parse(p.images);
              images = Array.isArray(parsed) ? parsed : [];
            }
          } catch (e) {
            console.error("Failed to parse images JSON for project:", p.id, e);
          }

          if (images.length === 0 && p.image_url) {
            images = [p.image_url];
          }

          const processedImages = images.map(img => getImageUrl(img));

          return {
            ...p,
            images: processedImages,
            image_url: processedImages.length > 0 ? processedImages[0] : p.image_url,
            is_active: p.is_active === 1 || p.is_active === true
          };
        });
        setProjects(transformedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch projects:", err);
        setLoading(false);
      });
  }, []);

  const addProject = async (project: Omit<Project, "id" | "display_order">) => {
    const cleanImages = project.images && project.images.length > 0
      ? project.images.map(img => {
        return img.replace(/\/assets\//g, '').split('/').pop() || img;
      })
      : [];

    // Find category ID
    const catObj = categoryList.find(c => c.name === project.category);
    const category_id = catObj ? catObj.id : null;

    if (!category_id) {
      console.error("Category not found:", project.category);
      return;
    }

    const payload = {
      title: project.title,
      location: project.location,
      category_id: category_id,
      description: project.description,
      images: cleanImages,
      image_url: cleanImages.length > 0 ? cleanImages[0] : '',
      is_active: 1
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const newP = await res.json();
        const processedImgs = newP.images.map((img: string) => getImageUrl(img));
        const projectWithUrl = {
          ...newP,
          images: processedImgs,
          image_url: processedImgs[0] || '',
          is_active: true
        };
        setProjects([...projects, projectWithUrl]);
      }
    } catch (err) {
      console.error("Failed to add project", err);
    }
  };

  const toggleProjectVisibility = async (id: string) => {
    const proj = projects.find(p => p.id === id);
    if (!proj) return;

    const newStatus = !proj.is_active;

    setProjects(
      projects.map((project) =>
        project.id === id ? { ...project, is_active: newStatus } : project
      )
    );

    try {
      const cleanImages = proj.images ? proj.images.map(img => img.split('/').pop() || img) : [];
      const catObj = categoryList.find(c => c.name === proj.category);

      const payload = {
        title: proj.title,
        location: proj.location,
        category_id: catObj?.id,
        description: proj.description,
        images: cleanImages,
        is_active: newStatus ? 1 : 0
      };

      await fetch(`${import.meta.env.VITE_API_URL}/projects/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

    } catch (err) {
      console.error("Failed to toggle project", err);
      setProjects(
        projects.map((project) =>
          project.id === id ? { ...project, is_active: !newStatus } : project
        )
      );
    }
  };

  const addCategory = async (name: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (e) {
      console.error("Add category failed", e);
    }
  };

  const updateCategory = async (id: number, name: string) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name })
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (e) {
      console.error("Update category failed", e);
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/categories/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        fetchCategories();
      } else {
        console.error("Delete failed");
      }
    } catch (e) {
      console.error("Delete category failed", e);
    }
  };

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        categories,
        categoryList,
        loading,
        addProject,
        toggleProjectVisibility,
        addCategory,
        updateCategory,
        deleteCategory,
        getActiveProjects: () => projects.filter(p => p.is_active)
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
};
