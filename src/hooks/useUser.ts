import { useState } from "react";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  code: number;
  active: boolean;
}

export const useUser = () => {
  function getUser() {
    const userString = sessionStorage.getItem("user");

    if (userString === "undefined") return undefined;

    const user = typeof userString === "string" && JSON.parse(userString);

    return user;
  }

  const [user, setUser] = useState<User | undefined>(getUser());

  const saveUser = (user: User | undefined) => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setUser(user);
  };

  return {
    setUser: saveUser,
    user,
  };
};
