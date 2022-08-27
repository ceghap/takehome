import React from "react";
import { Link } from "react-router-dom";

export const Navbar = ({ isPrivate = false }: { isPrivate?: boolean }) => {
  const renderNav = (isPrivate: boolean) => {
    switch (isPrivate) {
      case true:
        return (
          <>
            <Link to="/products">Product</Link> |{" "}
            <Link to="/profile">Profile</Link> |{" "}
            <Link to="/logout">Logout</Link>
          </>
        );
      default:
        return (
          <>
            <Link to="/login">Login</Link> |{" "}
            <Link to="/register">Register</Link>
          </>
        );
    }
  };
  return renderNav(isPrivate);
};
