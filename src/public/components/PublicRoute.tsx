import React from 'react';

import { Navigate } from 'react-router-dom';
import { PublicLayout } from './PublicLayout';
import { Profile } from '../../private/profile/ProfileSlice';

interface Props {
  user: Profile | undefined;
}
export const PublicRoute = ({ user }: Props) => {
  if (!user) {
    return <PublicLayout />;
  }
  return <Navigate to='/profile' replace />;
};
