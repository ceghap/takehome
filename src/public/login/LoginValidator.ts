import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email().required('Required'),
  password: Yup.string().min(6, 'Must be 6 characters or more').required('Required'),
});
