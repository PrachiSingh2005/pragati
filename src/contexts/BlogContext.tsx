import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getImageUrl } from "@/lib/imageUtils";

export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  images: string[];
  category: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
}

interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
  addPost: (post: Omit<BlogPost, "id" | "created_at">) => void;
  updatePost: (id: string, post: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  togglePublished: (id: string) => void;
  getPublishedPosts: () => BlogPost[];
  addCategory: (category: string) => void;
  deleteCategory: (category: string) => void;
}

const defaultPosts: BlogPost[] = [];

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]); // Start with just "All", will be populated from posts

  const fetchBlogs = () => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        const transformed = data.map((b: any) => {
          let imageArray: string[] = [];

          // Try to parse images column (JSON array)
          if (b.images) {
            try {
              const parsed = JSON.parse(b.images);
              if (Array.isArray(parsed)) {
                imageArray = parsed.map((img: string) => getImageUrl(img));
              }
            } catch (e) {
              // Not valid JSON, ignore
            }
          }

          // Fallback to image_url if no images array
          if (imageArray.length === 0 && b.image_url) {
            imageArray = [getImageUrl(b.image_url)];
          }

          return {
            id: b.id.toString(),
            title: b.title,
            slug: b.slug,
            excerpt: b.excerpt,
            content: b.content,
            author: b.author,
            images: imageArray,
            category: b.category,
            is_published: b.is_published === 1 || b.is_published === true || b.is_published === "1",
            published_at: b.published_at || "",
            created_at: b.created_at || ""
          };
        });
        setPosts(transformed);

        // Extract unique categories from posts
        const uniqueCategories = new Set<string>();
        transformed.forEach((post: BlogPost) => {
          if (post.category) {
            uniqueCategories.add(post.category);
          }
        });

        // Always include "All" at the beginning, then add unique categories from posts
        const dynamicCategories = ["All", ...Array.from(uniqueCategories).sort()];
        setCategories(dynamicCategories);

        console.log('📂 Categories updated:', dynamicCategories);
      })
      .catch(err => console.error("Failed to fetch blogs", err));
  };

  useEffect(() => {
    fetchBlogs();
  }, []); // Run once on mount

  const addPost = (post: Omit<BlogPost, "id" | "created_at">) => {
    // Generate simple slug if not provided/auto-generated
    const slug = post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Strip any URL prefixes to get just the filename
    const rawImages = post.images ? post.images.map(img => {
      // Remove various possible URL prefixes
      let cleaned = img
        .replace(`${import.meta.env.VITE_API_URL}/assets/`, '')
        .replace(`${import.meta.env.VITE_API_URL.replace('/api', '')}/assets/`, '')
        .replace('http://localhost:5000/assets/', '')
        .replace('/assets/', '');
      return cleaned;
    }) : [];

    console.log('🔍 Adding blog post:', {
      title: post.title,
      originalImages: post.images,
      cleanedImages: rawImages,
      imagesJSON: JSON.stringify(rawImages)
    });

    fetch(`${import.meta.env.VITE_API_URL}/blogs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: post.title,
        slug: slug,
        excerpt: post.excerpt,
        content: post.content,
        author: post.author,
        category: post.category,
        image_url: rawImages.length > 0 ? rawImages[0] : '',
        images: JSON.stringify(rawImages),
        is_published: post.is_published ? 1 : 0,
        published_at: post.published_at
      })
    })
      .then(res => res.json())
      .then((data) => {
        console.log('✅ Blog post created:', data);
        fetchBlogs();
      })
      .catch(err => console.error("❌ Error creating blog", err));
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    // We need to merge existing post with updates to send full valid object if the API requires
    // or just send updates. Our generic PUT handler handles partial updates.

    const payload: any = {};
    if (updates.title) payload.title = updates.title;
    if (updates.excerpt) payload.excerpt = updates.excerpt;
    if (updates.content) payload.content = updates.content;
    if (updates.category) payload.category = updates.category;
    if (updates.author) payload.author = updates.author;
    if (updates.is_published !== undefined) payload.is_published = updates.is_published ? 1 : 0;

    if (updates.images !== undefined) {
      const rawImages = updates.images.map(img => {
        // Remove various possible URL prefixes
        let cleaned = img
          .replace(`${import.meta.env.VITE_API_URL}/assets/`, '')
          .replace(`${import.meta.env.VITE_API_URL.replace('/api', '')}/assets/`, '')
          .replace('http://localhost:5000/assets/', '')
          .replace('/assets/', '');
        return cleaned;
      });
      payload.image_url = rawImages.length > 0 ? rawImages[0] : '';
      payload.images = JSON.stringify(rawImages);
    }

    fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(() => fetchBlogs())
      .catch(err => console.error("Error updating blog", err));
  };

  const deletePost = (id: string) => {
    fetch(`${import.meta.env.VITE_API_URL}/blogs/${id}`, {
      method: 'DELETE'
    })
      .then(() => fetchBlogs())
      .catch(err => console.error("Error deleting blog", err));
  };

  const togglePublished = (id: string) => {
    const post = posts.find(p => p.id === id);
    if (post) {
      updatePost(id, { is_published: !post.is_published });
    }
  };

  const getPublishedPosts = () => {
    return posts
      .filter((p) => p.is_published)
      .sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime());
  };

  const addCategory = (category: string) => {
    if (!categories.includes(category)) {
      setCategories((prev) => [...prev, category]);
    }
  };

  const deleteCategory = (category: string) => {
    if (category === "All") return;
    setCategories((prev) => prev.filter((c) => c !== category));
  };

  return (
    <BlogContext.Provider
      value={{
        posts,
        categories,
        addPost,
        updatePost,
        deletePost,
        togglePublished,
        getPublishedPosts,
        addCategory,
        deleteCategory,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
