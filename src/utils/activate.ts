import { User } from './../hooks/useUser';
import users from '../utils/user.json';

export const Activate = (code: string) => {
  if (code) {
    const user: User | undefined = users.find((u) => u.code === Number(code));
    if (!user) return false;

    return user;
  }

  return false;
};
