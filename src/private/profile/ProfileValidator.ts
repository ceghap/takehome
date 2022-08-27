import * as Yup from 'yup'

const FILE_SIZE = 160 * 1024
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png']

export const validationSchema = Yup.object({
  name: Yup.string().min(5).max(100).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  username: Yup.string().min(3).max(20).required('Required'),
  street: Yup.string().min(3).max(200).required(),
  country: Yup.string(),
  city: Yup.string(),
  postcode: Yup.string(),
  photoId: Yup.mixed()
    .required('A file is required')
    .test('fileSize', 'File too large', (value) => value && value.size <= FILE_SIZE)
    .test(
      'fileFormat',
      'Unsupported Format',
      (value) => value && SUPPORTED_FORMATS.includes(value.type),
    ),
})
