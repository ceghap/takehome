import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";

export const HomeView = () => {
  return (
    <div>
      <h1>Take Home | Ashraf</h1>
      <Navbar />
      <Outlet />
    </div>
  );
};
