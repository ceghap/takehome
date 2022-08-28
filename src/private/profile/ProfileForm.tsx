import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import { Form } from '../../components/common/Form'
import { validationSchema } from './ProfileValidator'
import { store } from '../../../src/store'
import { useHookstate } from '@hookstate/core'
import { User } from '../../hooks/useUser'
interface FormValues {
  name: string
  email: string
  username: string
  address: string
  postcode: string
  country: string
  city: string
  photoId: string
}

export const ProfileForm = () => {
  const { profile: storeProfile } = useHookstate(store)

  const profile = storeProfile.get()

  const formik = useFormik<FormValues>({
    initialValues: {
      name: profile?.name || '',
      email: profile?.email || '',
      username: profile?.username || '',
      address: profile?.address || '',
      postcode: profile?.postcode || '',
      country: profile?.country || '',
      city: profile?.city || '',
      photoId: profile?.photoId || '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
      storeProfile.merge(values)
    },
  })

  const deletePhotoId = () => {
    console.log('del')
  }

  return (
    <>
      {storeProfile.error && <Alert severity='error'>{storeProfile.error?.message}</Alert>}
      {storeProfile.promised ? (
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
            value={formik.values.username}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={formik.touched.username && formik.errors.username}
          />
          <TextField
            fullWidth
            label='Address'
            margin='normal'
            type='text'
            name='address'
            id='address'
            onChange={formik.handleChange}
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
            value={formik.values.postcode}
            error={formik.touched.postcode && Boolean(formik.errors.postcode)}
            helperText={formik.touched.postcode && formik.errors.postcode}
          />

          <img src={formik.values.photoId} width='100%' height='auto' />
          <Button
            onClick={deletePhotoId}
            variant='contained'
            color='error'
            sx={{ margin: '20px 0' }}
          >
            Delete
          </Button>

          {/* <TextField
            fullWidth
            label='Photo ID'
            margin='normal'
            type='file'
            name='photoId'
            id='photoId'
            onChange={formik.handleChange}
            value={formik.values.photoId}
            error={formik.touched.photoId && Boolean(formik.errors.photoId)}
            helperText={formik.touched.photoId && formik.errors.photoId}
          /> */}

          <Button color='primary' variant='contained' fullWidth type='submit'>
            Save
          </Button>
        </Form>
      )}
    </>
  )
}
