import { User } from "./../hooks/useUser";
import users from "../utils/user.json";

export const Login = (email: string, password: string) => {
  const user: User | undefined = users.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return false;

  return user;
};
