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
  Plus, Eye, EyeOff, Upload, X, MapPin,
  FolderPlus, Pencil, Trash2, Tag
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { usePortfolio } from "@/contexts/PortfolioContext";

const PortfolioManager = () => {
  const {
    projects,
    categoryList,
    addProject,
    toggleProjectVisibility,
    addCategory,
    updateCategory,
    deleteCategory
  } = usePortfolio();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCategoryDialogOpen, setIsCategoryDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<number | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [newProject, setNewProject] = useState({
    title: "",
    location: "",
    category: "",
    description: "",
    images: [] as string[],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
          .then(res => res.json())
          .then(data => {
            const imageUrl = `${import.meta.env.VITE_API_URL.replace('/api', '')}/assets/${data.filePath}`;
            const assetPath = `/assets/${data.filePath}`;

            setImagePreviews((prev) => [...prev, imageUrl]);
            setNewProject((prev) => ({
              ...prev,
              images: [...prev.images, assetPath]
            }));
          })
          .catch(err => console.error("Upload failed", err));
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    setNewProject((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleAddProject = () => {
    if (!newProject.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project title.",
        variant: "destructive",
      });
      return;
    }

    if (!newProject.location.trim()) {
      toast({
        title: "Error",
        description: "Please enter a location.",
        variant: "destructive",
      });
      return;
    }

    if (!newProject.category) {
      toast({
        title: "Error",
        description: "Please select a category.",
        variant: "destructive",
      });
      return;
    }

    addProject({
      title: newProject.title,
      location: newProject.location,
      category: newProject.category,
      description: newProject.description || "",
      images: newProject.images.length > 0 ? newProject.images : ["/placeholder.svg"],
      is_active: true,
    });

    toast({
      title: "Success",
      description: "Project added successfully.",
    });

    setNewProject({ title: "", location: "", category: "", description: "", images: [] });
    setImagePreviews([]);
    setIsDialogOpen(false);
  };

  const handleToggle = (id: string, currentState: boolean) => {
    toggleProjectVisibility(id);
    toast({
      title: "Success",
      description: `Project ${currentState ? "hidden" : "activated"} successfully.`,
    });
  };

  // Category Management
  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    if (categoryList.some(c => c.name.toLowerCase() === newCategoryName.trim().toLowerCase())) {
      toast({
        title: "Error",
        description: "Category already exists",
        variant: "destructive"
      });
      return;
    }

    addCategory(newCategoryName);
    toast({
      title: "Success",
      description: "Category added successfully.",
    });
    setNewCategoryName("");
  };

  const handleUpdateCategory = (id: number) => {
    if (!newCategoryName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a category name.",
        variant: "destructive",
      });
      return;
    }

    updateCategory(id, newCategoryName);
    toast({
      title: "Success",
      description: "Category updated successfully.",
    });
    setEditingCategory(null);
    setNewCategoryName("");
  };

  const handleDeleteCategory = (id: number) => {
    deleteCategory(id);
    toast({
      title: "Success",
      description: "Category deleted successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="editorial-heading text-2xl md:text-3xl mb-2">
              Portfolio Manager
            </h1>
            <p className="body-text text-muted-foreground">
              Manage portfolio projects and categories.
            </p>
          </div>
          <div className="flex gap-3">
            {/* Category Management Dialog */}
            <Dialog open={isCategoryDialogOpen} onOpenChange={setIsCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Tag className="w-4 h-4" />
                  Categories
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="editorial-heading">Manage Categories</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  {/* Add New Category */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="New category name..."
                      value={editingCategory ? "" : newCategoryName}
                      onChange={(e) => !editingCategory && setNewCategoryName(e.target.value)}
                      disabled={!!editingCategory}
                    />
                    <Button
                      onClick={handleAddCategory}
                      size="icon"
                      disabled={!!editingCategory}
                    >
                      <FolderPlus className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Category List */}
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {categoryList.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-sm"
                      >
                        {editingCategory === category.id ? (
                          <div className="flex gap-2 flex-1">
                            <Input
                              value={newCategoryName}
                              onChange={(e) => setNewCategoryName(e.target.value)}
                              autoFocus
                            />
                            <Button
                              size="sm"
                              onClick={() => handleUpdateCategory(category.id)}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => {
                                setEditingCategory(null);
                                setNewCategoryName("");
                              }}
                            >
                              Cancel
                            </Button>
                          </div>
                        ) : (
                          <>
                            <span className="body-text">
                              {category.name}
                              {category.is_default && <span className="text-xs text-muted-foreground ml-2">(Default)</span>}
                            </span>
                            <div className="flex gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => {
                                  setEditingCategory(category.id);
                                  setNewCategoryName(category.name);
                                }}
                              >
                                <Pencil className="w-3 h-3" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className={`h-8 w-8 ${category.is_default ? 'opacity-50 cursor-not-allowed' : 'text-destructive hover:text-destructive'}`}
                                onClick={() => handleDeleteCategory(category.id)}
                                disabled={category.is_default}
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Add Project Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Add Project
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="editorial-heading">Add New Project</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Project Title</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Modern Villa Renovation"
                      value={newProject.title}
                      onChange={(e) =>
                        setNewProject((prev) => ({ ...prev, title: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="e.g., Mumbai"
                      value={newProject.location}
                      onChange={(e) =>
                        setNewProject((prev) => ({ ...prev, location: e.target.value }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={newProject.category}
                      onValueChange={(value) =>
                        setNewProject((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryList.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the project..."
                      value={newProject.description}
                      onChange={(e) =>
                        setNewProject((prev) => ({ ...prev, description: e.target.value }))
                      }
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Images (Multiple allowed)</Label>
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
                      <p className="text-sm text-muted-foreground">
                        Click to upload images
                      </p>
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
                  <Button onClick={handleAddProject} className="w-full">
                    Add Project
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {projects.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="py-12 text-center">
              <p className="body-text text-muted-foreground">
                No projects found. Add your first project.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`border-border/50 transition-all ${project.is_active
                  ? "border-l-4 border-l-accent"
                  : "opacity-60"
                  }`}
              >
                <CardContent className="py-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex gap-4 flex-1">
                      {project.images && project.images.length > 0 && (
                        <div className="flex gap-1 flex-shrink-0">
                          <img
                            src={project.images[0]}
                            alt={project.title}
                            className="w-20 h-16 object-cover rounded-sm"
                          />
                          {project.images.length > 1 && (
                            <span className="text-xs text-muted-foreground self-end">
                              +{project.images.length - 1}
                            </span>
                          )}
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="editorial-heading text-lg">
                            {project.title}
                          </h3>
                          {project.is_active ? (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-accent/20 text-accent text-xs rounded-sm">
                              <Eye className="w-3 h-3" />
                              Active
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-sm">
                              <EyeOff className="w-3 h-3" />
                              Hidden
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-1">
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {project.location}
                          </span>
                          <span className="text-xs tracking-widest uppercase">
                            {project.category}
                          </span>
                        </div>
                        {project.description && (
                          <p className="body-text text-muted-foreground text-sm line-clamp-1">
                            {project.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={project.is_active}
                        onCheckedChange={() => handleToggle(project.id, project.is_active)}
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
            <strong>Note:</strong> Only active projects are displayed on the public
            Portfolio page. Toggle the switch to show or hide a project.
          </p>
        </div>
      </div>
    </AdminLayout>
  );
};

export default PortfolioManager;
