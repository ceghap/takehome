import React from 'react'
import { Navigate } from 'react-router-dom'
import { PrivateLayout } from './PrivateLayout'

interface Props {
  isAllowed: boolean
  redirectPath?: string
}
export const PrivateRoute = ({ isAllowed, redirectPath = '/login' }: Props) => {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />
  }
  return <PrivateLayout />
}
