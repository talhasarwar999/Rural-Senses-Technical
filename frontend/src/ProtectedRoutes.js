import { useState } from "react";
//REACT-ROUTER-DOM
import { Navigate, Outlet } from "react-router-dom";
//Cookie
import GetCookie from "./hooks/getCookie";
import Header from "./components/headers/Navbar"

// Protected Routes for Admin
export const ProtectedRoute = () => {
  //State
  const [admin] = useState(GetCookie("user") === '"Admin"' ? true : null);

  return admin ? (
    <>
      <Header /> <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

// Protected Routes for Community Social worker
export const ProtectedSocialRoute = () => {
  //State
  const [social] = useState(
    GetCookie("user") === '"CommunitySocialWorker"' ? true : null
  );

  return social ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

// Protected Routes for Public Official
export const ProtectedOfficialRoute = () => {
  //State
  const [official] = useState(
    GetCookie("user") === '"PublicOfficial"' ? true : null
  );

  return official ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};
