import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  submitted_at: string;
}

interface ContactSubmissionsContextType {
  submissions: ContactSubmission[];
  addSubmission: (submission: Omit<ContactSubmission, "id" | "submitted_at">) => Promise<void>;
  refreshSubmissions: () => Promise<void>;
}

const ContactSubmissionsContext = createContext<ContactSubmissionsContextType | undefined>(undefined);

export const ContactSubmissionsProvider = ({ children }: { children: ReactNode }) => {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-submissions`);
      if (!response.ok) {
        throw new Error('Failed to fetch contact submissions');
      }
      const data = await response.json();
      setSubmissions(data);
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const addSubmission = async (submission: Omit<ContactSubmission, "id" | "submitted_at">) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/contact-submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submission),
      });

      if (!response.ok) {
        throw new Error('Failed to save contact submission');
      }

      const newSubmission = await response.json();

      // Add to state immediately for real-time update
      setSubmissions((prev) => [newSubmission, ...prev]);

      console.log('Contact submission saved successfully:', newSubmission.id);
    } catch (error) {
      console.error('Error saving contact submission:', error);
      throw error;
    }
  };

  const refreshSubmissions = async () => {
    await fetchSubmissions();
  };

  return (
    <ContactSubmissionsContext.Provider value={{ submissions, addSubmission, refreshSubmissions }}>
      {children}
    </ContactSubmissionsContext.Provider>
  );
};

export const useContactSubmissions = () => {
  const context = useContext(ContactSubmissionsContext);
  if (!context) {
    throw new Error("useContactSubmissions must be used within a ContactSubmissionsProvider");
  }
  return context;
};
