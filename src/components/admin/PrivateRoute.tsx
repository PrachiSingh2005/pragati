import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const PrivateRoute = ({ children, requireAdmin = false }: PrivateRouteProps) => {
  const location = useLocation();
  
  // Check mock auth from localStorage
  const isAuthenticated = localStorage.getItem("mockAdminAuth") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // For mock auth, all authenticated users are admins
  return <>{children}</>;
};

export default PrivateRoute;
