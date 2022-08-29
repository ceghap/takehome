import * as Yup from 'yup';

export const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const validationSchema = Yup.object({
  title: Yup.string().min(5).max(100).required(),
  description: Yup.string(),
  price: Yup.number().required(),
  image: Yup.string(),
});
