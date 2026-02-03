import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wrench, FolderOpen, FileText } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState({
    servicesCount: 0,
    activeServicesCount: 0,
    projectsCount: 0,
    blogsCount: 0,
    contactsCount: 0
  });

  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = () => {
      fetch(`${import.meta.env.VITE_API_URL}/dashboard`)
        .then(res => res.json())
        .then(data => setStats(data))
        .catch(err => console.error("Error fetching dashboard stats:", err));
    };

    const fetchTasks = () => {
      fetch(`${import.meta.env.VITE_API_URL}/dashboard-tasks`)
        .then(res => res.json())
        .then(data => setTasks(data))
        .catch(err => console.error("Error fetching dashboard tasks:", err));
    };

    fetchStats();
    fetchTasks();
    // Optional: Refresh interval or listen to focus
  }, []);

  const statCards = [
    {
      title: "Total Services",
      value: stats.servicesCount,
      icon: Wrench,
      href: "/admin/services",
      description: "Manage your service offerings",
    },
    {
      title: "Active Services",
      value: stats.activeServicesCount,
      icon: Wrench,
      href: "/admin/services",
      description: "Currently visible to visitors",
    },
    {
      title: "Projects",
      value: stats.projectsCount,
      icon: FolderOpen,
      href: "/admin/projects", // Fixed href
      description: "Portfolio projects",
    },
    {
      title: "Blog Posts",
      value: stats.blogsCount,
      icon: FileText, // Reused icon or import new one if needed
      href: "/admin/blogs",
      description: "Published articles",
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6 md:p-8 lg:p-10">
        <div className="mb-8">
          <h1 className="editorial-heading text-2xl md:text-3xl mb-2">
            Dashboard
          </h1>
          <p className="body-text text-muted-foreground">
            Welcome to the Pragati Interior Studio admin panel.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((stat) => (
            <Link key={stat.title} to={stat.href}>
              <Card className="border-border/50 hover:border-border transition-colors cursor-pointer group">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="body-text text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </CardHeader>
                <CardContent>
                  <div className="editorial-heading text-3xl mb-1">
                    {stat.value}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-10">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="editorial-heading text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Ongoing Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tasks.length === 0 ? (
                <p className="text-sm text-muted-foreground p-4 text-center">No pending tasks or actions.</p>
              ) : (
                tasks.map((task: any) => (
                  <Link
                    key={task.id}
                    to={task.link}
                    className="block p-4 border border-border/50 rounded-sm hover:border-border hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="body-text font-medium truncate pr-2">{task.title}</h3>
                      <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${task.status === 'Hidden' ? 'bg-yellow-100 text-yellow-800' :
                        task.status === 'New' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                        {task.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span>{task.type}</span>
                      <span className="text-primary group-hover:underline">{task.action} &rarr;</span>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
