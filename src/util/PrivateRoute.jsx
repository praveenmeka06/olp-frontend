import { useAuth } from "../context/useAuth";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children, type }) {
  const { currentUser, isLoading } = useAuth();

  //private routes used to restrict specific routes and contents to autorized users only

  if (isLoading) {
    return <div>loading...</div>;
  }
  return currentUser && (currentUser.role === type || type === "both") ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}

export default PrivateRoute;
