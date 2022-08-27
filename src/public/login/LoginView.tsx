import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Container from '@mui/material/Container'
import { useFormik } from 'formik'
import { useState } from 'react'
import { User } from '../../hooks/useUser'
import { Login } from '../../utils/login'
import { validationSchema } from './LoginValidator'
import Divider from '@mui/material/Divider'
import Box from '@mui/material/Box'

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
    <Container maxWidth='sm'>
      {error && <h2>UNABLE TO LOGIN</h2>}
      <h1>Login View</h1>
      <Box component='form' onSubmit={formik.handleSubmit}>
        <TextField
          margin='normal'
          fullWidth
          id='email'
          name='email'
          label='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          margin='normal'
          fullWidth
          id='password'
          name='password'
          label='Password'
          type='password'
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color='primary' variant='contained' fullWidth type='submit'>
          Submit
        </Button>
      </Box>
      <Divider />
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
    </Container>
  )
}
