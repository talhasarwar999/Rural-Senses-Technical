//REACT-ROUTER-DOM
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

// MAIN ARROW FUNCTION TO PROTECT ROUTES
export const ProtectedRoute = () => {
  const [admin] = useState(
    localStorage.getItem("user") === '"Admin"' ? true : null
  );

  return admin ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedSocialRoute = () => {
  const [social] = useState(
    localStorage.getItem("user") === '"CommunitySocialWorker"' ? true : null
  );

  return social ? <Outlet /> : <Navigate to="/" />;
};

export const ProtectedOfficialRoute = () => {
  const [official] = useState(
    localStorage.getItem("user") === '"PublicOfficial"' ? true : null
  );

  return official ? <Outlet /> : <Navigate to="/" />;
};
