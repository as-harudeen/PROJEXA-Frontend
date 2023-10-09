import { Nav } from "@components/auth/Nav/Nav";
import { useAppSelector } from "@hooks/storeHooks";
import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? (
    <Navigate to="/project/personal" />
  ) : (
    <React.Fragment>
      <Nav />
      <Outlet />
    </React.Fragment>
  );
};
