import React from "react";
import { Outlet, useLocation, Navigate } from "react-router";
import { projectAuth } from "./firebase";
function PrivateLayOut() {
  const location = useLocation();
  return projectAuth.currentUser ? (
    <Outlet />
  ) : (
    // keep the previous navigation stack
    <Navigate to="/Authentication" state={{ from: location }} replace />
  );
}

export default PrivateLayOut;
