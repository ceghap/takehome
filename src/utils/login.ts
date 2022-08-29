import { Profile } from '../private/profile/ProfileSlice'
import profiles from '../utils/user.json'

export const Login = (email: string, password: string) => {
  const user: Profile | undefined = profiles.find(
    (u) => u.email === email && u.password === password,
  )

  if (!user) return false
  else return user
}
