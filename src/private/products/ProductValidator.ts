import * as Yup from 'yup';

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const validationSchema = Yup.object({
  title: Yup.string().min(5).max(100).required(),
  description: Yup.string(),
  price: Yup.number().required(),
  image: Yup.mixed()
    .required('A file is required')
    .nullable()
    .test(
      'type',
      'Only the following formats are accepted: .jpeg, .jpg, .png',
      (value) => !value || (value && SUPPORTED_FORMATS.includes(value.type)),
    ),
});
