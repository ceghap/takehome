import React from "react";
import { Navbar } from "../../components/common/Navbar";
import { Outlet } from "react-router";

export const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
