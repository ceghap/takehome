import { useState } from 'react';
import { useAppDispatch } from '../hooks';
import { set, Profile } from '../private/profile/ProfileSlice';
export interface User {
  id?: number;
  email: string;
  password: string;
  code: number;
  active: boolean;
  name: string;
  username: string;
  address: string;
  country: string;
  city: string;
  postcode: string;
  photoId: string;
}

export const useUser = () => {
  const dispatch = useAppDispatch();
  function getUser() {
    const userString = sessionStorage.getItem('user');

    if (userString === 'undefined') return undefined;

    const user: Profile = typeof userString === 'string' && JSON.parse(userString);
    dispatch(set(user));
    return user;
  }

  const [user, setUser] = useState<Profile | undefined>(getUser());

  const saveUser = (user: Profile | undefined) => {
    sessionStorage.setItem('user', JSON.stringify(user));
    setUser(user);
  };

  return {
    setUser: saveUser,
    user,
  };
};
