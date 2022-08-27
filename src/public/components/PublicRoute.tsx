import React from "react";
import { User } from "../../hooks/useUser";
import { Navigate } from "react-router-dom";
import { PublicLayout } from "./PublicLayout";

interface Props {
  user: User | undefined;
}
export const PublicRoute = ({ user }: Props) => {
  if (!user) {
    return <PublicLayout />;
  }
  return <Navigate to="/profile" replace />;
};
