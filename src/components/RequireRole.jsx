import { Navigate } from "react-router-dom";

const RequireRole = ({ role, children }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // not log in 
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // log in but as a worng role 
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireRole;
