import { useState } from 'react'
import { User } from '../../hooks/useUser'
import { Login } from '../../utils/login'
import { useFormik } from 'formik'
import { validationSchema } from './LoginValidator'

interface Props {
  setUser: (value: User) => void
}

export const LoginView = ({ setUser }: Props) => {
  const [error, setError] = useState(false)

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const user = await Login(values.email, values.password)

      if (!user) return setError(true)

      setUser(user)
    },
  })

  return (
    <div>
      {error && <h2>UNABLE TO LOGIN</h2>}
      <h1>Login View</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          type='email'
          name='email'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}

        <input
          type='password'
          name='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <button type='submit'>Login</button>
      </form>

      <div>
        {JSON.stringify(
          {
            email: 'hello@ceghap.com',
            password: '123456',
            active: true,
          },
          null,
          2,
        )}
      </div>
      <div>
        {JSON.stringify(
          {
            email: 'test@user.com',
            password: '123456',
            active: false,
          },
          null,
          2,
        )}
      </div>
    </div>
  )
}
