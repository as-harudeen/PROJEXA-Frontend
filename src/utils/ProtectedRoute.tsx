import { ProjectLayout } from "@/layouts/ProjectLayout";
import { useAppSelector } from "@hooks/storeHooks";
import { FC } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC = () => {
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  return isLoggedIn ? <ProjectLayout /> : <Navigate to="/auth/login" />;
};
