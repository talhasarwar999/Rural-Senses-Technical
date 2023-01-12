//REACT-ROUTER-DOM
import { Navigate, Outlet } from "react-router-dom";

// MAIN ARROW FUNCTION TO PROTECT ROUTES
const ProtectedRoutes = () => {
  return localStorage.getItem("userInfo") ? <Outlet /> : <Navigate to="/" />;
};
export default ProtectedRoutes;
