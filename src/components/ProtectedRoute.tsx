import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles?: ("brand" | "creator" | "manager")[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { session, role, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-pearl">
        <div className="animate-spin h-8 w-8 border-2 border-brand rounded-full border-t-transparent"></div>
      </div>
    );
  }

  // Redirect to login if unauthenticated
  if (!session) {
    return <Navigate to="/auth/login" replace />;
  }

  // If routes define specific roles, bounce if there's a mismatch
  if (allowedRoles && role && !allowedRoles.includes(role)) {
    // Return unauthorized / back to auth
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};
