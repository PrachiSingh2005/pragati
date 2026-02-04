import { useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus, Eye, EyeOff, Upload, X, Calendar,
  Pencil, Trash2, User
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useBlog } from "@/contexts/BlogContext";

const BlogManager = () => {
  const {
    posts,
    categories,
    addPost,
    updatePost,
    deletePost,
    togglePublished,
    addCategory
  } = useBlog();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "Pragati Design Team",
    category: "",
    images: [] as string[],
    is_published: false,
    published_at: new Date().toISOString().split('T')[0],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categoryOptions = categories.filter((c) => c !== "All");

  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "Pragati Design Team",
      category: "",
      images: [],
      is_published: false,
      published_at: new Date().toISOString().split('T')[0],
    });
    setImagePreviews([]);
    setEditingPost(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch(`${import.meta.env.VITE_API_URL}/upload`, {
          method: 'POST',
          body: formData
        })
          .then(res => {
            if (!res.ok) throw new Error("Upload failed");
            return res.json();
          })
          .then(data => {
            const assetPath = `/assets/${data.filePath}`;
            // Construct full URL for preview
            const fullUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}${assetPath}`;

            setImagePreviews(prev => [...prev, fullUrl]);
            setFormData(prev => ({
              ...prev,
              images: [...prev.images, fullUrl] // Store full URL temporarily, Context cleans it up
            }));
          })
          .catch(err => {
            console.error("Image upload failed", err);
            toast({
              title: "Upload Error",
              description: "Failed to upload image.",
              variant: "destructive"
            });
          });
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      toast({ title: "Error", description: "Please enter a title.", variant: "destructive" });
      return;
    }
    if (!formData.excerpt.trim()) {
      toast({ title: "Error", description: "Please enter an excerpt.", variant: "destructive" });
      return;
    }
    if (!formData.content.trim()) {
      toast({ title: "Error", description: "Please enter content.", variant: "destructive" });
      return;
    }
    if (!formData.category) {
      toast({ title: "Error", description: "Please select a category.", variant: "destructive" });
      return;
    }

    if (editingPost) {
      updatePost(editingPost, formData);
      toast({ title: "Success", description: "Blog post updated successfully." });
    } else {
      addPost(formData);
      toast({ title: "Success", description: "Blog post created successfully." });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (post: typeof posts[0]) => {
    setEditingPost(post.id);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      images: post.images,
      is_published: post.is_published,
      published_at: post.published_at,
    });
    setImagePreviews(post.images);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deletePost(id);
    toast({ title: "Success", description: "Blog post deleted successfully." });
  };

  const handleToggle = (id: string, currentState: boolean) => {
    togglePublished(id);
    toast({
      title: "Success",
      description: `Post ${currentState ? "unpublished" : "published"} successfully.`,
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="editorial-heading text-2xl md:text-3xl mb-2">
              Blog Manager
            </h1>
            <p className="body-text text-muted-foreground">
              Create and manage blog posts.
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="editorial-heading">
                  {editingPost ? "Edit Post" : "Create New Post"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Post title..."
                    value={formData.title}
                    onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <div className="flex gap-2">
                    <Select
                      value={formData.category}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => {
                        const newCat = prompt("Enter new category name:");
                        if (newCat) {
                          addCategory(newCat);
                          setFormData(prev => ({ ...prev, category: newCat }));
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="author">Author</Label>
                  <Input
                    id="author"
                    placeholder="Author name..."
                    value={formData.author}
                    onChange={(e) => setFormData((prev) => ({ ...prev, author: e.target.value }))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary for the card..."
                    value={formData.excerpt}
                    onChange={(e) => setFormData((prev) => ({ ...prev, excerpt: e.target.value }))}
                    rows={2}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Full blog post content..."
                    value={formData.content}
                    onChange={(e) => setFormData((prev) => ({ ...prev, content: e.target.value }))}
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Featured Image</Label>
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mb-2">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-20 object-cover rounded-sm"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6"
                            onClick={() => handleRemoveImage(index)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div
                    className="border-2 border-dashed border-border rounded-sm p-6 text-center cursor-pointer hover:border-foreground/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload images</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <Label htmlFor="published">Publish immediately</Label>
                  <Switch
                    id="published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) =>
                      setFormData((prev) => ({ ...prev, is_published: checked }))
                    }
                  />
                </div>

                <Button onClick={handleSubmit} className="w-full">
                  {editingPost ? "Update Post" : "Create Post"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {posts.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <p className="body-text text-muted-foreground">
                No blog posts yet. Create your first post.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <Card
                key={post.id}
                className={`border-border/50 transition-all ${post.is_published ? "border-l-4 border-l-accent" : "opacity-60"
                  }`}
              >
                <CardContent className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      {post.images && post.images.length > 0 ? (
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-20 h-16 object-cover rounded-sm flex-shrink-0"
                        />
                      ) : (
                        <div className="w-20 h-16 bg-muted rounded-sm flex-shrink-0 flex items-center justify-center">
                          <span className="text-2xl text-muted-foreground/30 font-serif">
                            {post.title.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1 flex-wrap">
                          <h3 className="editorial-heading text-lg truncate">
                            {post.title}
                          </h3>
                          {post.is_published ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-sm">
                              <Eye className="w-3 h-3" />
                              Published
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-sm">
                              <EyeOff className="w-3 h-3" />
                              Draft
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1 flex-wrap">
                          <span className="text-xs tracking-widest uppercase">{post.category}</span>
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(post.published_at)}
                          </span>
                        </div>
                        <p className="body-text text-muted-foreground text-sm line-clamp-1">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleEdit(post)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(post.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Switch
                        checked={post.is_published}
                        onCheckedChange={() => handleToggle(post.id, post.is_published)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 p-4 bg-card border border-border/50 rounded-sm">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Only published posts appear on the public blog page.
            Toggle the switch to publish or unpublish a post.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default BlogManager;
