import React from 'react';
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = (logged) => {
  return (
    <>
      {logged ? <Outlet/> : <Navigate to="/"/>}
    </>
  );
};

export default PrivateRoute;