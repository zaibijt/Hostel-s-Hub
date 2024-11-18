import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children, type = "user" }) => {
  const { isAuthenticated = false, user } = useSelector((state) => state.user);

  if (isAuthenticated && type === "user" && user?.user?.isOwner) {
    return <Navigate to="/" replace={true} />;
  }
  if (isAuthenticated && type === "user" && !user?.user?.isOwner) {
    return <Navigate to="/" replace={true} />;
  }
  return children;
};
