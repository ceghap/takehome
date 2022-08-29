import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Form } from '../../../components/common/Form'
import { validationSchema } from '../ProfileValidator'
import { useAppDispatch, useAppSelector } from '../../../hooks'
import { update, Profile } from '../ProfileSlice'

export const ProfileForm = () => {
  const profile = useAppSelector((state) => state.profile.profile)
  const dispatch = useAppDispatch()
  const formik = useFormik<Omit<Profile, 'code'>>({
    initialValues: {
      id: profile.data.id || undefined,
      name: profile.data.name || '',
      email: profile.data.email || '',
      username: profile.data.username || '',
      address: profile.data.address || '',
      postcode: profile.data.postcode || '',
      country: profile.data.country || '',
      city: profile.data.city || '',
      password: profile.data.password || '',
      photoId: '',
      active: profile.data.active || false,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      dispatch(update(values))
    },
  })

  return (
    <>
      {profile.error && <Alert severity='error'>{profile.error.message}</Alert>}
      {profile.loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        <Form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label='Name'
            margin='normal'
            type='text'
            name='name'
            id='name'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
          />
          <TextField
            fullWidth
            label='Email'
            margin='normal'
            type='email'
            name='email'
            id='email'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            label='Username'
            margin='normal'
            type='username'
            disabled={true}
            name='username'
            id='username'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            label='Password'
            margin='normal'
            type='password'
            name='password'
            id='password'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <TextField
            fullWidth
            label='Confirm Password'
            margin='normal'
            type='password'
            name='confirmPassword'
            id='confirmPassword'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />
          <TextField
            fullWidth
            label='Address'
            margin='normal'
            type='text'
            name='address'
            id='address'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
          />

          <TextField
            fullWidth
            label='Country'
            margin='normal'
            type='text'
            name='country'
            id='country'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.country}
            error={formik.touched.country && Boolean(formik.errors.country)}
            helperText={formik.touched.country && formik.errors.country}
          />
          <TextField
            fullWidth
            label='city'
            margin='normal'
            type='text'
            name='city'
            id='city'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.city}
            error={formik.touched.city && Boolean(formik.errors.city)}
            helperText={formik.touched.city && formik.errors.city}
          />
          <TextField
            fullWidth
            label='Postcode'
            margin='normal'
            type='text'
            name='postcode'
            id='postcode'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.postcode}
            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
            helperText={formik.touched.postcode && formik.errors.postcode}
          />

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save
          </Button>
        </Form>
      )}
    </>
  )
}
