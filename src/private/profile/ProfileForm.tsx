import { useFormik } from 'formik'
import { validationSchema } from './ProfileValidator'

export const ProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      username: '',
      address: '',
      postcode: '',
      country: '',
      city: '',
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      console.log(values)
    },
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input type='text' name='name' onChange={formik.handleChange} value={formik.values.name} />
        <input
          type='email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        <input
          type='username'
          disabled={true}
          name='username'
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <input
          type='text'
          name='address'
          onChange={formik.handleChange}
          value={formik.values.address}
        />
        <input
          type='text'
          name='postcode'
          onChange={formik.handleChange}
          value={formik.values.postcode}
        />
        <input
          type='text'
          name='address'
          onChange={formik.handleChange}
          value={formik.values.country}
        />
        <input type='text' name='city' onChange={formik.handleChange} value={formik.values.city} />
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}
