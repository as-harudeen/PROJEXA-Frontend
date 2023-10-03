import { FC } from "react";
import { Outlet } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import { AuthContextProvider } from "../../context/useAuthContext";

export const Auth: FC = () => {
  return (
    <>
      <AuthContextProvider>
        <Nav actived="login" />
        <Outlet />
      </AuthContextProvider>
    </>
  );
};
