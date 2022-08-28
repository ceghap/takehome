import { useState } from 'react'

export interface User {
  id?: number
  email: string
  password: string
  code: number
  active: boolean
  name: string
  username: string
  address: string
  country: string
  city: string
  postcode: string
  photoId: string
}

export const useUser = () => {
  function getUser() {
    const userString = sessionStorage.getItem('user')

    if (userString === 'undefined') return undefined

    const user = typeof userString === 'string' && JSON.parse(userString)

    return user
  }

  const [user, setUser] = useState<User | undefined>(getUser())

  const saveUser = (user: User | undefined) => {
    sessionStorage.setItem('user', JSON.stringify(user))
    setUser(user)
  }

  return {
    setUser: saveUser,
    user,
  }
}
