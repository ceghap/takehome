import * as Yup from 'yup';

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const validationSchema = Yup.object({
  name: Yup.string().min(5).max(100).required(),
  email: Yup.string().email().required(),
  password: Yup.string().min(6).required(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required(),
  username: Yup.string().min(3).max(20).required('Required'),
  address: Yup.string().min(3).max(200).required(),
  country: Yup.string().required(),
  city: Yup.string().required(),
  postcode: Yup.string().required(),
  photoId: Yup.mixed()
    .required('A file is required')
    .nullable()
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, .png',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)),
    ),
});
