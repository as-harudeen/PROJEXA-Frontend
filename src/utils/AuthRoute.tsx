import { useUserStore } from "@/store/useUserStore";
import { Nav } from "@components/auth/Nav/Nav";
import React, { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const AuthRoute: FC = () => {
  const isLoggedIn = useUserStore(state => state.user !== null);
  return isLoggedIn ? (
    <Navigate to="/project/personal" />
  ) : (
    <React.Fragment>
      <Nav />
      <Outlet />
    </React.Fragment>
  );
};
