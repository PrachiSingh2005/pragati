import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getImageUrl } from "@/lib/imageUtils";

export interface Service {
  id: string;
  title: string;
  description: string;
  image_url: string; // Changed back to match API/DB
  images?: string[]; // Keep for compatibility or transformed
  is_active?: boolean;
  display_order: number;
}

interface ServicesContextType {
  services: Service[];
  loading: boolean;
  addService: (service: Omit<Service, "id" | "display_order">) => void;
  updateService: (id: string, service: Partial<Service>) => void;
  deleteService: (id: string) => void;
  toggleServiceVisibility: (id: string) => void;
  getActiveServices: () => Service[];
}

const ServicesContext = createContext<ServicesContextType | undefined>(undefined);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/services`)
      .then(res => res.json())
      .then(data => {
        // Transform data
        const transformedData = data.map((s: any) => ({
          ...s,
          // DB uses is_active (0 or 1), frontend expects boolean
          is_active: s.is_active === 1 || s.is_active === true || s.is_active === "1",
          images: s.image_url ? [getImageUrl(s.image_url)] : []
        }));
        setServices(transformedData);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to fetch services:", err);
        setLoading(false);
      });
  }, []);

  const addService = (service: Omit<Service, "id" | "display_order">) => {
    const dbService = {
      title: service.title,
      description: service.description,
      image_url: service.images && service.images.length > 0 ? service.images[0].replace('/assets/', '') : '',
      display_order: services.length + 1,
      is_active: 1 // Explicitly active by default
    };

    fetch(`${import.meta.env.VITE_API_URL}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbService)
    })
      .then(res => res.json())
      .then(newService => {
        const s: Service = {
          ...newService,
          id: newService.id.toString(),
          is_active: true, // Optimistic update
          images: newService.image_url ? [getImageUrl(newService.image_url)] : []
        };
        setServices(prev => [...prev, s]);
      })
      .catch(err => console.error("Error adding service:", err));
  };

  const updateService = (id: string, updates: Partial<Service>) => {
    const dbUpdates: any = { ...updates };

    // Handle specific field transformations
    if (updates.images && updates.images.length > 0) {
      dbUpdates.image_url = updates.images[0].replace('/assets/', '');
      delete dbUpdates.images;
    }

    // If updating visibility, convert to DB format (1/0)
    if (updates.hasOwnProperty('is_active')) {
      dbUpdates.is_active = updates.is_active ? 1 : 0;
    }

    fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dbUpdates)
    })
      .then(res => res.json())
      .then(() => {
        // Update local state ensuring proper types
        setServices(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
      })
      .catch(err => console.error("Error updating service:", err));
  };

  const deleteService = (id: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/services/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setServices(prev => prev.filter(s => s.id !== id));
      })
      .catch(err => console.error("Error deleting service:", err));
  };

  const toggleServiceVisibility = (id: string) => {
    const service = services.find(s => s.id === id);
    if (service) {
      // Toggle logic using updateService for persistence
      updateService(id, { is_active: !(service as any).is_active });
    }
  };

  const getActiveServices = () => {
    return services.filter(s => s.is_active);
  };

  return (
    <ServicesContext.Provider
      value={{
        services,
        loading,
        addService,
        updateService,
        deleteService,
        toggleServiceVisibility,
        getActiveServices
      }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = () => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error("useServices must be used within a ServicesProvider");
  }
  return context;
};
