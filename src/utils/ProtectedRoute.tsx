import { ProjectLayout } from "@/layouts/ProjectLayout";
import { useUserStore } from "@/store/useUserStore";
import { FC } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC = () => {
  const isLoggedIn = useUserStore(state => state.user !== null);
  return isLoggedIn ? <ProjectLayout /> : <Navigate to="/auth/login" />;
};
